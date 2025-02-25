import CryptoJS from 'crypto-js';
import req from '../../util/req.js';
import pkg from 'lodash';
const { _ } = pkg;
import { load } from 'cheerio';

let DOMAIN = 'ddys.pro';//ddys.mov
let HOST = 'https://' + DOMAIN;
let PLAY_HOST = 'https://v.' + DOMAIN;
const FROM_DIRECT = '直连';
const FROM_PARSE = '解析';

const UA = 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36';

async function request(reqUrl) {
    const res = await req(reqUrl, {
        method: 'get',
        headers: {
            'Host': DOMAIN,
            'User-Agent': UA,
            'Referer': HOST + '/',
            'Accept-Encoding': 'gzip',
        },
    });
    return res.data;
}

// cfg = {skey: siteKey, ext: extend}
async function init(inReq, _outResp) {
   return {}
}

async function home(filter) {
    const classes = [{'type_id':'class','type_name':'类型'},{'type_id':'movie','type_name':'电影'},{'type_id':'airing','type_name':'热映中'},{'type_id':'drama','type_name':'剧集'},{'type_id':'anime','type_name':'动画'},{'type_id':'documentary','type_name':'纪录片'},{'type_id':'variety','type_name':'综艺'}];
    const filterObj = {
        'class':[{'key':'tag','name':'标签','init':'recommend','value':[{'n':'推荐','v':'recommend'},{'n':'动作','v':'action'},{'n':'喜剧','v':'comedy'},{'n':'爱情','v':'romance'},{'n':'科幻','v':'sci-fi'},{'n':'犯罪','v':'crime'},{'n':'悬疑','v':'mystery'},{'n':'恐怖','v':'horror'}]}],
        'movie':[{'key':'type','name':'分类','init':'','value':[{'n':'全部','v':''},{'n':'欧美','v':'western-movie'},{'n':'日韩','v':'asian-movie'},{'n':'华语','v':'chinese-movie'}]}],
        'drama':[{'key':'type','name':'分类','init':'','value':[{'n':'全部','v':''},{'n':'欧美剧','v':'western-drama'},{'n':'日剧','v':'jp-drama'},{'n':'韩剧','v':'kr-drama'},{'n':'华语剧','v':'cn-drama'},{'n':'其他地区','v':'other'}]}],
        'anime':[{'key':'type','name':'分类','init':'','value':[{'n':'全部','v':''},{'n':'本季新番','v':'new-bangumi'}]}]
    };
    return ({
        class: classes,
        filters: filterObj,
    });
}


