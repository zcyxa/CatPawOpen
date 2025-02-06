
// import {Spider} from "./spider.js";
// import {VodDetail, VodShort} from "../lib/vod.js";
// import * as Utils from "../lib/utils.js";
import { NodeJSSpider } from "../spider.js";
import req from '../../util/req.js';
import pkg from 'lodash';
const { _ } = pkg;
import Crypto from 'crypto-js';
import { load } from 'cheerio';
import axios from 'axios';

let key = 'doll';
let siteUrl = 'https://hongkongdollvideo.com';

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';

class DollSpider extends NodeJSSpider {

    constructor() {
        super();
        this.siteUrl = 'https://hongkongdollvideo.com';
    }

    getName() { return "🔞 玩偶姐姐" }

    getAppName() { return "玩偶姐姐" }

    getJSName() { return "doll" }

    async request(reqUrl) {
        let res = await req(reqUrl, {
            method: 'get',
            headers: {
                'User-Agent': UA,
                'Referer': this.siteUrl,
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Upgrade-Insecure-Requests': 1
            },
        });
        return res.data;
    }
    
    async init(inReq, _outResp) {
        // siteKey = cfg.skey;
        // siteType = cfg.stype;
        // await initParseMap();
        return {};
    }
    
    async home(inReq, _outResp) {
        const classes = [];
        let index = 1
        let html = await this.request(this.siteUrl)
        if (html !== null) {
            let $ = load(html)
    
            let menuElements = $("[id=\"side-menu\"]").find("li")
            for (const menuElement of menuElements) {
                let type_id = $(menuElement).find("a")[0].attribs["href"]
                if (type_id !== undefined && type_id.indexOf(this.siteUrl) > -1) {
                    let type_dic = {
                        "type_name": $(menuElement).text(), "type_id": type_id
                    }
                    classes.push(type_dic)
                }
            }
    
    /*
            let navElements = $("[class=\"list-unstyled topnav-menu d-flex d-lg-block align-items-center justify-content-center flex-fill topnav-menu-left m-0\"]").find("li")
            for (const navElement of navElements) {
                let type_list = $(navElement).text().split("\n")
                let valueElements = $(navElement).find("a")
                let valueList = [{"n": "全部", "v": class_id}]
                let type_id = index.toString()
                for (const valueElement of valueElements) {
                    let title = $(valueElement).text().replaceAll("\n", "")
                    let href = valueElement.attribs["href"]
                    if (href !== undefined) {
                        valueList.push({"n": title, "v": href})
                    }
                }
                // type_list = type_list.filter(element => element !== "");
                // filterObj[class_id].push({"key": type_id, "name": type_list[0], "value": valueList})
    
                //下面这段是为了切割使用
                // let new_value_list = []
                // for (let i = 0; i < valueList.length; i++) {
                //     new_value_list.push(valueList[i])
                //     if (i % 8 === 0 && i !== 0) {
                //         this.filterObj[class_id].push({"key": type_id, "name": type_list[0], "value": new_value_list})
                //         new_value_list = []
                //     }
                // }
                // this.filterObj[class_id].push({"key": type_id, "name": type_list[0], "value": new_value_list})
    
            }*/
    
            /*
            let index = 1
            let class_id = index.toString()
            this.classes = []
            this.classes.push({"type_name": "首页", "type_id": "1"})
            this.filterObj[class_id] = []
            for (const navElement of navElements) {
                let type_list = $(navElement).text().split("\n")
                let valueElements = $(navElement).find("a")
                let valueList = [{"n": "全部", "v": class_id}]
                let type_id = index.toString()
                for (const valueElement of valueElements) {
                    let title = $(valueElement).text().replaceAll("\n", "")
                    let href = valueElement.attribs["href"]
                    if (href !== undefined) {
                        valueList.push({"n": title, "v": href})
                    }
                }
                type_list = type_list.filter(element => element !== "");
                filterObj[class_id].push({"key": type_id, "name": type_list[0], "value": valueList})
    
                //下面这段是为了切割使用
                // let new_value_list = []
                // for (let i = 0; i < valueList.length; i++) {
                //     new_value_list.push(valueList[i])
                //     if (i % 8 === 0 && i !== 0) {
                //         this.filterObj[class_id].push({"key": type_id, "name": type_list[0], "value": new_value_list})
                //         new_value_list = []
                //     }
                // }
                // this.filterObj[class_id].push({"key": type_id, "name": type_list[0], "value": new_value_list})
    
            }
            let menuElements = $("[id=\"side-menu\"]").find("li")
            for (const menuElement of menuElements) {
                let type_id = $(menuElement).find("a")[0].attribs["href"]
                if (type_id !== undefined && type_id.indexOf(this.siteUrl) > -1) {
                    let type_dic = {
                        "type_name": $(menuElement).text(), "type_id": type_id
                    }
                    classes.push(type_dic)
                }
            }*/
        }
    
        // const classes = [{'type_id':'latest','type_name':'最新'},];
        /*
        const filterObj = {
            '1':[{'key':'cateId','name':'类型','init':'1','value':[{'n':'全部','v':'1'},{'n':'动作片','v':'6'},{'n':'喜剧片','v':'7'},{'n':'爱情片','v':'8'},{'n':'科幻片','v':'9'},{'n':'恐怖片','v':'10'},{'n':'剧情片','v':'11'},{'n':'战争片','v':'12'}]},{'key':'year','name':'年代','init':'','value':[{'n':'全部','v':''},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'2019','v':'2019'},{'n':'2018','v':'2018'},{'n':'2017','v':'2017'},{'n':'2016','v':'2016'},{'n':'2015','v':'2015'},{'n':'2014','v':'2014'},{'n':'2013','v':'2013'},{'n':'2012','v':'2012'},{'n':'2011','v':'2011'},{'n':'2010','v':'2010'}]},{'key':'by','name':'排序','value':[{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
            '2':[{'key':'cateId','name':'类型','init':'2','value':[{'n':'全部','v':'2'},{'n':'国产剧','v':'13'},{'n':'港台剧','v':'14'},{'n':'日韩剧','v':'15'},{'n':'欧美剧','v':'16'},{'n':'其他剧','v':'20'}]},{'key':'year','name':'年代','init':'','value':[{'n':'全部','v':''},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'2019','v':'2019'},{'n':'2018','v':'2018'},{'n':'2017','v':'2017'},{'n':'2016','v':'2016'},{'n':'2015','v':'2015'},{'n':'2014','v':'2014'},{'n':'2013','v':'2013'},{'n':'2012','v':'2012'},{'n':'2011','v':'2011'},{'n':'2010','v':'2010'},{'n':'2009','v':'2009'},{'n':'2008','v':'2008'},{'n':'2007','v':'2007'},{'n':'2006','v':'2006'},{'n':'2005','v':'2005'},{'n':'2004','v':'2004'}]},{'key':'by','name':'排序','value':[{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
            '3':[{'key':'year','name':'年代','init':'','value':[{'n':'全部','v':''},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'2019','v':'2019'},{'n':'2018','v':'2018'},{'n':'2017','v':'2017'},{'n':'2016','v':'2016'},{'n':'2015','v':'2015'},{'n':'2014','v':'2014'},{'n':'2013','v':'2013'},{'n':'2012','v':'2012'},{'n':'2011','v':'2011'},{'n':'2010','v':'2010'},{'n':'2009','v':'2009'},{'n':'2008','v':'2008'},{'n':'2007','v':'2007'},{'n':'2006','v':'2006'},{'n':'2005','v':'2005'},{'n':'2004','v':'2004'}]},{'key':'by','name':'排序','value':[{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
            '4':[{'key':'year','name':'年代','init':'','value':[{'n':'全部','v':''},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'2019','v':'2019'},{'n':'2018','v':'2018'},{'n':'2017','v':'2017'},{'n':'2016','v':'2016'},{'n':'2015','v':'2015'},{'n':'2014','v':'2014'},{'n':'2013','v':'2013'},{'n':'2012','v':'2012'},{'n':'2011','v':'2011'},{'n':'2010','v':'2010'},{'n':'2009','v':'2009'},{'n':'2008','v':'2008'},{'n':'2007','v':'2007'},{'n':'2006','v':'2006'},{'n':'2005','v':'2005'},{'n':'2004','v':'2004'}]},{'key':'by','name':'排序','value':[{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}]
        };*/
        const filterObj = {};
        return JSON.stringify({
            class: classes,
            filters: filterObj,
        });
    }
    
