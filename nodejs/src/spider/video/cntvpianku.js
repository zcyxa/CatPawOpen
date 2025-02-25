// 无搜索功能
import { Spider } from '../spider.js';
import req from '../../util/req.js';
import CryptoJS from 'crypto-js';
import { load } from 'cheerio';
import _ from 'lodash';

import * as Utils from '../../util/utils.js';

const MOBILE_UA = 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36';

class CntvSpider extends Spider {
    constructor() {
        super();
        this.siteUrl = 'https://tv.cctv.com/m/index.shtml';
        this.apiUrl = 'https://api.app.cctv.com';
        this.liveJsonUrl = 'https://gh.con.sh/https://github.com/jadehh/LiveSpider/blob/main/json/live.json';
    }

    getName() {
        return '央视片库';
    }

    getAppName() {
        return '央视影音';
    }

    getJSName() {
        return 'cntv';
    }

    getType() {
        return 3;
    }

    async init(inReq, _outResp) {
        this.liveJson = await this.request(this.liveJsonUrl, null, null);
        return {};
    }

    async getFilterByLive(dataList) {
        let extend_list = [];
        let extend_dic = { key: 'live', name: '直播', value: [] };
        for (const data of dataList) {
            if (data['appBarTitle'] !== '最近常看') {
                extend_dic['value'].push({ n: data['appBarTitle'], v: data['pageId'] });
            }
        }
        extend_list.push(extend_dic);
        return extend_list;
    }

    arrayIsinclude(str, items) {
        let isInclude = false;
        for (const data of items) {
            if (str === data['title']) {
                return true;
            }
        }
        return isInclude;
    }

    async getFilterByTv(dataList) {
        let extend_list = [];
        for (const data of dataList) {
            let add_year_status = false;
            let extend_dic = { key: data['classname'], name: data['title'], value: [] };
            for (const extendData of data['items']) {
                if (data['classname'] === 'nianfen') {
                    if (!this.arrayIsinclude('2024', data['items']) && extendData['title'] !== '全部' && !add_year_status) {
                        extend_dic['value'].push({ n: '2024', v: '2024' });
                        add_year_status = true;
                    }
                }
                extend_dic['value'].push({ n: extendData['title'], v: extendData['title'] });
            }
            extend_list.push(extend_dic);
        }
        return extend_list;
    }

    parseVodShortByJson(items) {
        let vod_list = [];
        for (const item of items) {
            // let vodShort = new VodShort()
            let vodShort = {};
            vodShort.vod_pic = item['img1'];
            if (_.isEmpty(vodShort.vod_pic)) {
                vodShort.vod_pic = item['epgHorizontalPic'];
                vodShort.vod_id = 'live-' + item['epgChnlChar'] + '-' + vodShort.vod_pic;
            } else {
                vodShort.vod_id = 'play-' + item['playid'] + '-' + vodShort.vod_pic;
                vodShort.vod_pic = item['img1'];
            }
            vodShort.vod_name = item['title'];
            vod_list.push(vodShort);
        }
        return vod_list;
    }

    parseVodShortByTvJson(items) {
        let vod_list = [];
        for (const item of items) {
            // let vodShort = new VodShort()
            let vodShort = {};
            //关键是如何获取GUID 2d3224585904496ea837f682da0c4aa6
            vodShort.vod_id = 'url-' + item['vsetid'];
            vodShort.vod_name = item['title'];
            vodShort.vod_pic = item['image'];
            vodShort.vod_remarks = item['sc'];
            vod_list.push(vodShort);
        }
        return vod_list;
    }

    async parseVodShortListFromJson(objList) {
        let vod_list = [];
        let top_status = false;
        for (const data of objList) {
            if (data['title'] === '今日热点') {
                top_status = true;
            } else if (!_.isEmpty(data['title'])) {
                if (top_status) {
                    break;
                }
            }
            if (top_status) {
                vod_list = [...vod_list, ...this.parseVodShortByJson(data['items'])];
            }
        }
        return vod_list;
    }

    async getLiveUrl(channel_id, obj) {
        let liveApiUrl = `https://vdn.live.cntv.cn/api2/live.do?channel=pd://cctv_p2p_hd${channel_id}&client=iosapp`;
        let liveResponse = await req(liveApiUrl); // , {"headers": this.getHeader()}
        let liveJson = liveResponse['data']; // JSON.parse()
        let playList = {};
        let channelName = obj['channelName'].split(' ')[0].replaceAll('-', '').toLowerCase();
        let liveUrl = this.liveJson[channelName] ?? liveJson['hls_url']['hls2'];
        playList['直播'] = ['点击播放$' + liveUrl];
        // await this.jadeLog.info(`liveJson:${JSON.stringify(liveJson)}`)
        let vod_items = [];
        if (this.liveJson[channelName] !== undefined) {
        } else {
            for (const data of obj['program']) {
                let episodeName = data['showTime'] + '-' + data['t'];
                let episodeUrl = liveUrl + `?begintimeabs=${data['st'] * 1000}&endtimeabs=${data['et'] * 1000}`;
                vod_items.push(episodeName + '$' + episodeUrl);
            }
        }
        if (vod_items.length > 0) {
            playList['点播'] = vod_items.join('#');
        }
        return playList;
    }