async function category(inReq, _outResp) {
    const tid = inReq.body.id;
     let pg = inReq.body.page;
     const extend = inReq.body.filters;
    if (pg <= 0) pg = 1;
    let path = '';
    if (extend.tag) {
        path = '/tag/' + extend.tag;
    } else {
        path = '/category/' + tid;
        if (!_.isEmpty(extend.type)) {
            path += '/' + extend.type;
        }
    }
    let page = '';
    if (pg > 1) {
        page = 'page/' + pg + '/';
    }
    const link = HOST + path + '/' + page;
    const html = await request(link);
    const $ = load(html);
    const items = $('.post-box-list article');
    const videos = _.map(items, (item) => {
        const $item = $(item);
        const title = $item.find('.post-box-title a');
        const name = title.text();
        const url = title.attr('href');
        const image = $item.find('.post-box-image').attr('style').replace(/.*url\((.*)\);/g, '$1');
        const remarks = $item.find('.post-box-meta').text();
        return {
            vod_id: url.replace(/.*\/\/.*\/(.*)\//g, '$1'),
            vod_name: name,
            vod_pic: image,
            vod_remarks: remarks || '',
        };
    });
    const limit = 28;
    const hasMore = $('nav.navigation a.next').length > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return ({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: limit,
        total: limit * pgCount,
        list: videos,
    });
}

async function detail(inReq, _outResp) {
    const id = inReq.body.id;
    const html = await request(HOST + '/' + id + '/');
    const $ = load(html);
    const abstract = $('div.abstract')[0].children;
    const vod = {
        vod_id: id,
        vod_name: $('h1.post-title').text(),
        vod_type: findAbstractText(abstract, '类型:'),
        vod_year: findAbstractText(abstract, '年份:'),
        vod_area: findAbstractText(abstract, '制片国家/地区:'),
        vod_director: findAbstractText(abstract, '导演:'),
        vod_actor: findAbstractText(abstract, '演员:'),
        vod_pic: $('div.post img:first').attr('data-cfsrc'),
        vod_remarks : $('span.cat-links').text().trim(),
        vod_content: findAbstractText(abstract, '简介:'),
    };
    const playMap = {};
    parseAndUpdateUrls($, playMap);
    const links = $('div.page-links a');
    if (!_.isEmpty(links)) {
        const promiseList = _.map(links, (link) => {
            const url = $(link).attr('href');
            return request(url);
        });
        const respList = await Promise.all(promiseList);
        _.each(respList, (resp) => {
            try {
                const $ = load(resp);
                parseAndUpdateUrls($, playMap);
            } catch(e) {
            }
        });
    }
    vod.vod_play_from = _.keys(playMap).join('$$$');
    const urls = _.values(playMap);
    const vod_play_url = _.map(urls, (urlist) => {
        return urlist.join('#');
    });
    vod.vod_play_url = vod_play_url.join('$$$');
    return ({
        list: [vod],
    });
}

function findAbstractText(children, keyword) {
    for (const item of children) {
        if (item.type == 'text' && item.data && item.data.startsWith(keyword)) {
            return item.data.substring(keyword.length).trim();
        }
    }
    return '';
}

function parseAndUpdateUrls($, playMap) {
    const trackText = $('script.wp-playlist-script').text();
    const tracks = JSON.parse(trackText).tracks;
    _.each(tracks, (track) => {
        const title = track.caption;
        const directUrl = track.src0;
        if (!playMap.hasOwnProperty(FROM_DIRECT)) {
            playMap[FROM_DIRECT] = [];
        }
        playMap[FROM_DIRECT].push(title + '$' + directUrl);
        if (!_.isEmpty(track.src1)) {
            if (!playMap.hasOwnProperty(FROM_PARSE)) {
                playMap[FROM_PARSE] = [];
            }
            playMap[FROM_PARSE].push(title + '$' + track.src1);
        }
    });
}

async function play(inReq, _outResp) {
        const id = inReq.body.id;
        let flag = inReq.body.flag;
    let playUrl;
    if (flag == FROM_PARSE) {
        const resp = await request(HOST + '/getvddr2/video?id=' + id + '&type=json');
        playUrl = JSON.parse(resp).url;
    } else {
        playUrl = PLAY_HOST + id;
    }
    const headers = {
        'User-Agent': UA,
        'Referer': HOST,
        'Icy-MetaData': '1',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'video',
    };
    return ({
        parse: 0,
        url: playUrl,
        header: headers,
    });
}

async function search(inReq, _outResp) {
    const wd = inReq.body.wd;
        let pg = inReq.body.page;
    let page = '';
    if (pg > 1) {
        page = '/page/' + pg;
    }
    const html = await request(HOST + page + '/?s=' + wd + '&post_type=post');
    const $ = load(html);
    const list = $('div.post-content');
    const videos = _.map(list, (item) => {
        const $item = $(item);
        const title = $item.find('.post-title a');
        const name = title.text();
        const url = title.attr('href');
        const remarks = $item.find('.cat-links').text();
        return {
            vod_id: url.replace(/.*\/\/.*\/(.*)\//g, '$1'),
            vod_name: name,
            vod_pic: HOST + '/android-chrome-512x512.png',
            vod_remarks: remarks,
        };
    });
    const limit = 100;
    const hasMore = $('nav.navigation a.next').length > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return ({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: limit,
        total: limit * pgCount,
        list: videos,
    });
}

async function test(inReq, outResp) {
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
                    // id: dataResult.category.list[0].vod_id, // dataResult.category.list.map((v) => v.vod_id),
                    id: 714890831
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
        resp = await inReq.server.inject().post(`${prefix}/search`).payload({
            wd: '暴走',
            page: 1,
        });
        dataResult.search = resp.json();
        printErr(resp.json());
        return dataResult;
    } catch (err) {
        console.error(err);
        outResp.code(500);
        return { err: err.message, tip: 'check debug console output' };
    }
}


export default {
    meta: {
        key: 'ddys',
        name: '低端',
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
};
