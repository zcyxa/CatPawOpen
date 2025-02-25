import req from '../../util/req.js';
import pkg from 'lodash';
const { _ } = pkg;
import { load } from 'cheerio';

let HOST = 'https://sc1080.top';

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';

async function request(reqUrl, method, data) {
    const res = await req(reqUrl, {
        method: method || 'get',
        headers: {
            'User-Agent': UA,
            'Referer': HOST,
        },
        data: data,
        postType: method === 'post' ? 'form' : '',
    });
    return res.data;
}

// cfg = {skey: siteKey, ext: extend}
async function init(cfg) {
    return {}
}

async function home(filter) {
    let classes = [{'type_id':20,'type_name':'4K片库'},{'type_id':1,'type_name':'电影'},{'type_id':2,'type_name':'剧集'},{'type_id':3,'type_name':'综艺'},{'type_id':4,'type_name':'动漫'},{'type_id':5,'type_name':'纪录片'},{'type_id':21,'type_name':'短剧'}];
    let filterObj = {
        '1':[{'key':'class','name':'剧情','init':'','value':[{'n':'全部','v':''},{'n':'喜剧','v':'喜剧'},{'n':'爱情','v':'爱情'},{'n':'恐怖','v':'恐怖'},{'n':'动作','v':'动作'},{'n':'科幻','v':'科幻'},{'n':'剧情','v':'剧情'},{'n':'战争','v':'战争'},{'n':'警匪','v':'警匪'},{'n':'犯罪','v':'犯罪'},{'n':'动画','v':'动画'},{'n':'奇幻','v':'奇幻'},{'n':'武侠','v':'武侠'},{'n':'冒险','v':'冒险'},{'n':'枪战','v':'枪战'},{'n':'恐怖','v':'恐怖'},{'n':'悬疑','v':'悬疑'},{'n':'惊悚','v':'惊悚'},{'n':'经典','v':'经典'},{'n':'青春','v':'青春'},{'n':'文艺','v':'文艺'},{'n':'其他微电影','v':'其他微电影'},{'n':'古装','v':'古装'},{'n':'历史','v':'历史'},{'n':'运动','v':'运动'},{'n':'农村','v':'农村'},{'n':'儿童','v':'儿童'},{'n':'网络电影','v':'网络电影'}]},{'key':'area','name':'地区','init':'','value':[{'n':'全部','v':''},{'n':'大陆','v':'大陆'},{'n':'香港','v':'香港'},{'n':'台湾','v':'台湾'},{'n':'美国','v':'美国'},{'n':'法国','v':'法国'},{'n':'英国','v':'英国'},{'n':'日本','v':'日本'},{'n':'韩国','v':'韩国'},{'n':'德国','v':'德国'},{'n':'泰国','v':'泰国'},{'n':'印度','v':'印度'},{'n':'意大利','v':'意大利'},{'n':'西班牙','v':'西班牙'},{'n':'加拿大','v':'加拿大'},{'n':'其他','v':'其他'}]},{'key':'lang','name':'类型','init':'','value':[{'n':'全部','v':''},{'n':'国语','v':'国语'},{'n':'英语','v':'英语'},{'n':'粤语','v':'粤语'},{'n':'闽南语','v':'闽南语'},{'n':'韩语','v':'韩语'},{'n':'日语','v':'日语'},{'n':'法语','v':'法语'},{'n':'德语','v':'德语'},{'n':'其它','v':'其它'}]},{'key':'year','name':'年份','init':'','value':[{'n':'全部','v':''},{'n':'2024','v':'2024'},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'1999','v':'1999'},{'n':'1998','v':'1998'},{'n':'1997','v':'1997'},{'n':'1995','v':'1995'},{'n':'1994','v':'1994'},{'n':'1993','v':'1993'},{'n':'1992','v':'1992'},{'n':'1991','v':'1991'},{'n':'1990','v':'1990'}]},{'key':'letter','name':'字母','init':'','value':[{'n':'全部','v':''},{'n':'A','v':'A'},{'n':'B','v':'B'},{'n':'C','v':'C'},{'n':'D','v':'D'},{'n':'E','v':'E'},{'n':'F','v':'F'},{'n':'G','v':'G'},{'n':'H','v':'H'},{'n':'I','v':'I'},{'n':'J','v':'J'},{'n':'K','v':'K'},{'n':'L','v':'L'},{'n':'M','v':'M'},{'n':'N','v':'N'},{'n':'O','v':'O'},{'n':'P','v':'P'},{'n':'Q','v':'Q'},{'n':'R','v':'R'},{'n':'S','v':'S'},{'n':'T','v':'T'},{'n':'U','v':'U'},{'n':'V','v':'V'},{'n':'W','v':'W'},{'n':'X','v':'X'},{'n':'Y','v':'Y'},{'n':'Z','v':'Z'},{'n':'0-9','v':'0-9'}]},{'key':'by','name':'排序','init':'','value':[{'n':'全部','v':''},{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
        '2':[{'key':'class','name':'剧情','init':'','value':[{'n':'全部','v':''},{'n':'古装','v':'古装'},{'n':'战争','v':'战争'},{'n':'青春偶像','v':'青春偶像'},{'n':'喜剧','v':'喜剧'},{'n':'家庭','v':'家庭'},{'n':'犯罪','v':'犯罪'},{'n':'动作','v':'动作'},{'n':'奇幻','v':'奇幻'},{'n':'剧情','v':'剧情'},{'n':'历史','v':'历史'},{'n':'经典','v':'经典'},{'n':'乡村','v':'乡村'},{'n':'情景','v':'情景'},{'n':'商战','v':'商战'},{'n':'网剧','v':'网剧'},{'n':'其他','v':'其他'}]},{'key':'area','name':'地区','init':'','value':[{'n':'全部','v':''},{'n':'内地','v':'内地'},{'n':'韩国','v':'韩国'},{'n':'香港','v':'香港'},{'n':'台湾','v':'台湾'},{'n':'日本','v':'日本'},{'n':'美国','v':'美国'},{'n':'泰国','v':'泰国'},{'n':'印度','v':'印度'},{'n':'英国','v':'英国'},{'n':'马来西亚','v':'马来西亚'},{'n':'加拿大','v':'加拿大'},{'n':'俄罗斯','v':'俄罗斯'},{'n':'新加坡','v':'新加坡'},{'n':'其他','v':'其他'}]},{'key':'lang','name':'类型','init':'','value':[{'n':'全部','v':''},{'n':'国语','v':'国语'},{'n':'英语','v':'英语'},{'n':'粤语','v':'粤语'},{'n':'闽南语','v':'闽南语'},{'n':'韩语','v':'韩语'},{'n':'日语','v':'日语'},{'n':'法语','v':'法语'},{'n':'德语','v':'德语'},{'n':'其它','v':'其它'}]},{'key':'year','name':'年份','init':'','value':[{'n':'全部','v':''},{'n':'2024','v':'2024'},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'1999','v':'1999'},{'n':'1998','v':'1998'},{'n':'1997','v':'1997'},{'n':'1995','v':'1995'},{'n':'1994','v':'1994'},{'n':'1993','v':'1993'},{'n':'1992','v':'1992'},{'n':'1991','v':'1991'},{'n':'1990','v':'1990'}]},{'key':'letter','name':'字母','init':'','value':[{'n':'全部','v':''},{'n':'A','v':'A'},{'n':'B','v':'B'},{'n':'C','v':'C'},{'n':'D','v':'D'},{'n':'E','v':'E'},{'n':'F','v':'F'},{'n':'G','v':'G'},{'n':'H','v':'H'},{'n':'I','v':'I'},{'n':'J','v':'J'},{'n':'K','v':'K'},{'n':'L','v':'L'},{'n':'M','v':'M'},{'n':'N','v':'N'},{'n':'O','v':'O'},{'n':'P','v':'P'},{'n':'Q','v':'Q'},{'n':'R','v':'R'},{'n':'S','v':'S'},{'n':'T','v':'T'},{'n':'U','v':'U'},{'n':'V','v':'V'},{'n':'W','v':'W'},{'n':'X','v':'X'},{'n':'Y','v':'Y'},{'n':'Z','v':'Z'},{'n':'0-9','v':'0-9'}]},{'key':'by','name':'排序','init':'','value':[{'n':'全部','v':''},{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
        '3':[{'key':'class','name':'剧情','init':'','value':[{'n':'全部','v':''},{'n':'选秀','v':'选秀'},{'n':'情感','v':'情感'},{'n':'访谈','v':'访谈'},{'n':'播报','v':'播报'},{'n':'旅游','v':'旅游'},{'n':'音乐','v':'音乐'},{'n':'美食','v':'美食'},{'n':'纪实','v':'纪实'},{'n':'曲艺','v':'曲艺'},{'n':'生活','v':'生活'},{'n':'游戏互动','v':'游戏互动'},{'n':'财经','v':'财经'},{'n':'求职','v':'求职'}]},{'key':'area','name':'地区','init':'','value':[{'n':'全部','v':''},{'n':'内地','v':'内地'},{'n':'港台','v':'港台'},{'n':'日韩','v':'日韩'},{'n':'欧美','v':'欧美'}]},{'key':'lang','name':'类型','init':'','value':[{'n':'全部','v':''},{'n':'国语','v':'国语'},{'n':'英语','v':'英语'},{'n':'粤语','v':'粤语'},{'n':'闽南语','v':'闽南语'},{'n':'韩语','v':'韩语'},{'n':'日语','v':'日语'},{'n':'法语','v':'法语'},{'n':'德语','v':'德语'},{'n':'其它','v':'其它'}]},{'key':'year','name':'年份','init':'','value':[{'n':'全部','v':''},{'n':'2024','v':'2024'},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'1999','v':'1999'},{'n':'1998','v':'1998'},{'n':'1997','v':'1997'},{'n':'1995','v':'1995'},{'n':'1994','v':'1994'},{'n':'1993','v':'1993'},{'n':'1992','v':'1992'},{'n':'1991','v':'1991'},{'n':'1990','v':'1990'}]},{'key':'letter','name':'字母','init':'','value':[{'n':'全部','v':''},{'n':'A','v':'A'},{'n':'B','v':'B'},{'n':'C','v':'C'},{'n':'D','v':'D'},{'n':'E','v':'E'},{'n':'F','v':'F'},{'n':'G','v':'G'},{'n':'H','v':'H'},{'n':'I','v':'I'},{'n':'J','v':'J'},{'n':'K','v':'K'},{'n':'L','v':'L'},{'n':'M','v':'M'},{'n':'N','v':'N'},{'n':'O','v':'O'},{'n':'P','v':'P'},{'n':'Q','v':'Q'},{'n':'R','v':'R'},{'n':'S','v':'S'},{'n':'T','v':'T'},{'n':'U','v':'U'},{'n':'V','v':'V'},{'n':'W','v':'W'},{'n':'X','v':'X'},{'n':'Y','v':'Y'},{'n':'Z','v':'Z'},{'n':'0-9','v':'0-9'}]},{'key':'by','name':'排序','init':'','value':[{'n':'全部','v':''},{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
        '4':[{'key':'class','name':'剧情','init':'','value':[{'n':'全部','v':''},{'n':'情感','v':'情感'},{'n':'科幻','v':'科幻'},{'n':'热血','v':'热血'},{'n':'推理','v':'推理'},{'n':'搞笑','v':'搞笑'},{'n':'冒险','v':'冒险'},{'n':'萝莉','v':'萝莉'},{'n':'校园','v':'校园'},{'n':'动作','v':'动作'},{'n':'机战','v':'机战'},{'n':'运动','v':'运动'},{'n':'战争','v':'战争'},{'n':'少年','v':'少年'},{'n':'少女','v':'少女'},{'n':'社会','v':'社会'},{'n':'原创','v':'原创'},{'n':'亲子','v':'亲子'},{'n':'益智','v':'益智'},{'n':'励志','v':'励志'},{'n':'其他','v':'其他'}]},{'key':'area','name':'地区','init':'','value':[{'n':'全部','v':''},{'n':'国产','v':'国产'},{'n':'日本','v':'日本'},{'n':'欧美','v':'欧美'},{'n':'其他','v':'其他'}]},{'key':'lang','name':'类型','init':'','value':[{'n':'全部','v':''},{'n':'国语','v':'国语'},{'n':'英语','v':'英语'},{'n':'粤语','v':'粤语'},{'n':'闽南语','v':'闽南语'},{'n':'韩语','v':'韩语'},{'n':'日语','v':'日语'},{'n':'法语','v':'法语'},{'n':'德语','v':'德语'},{'n':'其它','v':'其它'}]},{'key':'year','name':'年份','init':'','value':[{'n':'全部','v':''},{'n':'2024','v':'2024'},{'n':'2023','v':'2023'},{'n':'2022','v':'2022'},{'n':'2021','v':'2021'},{'n':'2020','v':'2020'},{'n':'1999','v':'1999'},{'n':'1998','v':'1998'},{'n':'1997','v':'1997'},{'n':'1995','v':'1995'},{'n':'1994','v':'1994'},{'n':'1993','v':'1993'},{'n':'1992','v':'1992'},{'n':'1991','v':'1991'},{'n':'1990','v':'1990'}]},{'key':'letter','name':'字母','init':'','value':[{'n':'全部','v':''},{'n':'A','v':'A'},{'n':'B','v':'B'},{'n':'C','v':'C'},{'n':'D','v':'D'},{'n':'E','v':'E'},{'n':'F','v':'F'},{'n':'G','v':'G'},{'n':'H','v':'H'},{'n':'I','v':'I'},{'n':'J','v':'J'},{'n':'K','v':'K'},{'n':'L','v':'L'},{'n':'M','v':'M'},{'n':'N','v':'N'},{'n':'O','v':'O'},{'n':'P','v':'P'},{'n':'Q','v':'Q'},{'n':'R','v':'R'},{'n':'S','v':'S'},{'n':'T','v':'T'},{'n':'U','v':'U'},{'n':'V','v':'V'},{'n':'W','v':'W'},{'n':'X','v':'X'},{'n':'Y','v':'Y'},{'n':'Z','v':'Z'},{'n':'0-9','v':'0-9'}]},{'key':'by','name':'排序','init':'','value':[{'n':'全部','v':''},{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
        '5':[{'key':'letter','name':'字母','init':'','value':[{'n':'全部','v':''},{'n':'A','v':'A'},{'n':'B','v':'B'},{'n':'C','v':'C'},{'n':'D','v':'D'},{'n':'E','v':'E'},{'n':'F','v':'F'},{'n':'G','v':'G'},{'n':'H','v':'H'},{'n':'I','v':'I'},{'n':'J','v':'J'},{'n':'K','v':'K'},{'n':'L','v':'L'},{'n':'M','v':'M'},{'n':'N','v':'N'},{'n':'O','v':'O'},{'n':'P','v':'P'},{'n':'Q','v':'Q'},{'n':'R','v':'R'},{'n':'S','v':'S'},{'n':'T','v':'T'},{'n':'U','v':'U'},{'n':'V','v':'V'},{'n':'W','v':'W'},{'n':'X','v':'X'},{'n':'Y','v':'Y'},{'n':'Z','v':'Z'},{'n':'0-9','v':'0-9'}]},{'key':'by','name':'排序','init':'','value':[{'n':'全部','v':''},{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
        '20':[{'key':'letter','name':'字母','init':'','value':[{'n':'全部','v':''},{'n':'A','v':'A'},{'n':'B','v':'B'},{'n':'C','v':'C'},{'n':'D','v':'D'},{'n':'E','v':'E'},{'n':'F','v':'F'},{'n':'G','v':'G'},{'n':'H','v':'H'},{'n':'I','v':'I'},{'n':'J','v':'J'},{'n':'K','v':'K'},{'n':'L','v':'L'},{'n':'M','v':'M'},{'n':'N','v':'N'},{'n':'O','v':'O'},{'n':'P','v':'P'},{'n':'Q','v':'Q'},{'n':'R','v':'R'},{'n':'S','v':'S'},{'n':'T','v':'T'},{'n':'U','v':'U'},{'n':'V','v':'V'},{'n':'W','v':'W'},{'n':'X','v':'X'},{'n':'Y','v':'Y'},{'n':'Z','v':'Z'},{'n':'0-9','v':'0-9'}]},{'key':'by','name':'排序','init':'','value':[{'n':'全部','v':''},{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
        '21':[{'key':'letter','name':'字母','init':'','value':[{'n':'全部','v':''},{'n':'A','v':'A'},{'n':'B','v':'B'},{'n':'C','v':'C'},{'n':'D','v':'D'},{'n':'E','v':'E'},{'n':'F','v':'F'},{'n':'G','v':'G'},{'n':'H','v':'H'},{'n':'I','v':'I'},{'n':'J','v':'J'},{'n':'K','v':'K'},{'n':'L','v':'L'},{'n':'M','v':'M'},{'n':'N','v':'N'},{'n':'O','v':'O'},{'n':'P','v':'P'},{'n':'Q','v':'Q'},{'n':'R','v':'R'},{'n':'S','v':'S'},{'n':'T','v':'T'},{'n':'U','v':'U'},{'n':'V','v':'V'},{'n':'W','v':'W'},{'n':'X','v':'X'},{'n':'Y','v':'Y'},{'n':'Z','v':'Z'},{'n':'0-9','v':'0-9'}]},{'key':'by','name':'排序','init':'','value':[{'n':'全部','v':''},{'n':'时间','v':'time'},{'n':'人气','v':'hits'},{'n':'评分','v':'score'}]}],
    };

    return ({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(inReq, _outResp) {
    const tid = inReq.body.id;
     let pg = inReq.body.page;
     const extend = inReq.body.filters;
    if (pg <= 0) pg = 1;
    const area = getFilterUrlPart(extend, 'area');
    const clazz = getFilterUrlPart(extend, 'class');
    const by = getFilterUrlPart(extend, 'by');
    const lang = getFilterUrlPart(extend, 'lang');
    const year = getFilterUrlPart(extend, 'year');
    let page = '';
    if (pg > 1) {
        page = '/page/' + pg;
    }
    const link = HOST + '/index.php/vod/show' + area + by + clazz + '/id/' + tid + lang + page + year + '.html';
    const html = await request(link);
    const $ = load(html);
    const items = $('.module .module-item');
    let videos = _.map(items, (item) => {
        const $item = $(item);
        const it = $item.find('a:first')[0];
        const img = $item.find('img:first')[0];
        const remarks = $item.find('.module-item-text').text().trim();
        return {
            vod_id: it.attribs.href.replace(/.*?\/detail\/id\/(.*).html/g, '$1'),
            vod_name: it.attribs.title,
            vod_pic: img.attribs['data-src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div#page > a.page-next').length > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    const limit = 24;
    return ({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: limit,
        total: limit * pgCount,
        list: videos,
    });
}

function getFilterUrlPart(extend, part) {
    let result = '';
    if (extend[part]) {
        result = '/' + part + '/' + extend[part];
    }
    return result;
}

async function detail(inReq, _outResp) {
    const id = inReq.body.id;
    const html = await request(HOST + '/index.php/vod/detail/id/' + id + '.html');
    const $ = load(html);
    const vod = {
        vod_id: id,
        vod_name: $('.page-title').text(),
        vod_area: $('a.tag-link:last').text(),
        vod_year: $('a.tag-link:eq(1)').text(),
        vod_director: $('.video-info-main .video-info-items:contains(导演：)').text().substring(3).replace(/(^\/|\/$)/g, ''),
        vod_actor: $('.video-info-main .video-info-items:contains(主演：)').text().substring(3).replace(/(^\/|\/$)/g, ''),
        vod_pic: $('.video-cover img:first').attr('data-src'),
        vod_remarks : $('.stui-content__thumb span.pic-text').text(),
        vod_content: $('.video-info-main .video-info-items:contains(剧情：)').text().substring(3).replace(/收起$/g, ''),
    };
    const playMap = {};
    const tabs = $('.module-player-tab .tab-item');
    const playlists = $('.module-blocklist');
    _.each(tabs, (tab, i) => {
        const from = $(tab).find('span:first').text();
        let list = playlists[i];
        list = $(list).find('a');
        _.each(list, (it) => {
            const title = it.children[0].children[0].data;
            const playUrl = it.attribs.href;
          
            if (!playMap.hasOwnProperty(from)) {
                playMap[from] = [];
            }
            playMap[from].push( title + '$' + playUrl);
        });
    });
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

async function play(inReq, outResp) {
    const id = inReq.body.id;
    const flag = inReq.body.flag;
    const link = HOST + id;
	const sniffer = await inReq.server.messageToDart({
            action: 'sniff',
            opt: {
                url: link,
                timeout: 10000,
                rule: 'http((?!http).){12,}?\\.(m3u8|mp4|mkv|flv|mp3|m4a|aac)\\?.*|http((?!http).){12,}\\.(m3u8|mp4|mkv|flv|mp3|m4a|aac)|http((?!http).)*?video/tos*|http((?!http).)*?obj/tos*',
            },
        });
        if (sniffer.url.indexOf('url=http')!==-1) {
            sniffer.url=sniffer.url.match(/url=(.*?)&/)[1];
            }
        if (sniffer && sniffer.url) {
            const hds = {};
            if (sniffer.headers) {
                if (sniffer.headers['user-agent']) {
                    hds['User-Agent'] = sniffer.headers['user-agent'];
                }
                if (sniffer.headers['referer']) {
                    hds['Referer'] = sniffer.headers['referer'];
                }
            }
            return {
                parse: 0,
                url: sniffer.url,
                header: hds,
            };
        }
}  
async function search(inReq, _outResp) {
    const wd = inReq.body.wd;
    let pg = inReq.body.page;
    if (pg <= 0) pg = 1;
    const keyword = encodeURIComponent(wd);
    let path = 'search';
    if (pg == 1) {
        path += '.html?wd=' + keyword;
    } else {
        path += '/page/' + pg + '/wd/' + keyword + '.html';
    }
    const html = await request(HOST + '/index.php/vod/' + path);
    const $ = load(html);
    const items = $('.module .module-search-item');
    let videos = _.map(items, (item) => {
        const $item = $(item);
        const it = $item.find('.video-info a:first')[0];
        const img = $item.find('.video-cover img:first')[0];
        const remarks = $item.find('.video-info-header .video-serial').text().trim();
        return {
            vod_id: it.attribs.href.replace(/.*?\/detail\/id\/(.*).html/g, '$1'),
            vod_name: it.attribs.title,
            vod_pic: img.attribs['data-src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div#page > a.page-next').length > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    const limit = 24;
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
            if (dataResult.category.list && dataResult.category.list.length > 0) {
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
        key: 'scys',
        name: '圣城',
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