    async getVideoUrl(guid) {
        return { 央视影音: ['点击播放' + '$' + guid].join('#') };
    }

    async parseVodDetailfromJson(id, obj, pic) {
        let vodDetail = {};
        let $;
        let guid;
        if (obj['url'] !== undefined) {
            vodDetail.vod_name = obj['title'];
            vodDetail.vod_pic = obj['img'];
            vodDetail.type_name = obj['tags'];
            vodDetail.vod_year = obj['time'];
            vodDetail.vod_content = obj['vset_brief'];
            vodDetail.vod_director = obj['vset_title'];
            let respData = await this.request(obj['url']);
            $ = load(respData);
        } else {
            if (_.isEmpty(obj['lvUrl'])) {
                vodDetail.vod_name = obj['channelName'];
                vodDetail.vod_pic = pic;
            } else {
                // $ = await this.getHtml(obj["lvUrl"])
                let respData = await this.request(obj['lvUrl']);
                $ = load(respData);
                vodDetail.vod_name = $('[property$=title]')[0].attribs.content;
                vodDetail.vod_content = $('[property$=description]')[0].attribs.content;
                let pic = $('[property$=image]')[0].attribs.content;
                if (!pic.startsWith('http')) {
                    pic = 'https:' + pic;
                }
                vodDetail.vod_pic = pic;
            }
        }
        if (!_.isEmpty($)) {
            guid = Utils.getStrByRegex(/var guid = "(.*?)"/, $.html());
        }
        let playlist;
        if (_.isEmpty(guid) && obj['url'] === undefined) {
            playlist = await this.getLiveUrl(id, obj);
        } else {
            playlist = await this.getVideoUrl(guid);
        }
        vodDetail.vod_play_url = _.values(playlist).join('$$$');
        vodDetail.vod_play_from = _.keys(playlist).join('$$$');
        return vodDetail;
    }

    async parseVodDetailFromJsonByTv(obj) {
        let vodDetail = {};
        vodDetail.vod_name = obj['videoSetInfo']['title'];
        vodDetail.type_name = obj['videoSetInfo']['sc'];
        vodDetail.vod_pic = obj['videoSetInfo']['image'];
        vodDetail.vod_content = obj['videoSetInfo']['brief'];
        vodDetail.vod_area = obj['videoSetInfo']['area'];
        let playlist = {};
        let vodItems = [];
        for (const data of obj['videoRoughCut']) {
            let title = data['title'].split('》').slice(-1)[0];
            vodItems.push(title + '$' + data['guid']);
        }
        playlist['央视影音'] = vodItems.join('#');
        vodDetail.vod_play_url = _.values(playlist).join('$$$');
        vodDetail.vod_play_from = _.keys(playlist).join('$$$');
        return vodDetail;
    }

    async setHomeVod() {
        let resJson = JSON.parse(await this.fetch(this.apiUrl + '/api/page/iphone/HandheldApplicationSink/7.0.0/158', null, this.getHeader()));
        this.homeVodList = await this.parseVodShortListFromJson(resJson['data']['templates']);
    }

    getExtendValue(extend, key) {
        if (extend[key] !== undefined && extend[key] !== '全部') {
            return extend[key];
        }
        return '';
    }

    async request(reqUrl, data, agentSp) {
        let res = await req(reqUrl, {
            method: 'get',
            headers: {
                'User-Agent': agentSp || MOBILE_UA,
            },
            data: data,
        });
        return res.data;
    }

    async home(inReq, _outResp) {
        const classes = [];
        const filterObj = {};

        let tvApi = 'https://cbox.cctv.com/cboxpcvip/online2022/yxg/data1.jsonp?=pk';
        let tvContent = await this.request(tvApi, null);

        // 转义
        let tvJSon = JSON.parse(
            tvContent
                .replace(/[\n\r\t]/g, '')
                .replaceAll('pk(', '')
                .replaceAll(')', ''),
        );
        for (const data of tvJSon['data']) {
            let typeName = data['title'];
            classes.push({ type_name: typeName, type_id: typeName });
            filterObj[typeName] = await this.getFilterByTv(data['templates']);
        }

        // 直播
        let liveTypeId = 'cctvlive';
        let liveApi = this.apiUrl + `/api/navigation/iphone/AppStore/7.9.4/${liveTypeId}`;
        let liveJson = await this.request(liveApi, null);
        let extend_list = await this.getFilterByLive(liveJson['data']['templates']);
        let defaultLiveId = extend_list[0]['value'][0]['v'];
        classes.push({ type_name: '直播', type_id: defaultLiveId });
        filterObj[defaultLiveId] = extend_list;

        return JSON.stringify({
            class: classes,
            filters: filterObj,
        });
    }

