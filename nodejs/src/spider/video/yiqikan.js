/*
* @File     : yiqikan.js
* @Author   : jade
* @Date     : 2024/3/19 18:45
* @Email    : jadehh@1ive.com
* @Software : Samples
* @Desc     : 一起看
*/
import req from '../../util/req.js';
import { load } from 'cheerio';
import pkg from 'lodash';
const { _ } = pkg;

import crypto from "crypto";

import * as Utils from '../../util/utils.js';
import { MAC_UA,  formatPlayUrl } from '../../util/misc.js';

import {Spider} from "../spider_lb.js";

class YiqikanSpider extends Spider {
    constructor() {
        super();
        this.siteUrl = "https://api.gquaxhce.com"
        this.nextObj = {}
    }

    /*
    async init(cfg) {
        await super.init(cfg);
        this.danmuStaus = true;
    }*/

    getRequestId() {
        let strArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        let sb = "";
        for (let i = 0; i < 32; i++) {
            sb = sb + strArr[_.random(0, strArr.length)];
        }
        return sb.toString();
    }

    getName() {
        return "🟢┃一起看┃🟢"
    }

    getAppName() {
        return "一起看"
    }

    getJSName() {
        return "yiqikan"
    }

    getHeader() {
        let headers = {}; //super.getHeader();
        headers["Connection"] = "keep-alive"
        headers["Host"] = "api.gquaxhce.com"
        return headers
    }

    getParams(ob_params = null) {
        let requestId = this.getRequestId()
        let appid = "e6ddefe09e0349739874563459f56c54"
        let reqDomain = "m.yqktv888.com"
        let udid = Utils.getUUID();
        let appKey = "3359de478f8d45638125e446a10ec541"
        let params = {"appId": appid}
        if (!_.isEmpty(ob_params)) {
            for (const ob_key of Object.keys(ob_params)) {
                // !_.isEmpty(ob_params[ob_key]) && 
                if ((ob_key === "epId" || ob_key === "nextCount" || ob_key === "nextVal" || ob_key === "queryValueJson" || ob_key === "keyword")) {
                    params[ob_key] = ob_params[ob_key]
                }
            }
        }
        params["reqDomain"] = reqDomain
        params["requestId"] = requestId
        params["udid"] = udid
        if (!_.isEmpty(ob_params)) {
            for (const ob_key of Object.keys(ob_params)) {
                // !_.isEmpty(ob_params[ob_key]) && 
                if ((ob_key === "vodId" || ob_key === "vodResolution")) {
                    params[ob_key] = ob_params[ob_key]
                }
            }
        }
        params["appKey"] = appKey
        params["sign"] = this.md5(Utils.objectToStr(params))
        delete params["appKey"]
        return params
    }

    md5(text) {
        return crypto.createHash('md5').update(Buffer.from(text, 'utf8')).digest('hex');
    }

    async request(reqUrl, method, postData) {
        let headers = {
            'User-Agent': MAC_UA,
            'Referer': this.siteUrl,
            'Accept-Encoding': 'gzip',
        }
        const res = await req(reqUrl, {
            method: method,
            headers: _.merge(headers, this.getHeader()),
            data: postData || {},
        });
        return res.data;
    }

    async home(inReq, _outResp) {
        let classes = [];
        let response = await this.request(this.siteUrl + "/v1/api/home/header", 'post', this.getParams(), "raw")
        for (const data of response["data"]["channelList"]) {
            classes.push({"type_name": data["channelName"], "type_id": data["channelId"]})
        }
        const filterObj = {};
        return {
            class: classes,
            filters: filterObj,
        };
    }
    
    async category(inReq, _outResp) {
        const tid = inReq.body.id;
        let pg = inReq.body.page;
        const extend = inReq.body.filters;
        if (pg <= 0) pg = 1;

        let url = this.siteUrl + "/v1/api/search/queryNow"
        this.limit = 18
        let ob_params = {}
        if (!_.isEmpty(this.nextObj[tid])) {
            ob_params["nextVal"] = this.nextObj[tid]
        }
        ob_params["nextCount"] = 18
        ob_params["queryValueJson"] = JSON.stringify([{
            "filerName": "channelId", "filerValue": tid.toString()
        }]).replaceAll("\\\\", "")
        let response = await this.request(url, 'post', this.getParams(ob_params), "raw")
        let resJson = response; // JSON.parse(response)
        if (resJson["result"]) {
            if (resJson["data"]["hasNext"]) {
                this.nextObj[tid] = resJson["data"]["nextVal"]
            }
            // this.vodList = await this.parseVodShortListFromJson()

            let videos = []
            for (const data of resJson["data"]["items"]) {
                let vodShort = {}
                vodShort.vod_id = data["vodId"]
                vodShort.vod_name = data["vodName"]
                vodShort.vod_remarks = data["watchingCountDesc"]
                vodShort.vod_pic = data["coverImg"]
                videos.push(vodShort)
            }

            let pgCount = videos.length < 70 ? pg : pg + 1;
            return ({
                page: parseInt(pg),
                pagecount: pgCount,
                limit: 72,
                total: 72 * pgCount,
                list: videos,
            });
        }
    }