    async category(inReq, _outResp) {
    
        const tid = inReq.body.id;
        let pg = inReq.body.page;
        const extend = inReq.body.filters;
        if (pg <= 0) pg = 1;
    
        const link = tid + pg + '.html';
        // const link = 'https://hongkongdollvideo.com/' + (extend.class || tid) + '/'+ pg + '.html';
        // const link = HOST + '/column/' + (extend.cateId || tid) + '-'+ pg + '.html';
    
        const html = await this.request(link);
        const $ = load(html);
        const items = $('div.video-detail');
        
        const proxyUrl = inReq.server.address().url + inReq.server.prefix + '/proxy';
        const videos = _.map(items, (item) => {
            const $item = $(item);
            const id = $item.find("a")[0].attribs["href"]
            let videoInfoElements = $item.find("[class=\"video-info\"]").find("a")
            const vod_name = videoInfoElements[0].attribs["title"]
            const remarks = $(videoInfoElements[1]).text()
            const img = $item.find("img")[0].attribs["data-src"]
            return {
                vod_id: id,
                vod_name: vod_name,
                vod_pic: proxyUrl + '/' + this.base64Encode(img),
                vod_remarks: remarks,
            };
        });
    
        const limit = 24;
        const hasMore = $('div.row.mt-3.mb-3 ul li:last').find('span').length > 0; // $('div.btn-group > a:contains(下一页)').length > 0;
        const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
        return JSON.stringify({
            page: pg,
            pagecount: pgCount,
            limit: limit,
            total: limit * pgCount,
            list: videos,
        });
    }
    