    async category(inReq, _outResp) {
        let tid = inReq.body.id;
        let pg = inReq.body.page;
        const extend = inReq.body.filters;

        if (pg <= 0) pg = 1;

        let videos = [];
        if (!isNaN(parseInt(tid))) {
            tid = extend['live'] ?? tid;
            let url = this.apiUrl + `/api/page/iphone/HandheldApplicationSink/7.0.0/${tid}`;
            let response = await this.request(url, null);
            videos = this.parseVodShortByJson(response['data']['templates'][0]['items']);
        } else {
            let letter = this.getExtendValue(extend, 'zimu');
            let area = this.getExtendValue(extend, 'diqu');
            let type = this.getExtendValue(extend, 'leixing');
            let year = this.getExtendValue(extend, 'nianfen');
            const limit = 12;
            let url = 'https://api.cntv.cn' + `/newVideoset/getCboxVideoAlbumList`;
            let params = {
                channelid: '',
                sc: type,
                fc: tid,
                p: pg,
                n: limit,
                fl: letter,
                area: area,
                year: year,
                serviceId: 'cbox',
            };

            let data = Utils.objectToStr(params);

            if (!_.isEmpty(data)) {
                url = url + '?' + data;
            }

            let resJson = await this.request(url);
            videos = this.parseVodShortByTvJson(resJson['data']['list']);
        }

        return JSON.stringify({
            page: parseInt(pg),
            // pagecount: pgCount,
            // limit: limit,
            // total: limit * pgCount,
            list: videos,
        });
    }

    async detail(inReq, _outResp) {
        const ids = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
        const videos = [];
        for (let id of ids) {
            //区分直播还是点播
            let aList = id.split('-');
            let playType = aList[0];
            let pic = aList[2];
            id = aList[1];
            if (playType === 'play') {
                let resJson = await this.request(`https://api.cntv.cn/video/videoinfoByGuid?serviceId=cbox&guid=${id}`, null);
                let vodDetail = await this.parseVodDetailfromJson(id, resJson, pic);
                videos.push(vodDetail);
            } else if (playType === 'url') {
                let url = `https://api.app.cctv.com/api/getVideoPageDetail?videoSetContentId=${id}`;
                let resJson = await this.request(url, null);
                let vodDetail = await this.parseVodDetailFromJsonByTv(resJson['data']);
                videos.push(vodDetail);
            } else {
                let data = await this.request(`https://api.cntv.cn/epg/epginfo3?serviceId=shiyi&c=${id}&cb=LiveTileShow.prototype.getEpg`, null);
                let content = JSON.parse(data.replaceAll('LiveTileShow.prototype.getEpg(', '').replaceAll(');', ''));
                let vodDetail = await this.parseVodDetailfromJson(id, content[id], pic);
                videos.push(vodDetail);
            }
        }

        return {
            list: videos,
        };
    }

    async search(wd, quick, pg) {}

    async play(inReq, _outResp) {
        const id = inReq.body.id;
        if (id.startsWith('http')) {
            let playUrl = id;
            return {
                parse: 0,
                url: playUrl,
            };

            // let headers = this.getHeader()
            // headers["Referer"] = "https://tv.cctv.com/"
            // this.result.header = headers
        } else {
            let playUrl = 'https://hls.cntv.myhwcdn.cn/asp/hls/2000/0303000a/3/default/' + id + '/main.m3u8';
            return {
                parse: 0,
                url: playUrl,
            };
        }
    }
}

let spider = new CntvSpider();

const routeHandlers = ['init', 'home', 'category', 'detail', 'play', 'search', 'test'];

const routes = {
    meta: {
        key: spider.getJSName(),
        name: spider.getName(),
        type: spider.getType(),
    },
    api: async (fastify) => {
        for (const handler of routeHandlers) {
            fastify.post(`/${handler}`, async (inReq, _outResp) => {
                return await spider[handler](inReq, _outResp);
            });
        }
        fastify.get('/test', async (inReq, _outResp) => {
            return await spider.test(inReq, _outResp);
        });
    },
};

export default routes;