    async detail(inReq, _outResp) {

        const ids = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
        const videos = [];
    
        for (const id of ids) {

            let url = this.siteUrl + "/v1/api/vodInfo/detail"
            let ob_params = {"vodId": id}
            let response = await this.request(url, 'post', this.getParams(ob_params), "raw")
            let resJson = response; // JSON.parse(response)
            if (resJson["result"]) {
                // this.vodDetail = await this.parseVodDetailfromJson()
                let obj = resJson["data"];
                let vodDetail = {}
                vodDetail.vod_name = obj["vodName"]
                vodDetail.vod_content = obj["intro"]
                vodDetail.vod_area = obj["areaName"]
                vodDetail.vod_year = obj["year"]
                vodDetail.type_name = obj["channelName"]
                vodDetail.vod_remarks = "评分:" + obj["score"].toString()
                vodDetail.vod_pic = obj["coverImg"]
                vodDetail.vod_actor = Utils.objToList(obj["actorList"], "vodWorkerName")
                vodDetail.vod_director = Utils.objToList(obj["directorList"], "vodWorkerName")
                let playlist = {}
                for (const playDic of obj["playerList"]) {
                    let vodItems = []
                    for (const item of playDic["epList"]) {
                        let playId = item["epId"]
                        let playName = item["epName"]
                        vodItems.push(playName + "$" + playId)
                    }
                    playlist[playDic["playerName"]] = vodItems.join("#")
                }
                vodDetail.vod_play_url = _.values(playlist).join('$$$');
                vodDetail.vod_play_from = _.keys(playlist).join('$$$');

                videos.push(vodDetail);

            }
        }

        return {
            list: videos,
        };
    }

    // flag, id, flags
    async play(inReq, _outResp) {
        const id = inReq.body.id;
        let url = this.siteUrl + "/v1/api/vodInfo/getEpDetail"
        let ob_params = {"epId": id}
        let ep_detail_response = await this.request(url, 'post', this.getParams(ob_params), "raw")
        let ep_detail_resJson = ep_detail_response; // JSON.parse(ep_detail_response)
        let vodResolution = "1";
        if (ep_detail_resJson["result"]) {
            if (ep_detail_resJson["data"]["resolutionItems"].length > 0) {
                vodResolution = ep_detail_resJson["data"]["resolutionItems"].slice(-1)[0]["vodResolution"].toString()
                let playUrl = this.siteUrl + "/v1/api/vodInfo/getPlayUrl"
                let play_params = {"epId": id, "vodResolution": vodResolution}
                let play_response = await this.request(playUrl, 'post', this.getParams(play_params), "raw")
                let play_resJson = play_response; //JSON.parse(play_response)
                if (play_resJson["result"]) {
                    return {
                        parse: 0,
                        url: play_resJson["data"]
                    };
                }
            }
        }
    }

    async setSearch(wd, quick) {
        let url = this.siteUrl + "/v1/api/search/search"
        let ob_prams = {"nextCount":15,"nextVal":"","keyword":wd}
        let esponse = await this.post(url, this.getParams(ob_prams), this.getHeader(), "raw")
        let resJson = JSON.parse(esponse)
        if (resJson["result"]) {
            this.vodList = await this.parseVodShortListFromJson(resJson["data"]["items"])
        } else {
            await this.jadeLog.error(`获取详情失败,失败原因为:${resJson["msg"]}`)
        }
    }

}

let spider = new YiqikanSpider()

async function init(inReq, _outResp) {
    return await spider.init(inReq, _outResp)
}

async function home(inReq, _outResp) {
    return await spider.home(inReq, _outResp)
}

async function category(inReq, _outResp) {
    return await spider.category(inReq, _outResp)
}

async function detail(inReq, _outResp) {
    return await spider.detail(inReq, _outResp)
}

async function play(inReq, _outResp) {
    return await spider.play(inReq, _outResp)
}

async function search(inReq, _outResp) {
    return await spider.search(inReq, _outResp)
}

async function test(inReq, _outResp) {
    return await spider.test(inReq, _outResp)
}

async function proxy(inReq, _outResp) {
    return await spider.proxy(inReq, _outResp)
}

export default {
    meta: {
        key: spider.getJSName(), name: spider.getName(), type: spider.getType(),
    }, 
    api: async (fastify) => {
        fastify.post('/init', init);
        fastify.post('/home', home);
        fastify.post('/category', category);
        fastify.post('/detail', detail);
        fastify.post('/play', play);
        fastify.post('/search', search);
        fastify.get('/proxy/:site/:what/:flag/:shareId/:fileId/:end', proxy);
        fastify.get('/test', test);
    }, 
    spider: {
        init: init, home: home, category: category, detail: detail, play: play, search: search, test: test, proxy: proxy
    }
}