    async proxy(inReq, outResp) {
        const img = inReq.params.img;
        const t = this.base64Decode(img)
        var resp = await req(t, {
            // buffer: 2,
            headers: {
                Referer: this.siteUrl,
                'User-Agent': UA,
            },
            responseType: 'arraybuffer',
        });
        // outResp.code(200).content = resp.data;
        outResp.code(200).headers('Content-Type', resp.headers['Content-Type']).send(resp.data);
    }

    base64Encode(text) {
        return Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(text));
    }
    
    base64Decode(text) {
        return Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(text));
    }

    async detail(inReq, _outResp) {
        const ids = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
        const videos = [];
    
        for (const id of ids) {
            // let html = await this.fetch(id, null, this.getHeader())
            const html = await this.request(id);
            /*
            if (html != null) {
                let $ = load(html)
                let key = Utils.getStrByRegex(/video\/(\w+).html/, id)
                this.vodDetail = await this.parseVodDetailFromDoc($, key)
            }*/
    
            const $ = load(html);
            let vodElement = $("[class=\"container-fluid\"]")
            
            const vod = {
                vod_id: id,
                // vod_name : $($(vodElement).find("[class=\"page-title\"]")[0]).text(),
                vod_name: $('h1:first').text().trim(),
                vod_type: $('.module-info-tag a:eq(2)').text().trim(),
                vod_year: $('.module-info-tag a:eq(0)').text().trim(),
                vod_area: $('.module-info-tag a:eq(1)').text().trim(),
                vod_actor: $('.module-info-item:contains(主演：)').text().trim().substring(3).replace(/\/$/, ''),
                vod_director: $('.module-info-item:contains(导演：)').text().trim().substring(3).replace(/\/$/, ''),
                vod_pic: $('.module-info-poster img:first').attr('data-original'),
                // vod_pic : $(vodElement).find("video")[0].attribs["poster"],
                vod_remarks : $('.module-info-item:contains(备注：)').text(),
                // vod_remarks : $(vodElement).find("[class=\"tag my-1 text-center\"]")[0].attribs["href"].replaceAll("/", ""),
                vod_content: $('.module-info-introduction-content').text().trim(),
            };
    
            // let html = $.html()
            // let voteTag = Utils.getStrByRegex(/var voteTag="(.*?)";/g, html)
            // let videoInfo = JSON.parse(Utils.getStrByRegex(/<script type="application\/ld\+json">(.*?)<\/script>/g, html))
            //
            // try {
            //     let play_url_1 = await this.fetch(videoInfo["contentUrl"], null, this.getHeader())
            //     await this.jadeLog.debug(`播放链接为:${play_url_1}`)
            // } catch (e) {
            //     await this.jadeLog.error(e)
            // }
    
            /* 核实
            voteTag = Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(voteTag))
            let code = []
            for (let i = 0; i < voteTag.length; i++) {
                let k = i % key.length;
                code.push(String.fromCharCode(voteTag.charCodeAt(i) ^ key.charCodeAt(k)))
            }*/
    
            // let play_url_2 = decodeURIComponent(Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(code.join(""))))
            // vodDetail.vod_play_from = "玩偶姐姐"
            // vodDetail.vod_play_url = "玩偶姐姐" + "$" + play_url_2;
    
            vod.vod_play_from = "玩偶姐姐"
            vod.vod_play_url = "玩偶姐姐" + "$" + JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]).embedUrl;
            videos.push(vod);
        }
    
        return ({
            list: videos,
        });
    }
    
    async play(inReq, _outResp) {
        const id = inReq.body.id;
        const html = await this.request(id);
        const $ = load(html);
        const rand =  html.match(/src\({"src":"([^"]*)"/)[1];
        const result = {
            parse: 0,
            url: rand
        };
        return JSON.stringify(result);
        console.log();
    }
    
    async search(inReq, _outResp) {
        const pg = inReq.body.page;
        const wd = inReq.body.wd;
        let page = pg || 1;
        if (page == 0) page = 1;
        
        // https://hongkongdollvideo.com/search/%E5%A4%A9%E7%BE%8E/2.html
        // const data = (await this.request(this.siteUrl + '/index.php/ajax/suggest?mid=1&limit=50&wd=' + wd)).list;
        let html;

        if (page == 1) {
            html = await this.request(this.siteUrl + '/search/' + wd + '.html');
        } else {
            html = await this.request(this.siteUrl + '/search/' + wd + '/' + pg + '.html');
        }
        const $ = load(html);

        const items = $('div.video-detail');
        const proxyUrl = inReq.server.address().url + inReq.server.prefix + '/proxy';
        const videos = _.map(items, (item) => {
            const $item = $(item);
            const id = $item.find("a")[0].attribs["href"]
            let videoInfoElements = $item.find("[class=\"video-info\"]").find("a")
            const vod_name = videoInfoElements[0].attribs["title"]
            const remarks = $(videoInfoElements[1]).text()
            const img = $item.find("img")[0].attribs["data-src"]
            return {
                vod_id: id,
                vod_name: vod_name,
                vod_pic: proxyUrl + '/' + this.base64Encode(img),
                vod_remarks: remarks,
            };
        });
        
        const limit = 24;
        const hasMore = $('div.row.mt-3.mb-3 ul li:last').find('span').length > 0; // $('div.btn-group > a:contains(下一页)').length > 0;
        const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
        return JSON.stringify({
            page: pg,
            pagecount: pgCount,
            limit: limit,
            total: limit * pgCount,
            list: videos,
        });

        /*
        const videos = _.map(data, (vod) => {
            return {
                vod_id: vod.id,
                vod_name: vod.name,
                vod_pic: vod.pic,
                vod_remarks: '',
            };
        });
        return JSON.stringify({
            list: videos,
        });*/
        return {}
    }
    
    async setSearch(wd, quick) {
        let searchUrl = this.siteUrl + "search/" + encodeURIComponent(wd)
        let html = await this.fetch(searchUrl, null, this.getHeader())
        if (html !== null) {
            let $ = load(html)
            this.vodList = await this.parseVodShortListFromDoc($)
        }
    }
    
    async test(inReq, outResp) {
        try {
            const printErr = function (json) {
                if (json.statusCode && json.statusCode == 500) {
                    console.error(json);
                }
            };
            const prefix = inReq.server.prefix;
            const dataResult = {};
            let resp = await inReq.server.inject().post(`${prefix}/init`);
            dataResult.init = resp.json();
            printErr(resp.json());
            resp = await inReq.server.inject().post(`${prefix}/home`);
            dataResult.home = resp.json();
            printErr("" + resp.json());

            resp = await inReq.server.inject().post(`${prefix}/search`).payload({
                wd: '暴走',
                page: 1,
            });
            dataResult.search = resp.json();
            printErr("" + resp.json());

            if (dataResult.home.class.length > 0) {
                resp = await inReq.server.inject().post(`${prefix}/category`).payload({
                    id: dataResult.home.class[0].type_id,
                    page: 1,
                    filter: true,
                    filters: {},
                });
                dataResult.category = resp.json();
                printErr(resp.json());
                if (dataResult.category.list.length > 0) {
                    resp = await inReq.server.inject().post(`${prefix}/detail`).payload({
                        id: dataResult.category.list[0].vod_id, // dataResult.category.list.map((v) => v.vod_id),
                    });
                    dataResult.detail = resp.json();
                    printErr(resp.json());
                    if (dataResult.detail.list && dataResult.detail.list.length > 0) {
                        dataResult.play = [];
                        for (const vod of dataResult.detail.list) {
                            const flags = vod.vod_play_from.split('$$$');
                            const ids = vod.vod_play_url.split('$$$');
                            for (let j = 0; j < flags.length; j++) {
                                const flag = flags[j];
                                const urls = ids[j].split('#');
                                for (let i = 0; i < urls.length && i < 2; i++) {
                                    resp = await inReq.server
                                        .inject()
                                        .post(`${prefix}/play`)
                                        .payload({
                                            flag: flag,
                                            id: urls[i].split('$')[1],
                                        });
                                    dataResult.play.push(resp.json());
                                }
                            }
                        }
                    }
                }
            }
            printErr(resp.json());
            return dataResult;
        } catch (err) {
            console.error(err);
            outResp.code(500);
            return { err: err.message, tip: 'check debug console output' };
        }
    }
}

/*
export default {
    meta: {
        key: 'doll',
        name: '🔞|玩偶姐姐',
        type: 3,
    },
    api: async (fastify) => {
        fastify.post('/init', init);
        fastify.post('/home', home);
        fastify.post('/category', category);
        fastify.post('/detail', detail);
        fastify.post('/play', play);
        fastify.post('/search', search);
        fastify.get('/test', test);
    },
};*/

let spider = new DollSpider()

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
        fastify.get('/proxy/:img', proxy);
        fastify.get('/test', test);
    }, 
    spider: {
        init: init, home: home, category: category, detail: detail, play: play, search: search, test: test, proxy: proxy
    }
}