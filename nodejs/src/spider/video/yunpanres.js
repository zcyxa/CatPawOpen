import req from '../../util/req.js';
import { load } from 'cheerio';
import _ from 'lodash';
import dayjs from 'dayjs';
import { ua, init ,detail as _detail ,proxy ,play ,test } from '../../util/pan.js';

let url = 'https://res.yunpan.win';

async function request(reqUrl) {
    const resp = await req.get(reqUrl, {
        headers: {
            'User-Agent': ua,
            'Referer': url,
        },
    });
    return resp.data;
}

async function home(inReq,_outResp){
    const classes = [{'type_id':'all','type_name':'首页'}];
    const filterObj = {
        'all':[
            {'key':'class','name':'分类','init':'','value':[{'n':'全部','v':''},{'n':'电影','v':'电影'},{'n':'电视剧','v':'电视剧'},{'n':'动画','v':'动画'},{'n':'纪录片','v':'纪录片'},{'n':'综艺','v':'综艺'}]},
            {'key':'tag','name':'标签','init':'','value':[{'n':'全部','v':''},{'n':'剧情','v':'剧情'},{'n':'动作','v':'动作'},{'n':'冒险','v':'冒险'},{'n':'奇幻','v':'奇幻'},{'n':'科幻','v':'科幻'},{'n':'喜剧','v':'喜剧'},{'n':'爱情','v':'爱情'},{'n':'悬疑','v':'悬疑'},{'n':'历史','v':'历史'},{'n':'战争','v':'战争'},{'n':'恐怖','v':'恐怖'},{'n':'惊悚','v':'惊悚'},{'n':'家庭','v':'家庭'},{'n':'搞笑','v':'搞笑'},{'n':'歌舞','v':'歌舞'},{'n':'音乐','v':'音乐'},{'n':'歌曲','v':'歌曲'},{'n':'真人秀','v':'真人秀'},{'n':'1080p','v':'1080p'},{'n':'4k','v':'4k'},{'n':'高码率','v':'高码率'},{'n':'杜比视界','v':'杜比视界'},{'n':'画质控','v':'画质控'}]},
            {'key':'pan','name':'云盘','init':'','value':[{'n':'全部','v':''},{'n':'阿里云盘','v':'1'},{'n':'夸克云盘','v':'2'}]}]
    };
    return ({
        class: classes,
        filters: filterObj,
    });
}


function fixImgUrl(imgUrl) {
    if (imgUrl.startsWith('/img.php?url=')) {
        return imgUrl.substr(13);
    }
    return imgUrl;
}


function getFilterUrlPart(extend, part) {
    let result = '';
    if (extend[part]) {
        result = '/' + part + '/' + extend[part];
    }
    return result;
}

async function category(inReq, _outResp) {
    const tid = inReq.body.id;
    let pg = inReq.body.page;
    const extend = inReq.body.filters;
    if (pg <= 0) pg = 1;
    const limit = 12;
    const html = await request(url + '/?PageIndex=' + pg + '&PageSize=' + limit + '&Keyword=&YunPanSourceType=' + (extend.pan || '') + '&Type=' + (extend.class || '') + '&Tag=' + (extend.tag || ''));
    return parseHtmlList(html, pg, limit);
}

function parseHtmlList(html, pg, limit) {
    const $ = load(html);
    const elements = $('.card');
    const videos = _.map(elements, (item) => {
        const $item = $(item);
        const matches = $item.find('.card-footer').html().match(/open\(\'(.*)\'\)/);
        const shareUrl = matches[1];
        const $img = $item.find('img:first');
        const $title = $item.find('.card-title');
        const $size = $item.find('.card-text:contains(大小)');
        return {
            vod_id: shareUrl,
            vod_name: $title.text().trim(),
            vod_pic: url + $img.attr('src'),
            vod_remarks: $size.text().trim(),
        };
    });
    const pageArea = $('.pagination');
    const hasMore = !_.isEmpty(pageArea) && pageArea.find('li.active').text() != pageArea.find('li:last').text();
    const page = parseInt(pg);
    const pgCount = hasMore ? page + 1 : page;
    return ({
        page: page,
        pagecount: pgCount,
        limit: limit,
        total: limit * pgCount,
        list: videos,
    });
}

async function detail(inReq, _outResp) {
    const ids = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
    const videos = [];

    for (const id of ids) {
        let vod = {
            vod_id: id,
        };
        const shareUrl = id;
        const vodFromUrl = await _detail(shareUrl);
        if (vodFromUrl){
            vod.vod_play_from = vodFromUrl.froms;
            vod.vod_play_url = vodFromUrl.urls;
        }
        videos.push(vod);
    }
    return {
        list: videos,
    };
}


async function search(inReq, _outResp) {
    let pg = inReq.body.page;
    const wd = inReq.body.wd;
    if (pg <= 0) pg = 1;
    const limit = 12;
    const html = await request(url + '/?PageIndex=' + pg + '&PageSize=' + limit + '&Keyword=' + encodeURIComponent(wd) + '&YunPanSourceType=&Type=&Tag=');
    return parseHtmlList(html, pg, limit);
}


export default {
    meta: {
        key: 'yunpanres',
        name: '云盘',
        type: 3,
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
};
