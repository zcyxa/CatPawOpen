import CryptoJS from 'crypto-js';
import req from '../../util/req.js';
import pkg from 'lodash';
const {_} = pkg;
import {load}from 'cheerio';

let host = 'http://m.ttvbox.com';
let UA = 'Mozilla/5.0 (Linux; Android 14; 22127RK46C Build/UKQ1.230804.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/118.0.0.0 Mobile Safari/537.36';
let headers = {
    'User-Agent': UA
};

async function request(reqUrl, postData, post) {
    let res = await req(reqUrl, {
        method: post ? 'post' : 'get',
        headers: headers,
        data: postData || {},
        postType: post ? 'form' : '',
    });
    return res.data;
}

async function init(inReq, _outResp) {
    return {};
}

//await home({},{});
async function home(inReq, outResp) {
    let filterObj = {};
    const classes = [{
            type_id: '1',
            type_name: '电影',
        },{
            type_id: '2',
            type_name: '电视剧',
        },{
            type_id: '3',
            type_name: '动漫',
        },{
            type_id: '4',
            type_name: '综艺',
        }
    ];
    filterObj = getFileterObj();
    
    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

function getFileterObj(){
    return {
            "1": [
                {
                    "key": "tag",
                    "name": "类型",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "喜剧",
                            "v": "%E5%96%9C%E5%89%A7"
                        },
                        {
                            "n": "爱情",
                            "v": "%E7%88%B1%E6%83%85"
                        },
                        {
                            "n": "恐怖",
                            "v": "%E6%81%90%E6%80%96"
                        },
                        {
                            "n": "动作",
                            "v": "%E5%8A%A8%E4%BD%9C"
                        },
                        {
                            "n": "科幻",
                            "v": "%E7%A7%91%E5%B9%BB"
                        },
                        {
                            "n": "灾难",
                            "v": "%E7%81%BE%E9%9A%BE"
                        },
                        {
                            "n": "剧情",
                            "v": "%E5%89%A7%E6%83%85"
                        },
                        {
                            "n": "战争",
                            "v": "%E6%88%98%E4%BA%89"
                        },
                        {
                            "n": "警匪",
                            "v": "%E8%AD%A6%E5%8C%AA"
                        },
                        {
                            "n": "犯罪",
                            "v": "%E7%8A%AF%E7%BD%AA"
                        },
                        {
                            "n": "动画",
                            "v": "%E5%8A%A8%E7%94%BB"
                        },
                        {
                            "n": "奇幻",
                            "v": "%E5%A5%87%E5%B9%BB"
                        },
                        {
                            "n": "武侠",
                            "v": "%E6%AD%A6%E4%BE%A0"
                        },
                        {
                            "n": "冒险",
                            "v": "%E5%86%92%E9%99%A9"
                        },
                        {
                            "n": "枪战",
                            "v": "%E6%9E%AA%E6%88%98"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "area",
                    "name": "地区",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "内地",
                            "v": "%E5%86%85%E5%9C%B0"
                        },
                        {
                            "n": "美国",
                            "v": "%E7%BE%8E%E5%9B%BD"
                        },
                        {
                            "n": "香港",
                            "v": "%E9%A6%99%E6%B8%AF"
                        },
                        {
                            "n": "台湾",
                            "v": "%E5%8F%B0%E6%B9%BE"
                        },
                        {
                            "n": "韩国",
                            "v": "%E9%9F%A9%E5%9B%BD"
                        },
                        {
                            "n": "日本",
                            "v": "%E6%97%A5%E6%9C%AC"
                        },
                        {
                            "n": "法国",
                            "v": "%E6%B3%95%E5%9B%BD"
                        },
                        {
                            "n": "英国",
                            "v": "%E8%8B%B1%E5%9B%BD"
                        },
                        {
                            "n": "德国",
                            "v": "%E5%BE%B7%E5%9B%BD"
                        },
                        {
                            "n": "加拿大",
                            "v": "%E5%8A%A0%E6%8B%BF%E5%A4%A7"
                        },
                        {
                            "n": "泰国",
                            "v": "%E6%B3%B0%E5%9B%BD"
                        },
                        {
                            "n": "印度",
                            "v": "%E5%8D%B0%E5%BA%A6"
                        },
                        {
                            "n": "新加坡",
                            "v": "%E6%96%B0%E5%8A%A0%E5%9D%A1"
                        },
                        {
                            "n": "俄罗斯",
                            "v": "%E4%BF%84%E7%BD%97%E6%96%AF"
                        },
                        {
                            "n": "西班牙",
                            "v": "%E8%A5%BF%E7%8F%AD%E7%89%99"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "year",
                    "name": "年代",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "2024",
                            "v": "2024"
                        },
                        {
                            "n": "2023",
                            "v": "2023"
                        },
                        {
                            "n": "2022",
                            "v": "2022"
                        },
                        {
                            "n": "2021",
                            "v": "2021"
                        },
                        {
                            "n": "2020",
                            "v": "2020"
                        },
                        {
                            "n": "2019",
                            "v": "2019"
                        },
                        {
                            "n": "2018",
                            "v": "2018"
                        },
                        {
                            "n": "2010-2000",
                            "v": "20002010"
                        },
                        {
                            "n": "90年代",
                            "v": "19901999"
                        },
                        {
                            "n": "更早",
                            "v": "18001989"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "order",
                    "name": "排序",
                    "value": [
                        {
                            "n": "最近热播",
                            "v": "hits"
                        },
                        {
                            "n": "最新上映",
                            "v": "addtime"
                        },
                        {
                            "n": "点赞最多",
                            "v": "up"
                        }
                    ],
                    "init": "hits"
                }
            ],
            "2": [
                {
                    "key": "tag",
                    "name": "类型",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "言情",
                            "v": "%E8%A8%80%E6%83%85"
                        },
                        {
                            "n": "爱情",
                            "v": "%E7%88%B1%E6%83%85"
                        },
                        {
                            "n": "偶像",
                            "v": "%E5%81%B6%E5%83%8F"
                        },
                        {
                            "n": "都市",
                            "v": "%E9%83%BD%E5%B8%82"
                        },
                        {
                            "n": "穿越",
                            "v": "%E7%A9%BF%E8%B6%8A"
                        },
                        {
                            "n": "罪案",
                            "v": "%E7%BD%AA%E6%A1%88"
                        },
                        {
                            "n": "冒险",
                            "v": "%E5%86%92%E9%99%A9"
                        },
                        {
                            "n": "自制剧",
                            "v": "%E8%87%AA%E5%88%B6%E5%89%A7"
                        },
                        {
                            "n": "战争",
                            "v": "%E6%88%98%E4%BA%89"
                        },
                        {
                            "n": "悬疑",
                            "v": "%E6%82%AC%E7%96%91"
                        },
                        {
                            "n": "伦理",
                            "v": "%E4%BC%A6%E7%90%86"
                        },
                        {
                            "n": "恐怖",
                            "v": "%E6%81%90%E6%80%96"
                        },
                        {
                            "n": "惊悚",
                            "v": "%E6%83%8A%E6%82%9A"
                        },
                        {
                            "n": "网络剧",
                            "v": "%E7%BD%91%E7%BB%9C%E5%89%A7"
                        },
                        {
                            "n": "警匪",
                            "v": "%E8%AD%A6%E5%8C%AA"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "area",
                    "name": "地区",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "内地",
                            "v": "%E5%86%85%E5%9C%B0"
                        },
                        {
                            "n": "台湾",
                            "v": "%E5%8F%B0%E6%B9%BE"
                        },
                        {
                            "n": "香港",
                            "v": "%E9%A6%99%E6%B8%AF"
                        },
                        {
                            "n": "韩国",
                            "v": "%E9%9F%A9%E5%9B%BD"
                        },
                        {
                            "n": "美国",
                            "v": "%E7%BE%8E%E5%9B%BD"
                        },
                        {
                            "n": "泰国",
                            "v": "%E6%B3%B0%E5%9B%BD"
                        },
                        {
                            "n": "日本",
                            "v": "%E6%97%A5%E6%9C%AC"
                        },
                        {
                            "n": "英国",
                            "v": "%E8%8B%B1%E5%9B%BD"
                        },
                        {
                            "n": "新加坡",
                            "v": "%E6%96%B0%E5%8A%A0%E5%9D%A1"
                        },
                        {
                            "n": "其它",
                            "v": "%E5%85%B6%E5%AE%83"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "year",
                    "name": "年代",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "2024",
                            "v": "2024"
                        },
                        {
                            "n": "2023",
                            "v": "2023"
                        },
                        {
                            "n": "2022",
                            "v": "2022"
                        },
                        {
                            "n": "2021",
                            "v": "2021"
                        },
                        {
                            "n": "2020",
                            "v": "2020"
                        },
                        {
                            "n": "2019",
                            "v": "2019"
                        },
                        {
                            "n": "2018",
                            "v": "2018"
                        },
                        {
                            "n": "2010-2000",
                            "v": "20002010"
                        },
                        {
                            "n": "90年代",
                            "v": "19901999"
                        },
                        {
                            "n": "更早",
                            "v": "18001989"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "order",
                    "name": "排序",
                    "value": [
                        {
                            "n": "最近热播",
                            "v": "hits"
                        },
                        {
                            "n": "最新上映",
                            "v": "addtime"
                        },
                        {
                            "n": "点赞最多",
                            "v": "up"
                        }
                    ],
                    "init": "hits"
                }
            ],
            "3": [
                {
                    "key": "tag",
                    "name": "类型",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "热血",
                            "v": "%E7%83%AD%E8%A1%80"
                        },
                        {
                            "n": "动作",
                            "v": "%E5%8A%A8%E4%BD%9C"
                        },
                        {
                            "n": "冒险",
                            "v": "%E5%86%92%E9%99%A9"
                        },
                        {
                            "n": "悬疑",
                            "v": "%E6%82%AC%E7%96%91"
                        },
                        {
                            "n": "爱情",
                            "v": "%E7%88%B1%E6%83%85"
                        },
                        {
                            "n": "搞笑",
                            "v": "%E6%90%9E%E7%AC%91"
                        },
                        {
                            "n": "美女",
                            "v": "%E7%BE%8E%E5%A5%B3"
                        },
                        {
                            "n": "少儿",
                            "v": "%E5%B0%91%E5%84%BF"
                        },
                        {
                            "n": "亲子",
                            "v": "%E4%BA%B2%E5%AD%90"
                        },
                        {
                            "n": "魔法",
                            "v": "%E9%AD%94%E6%B3%95"
                        },
                        {
                            "n": "运动",
                            "v": "%E8%BF%90%E5%8A%A8"
                        },
                        {
                            "n": "机战",
                            "v": "%E6%9C%BA%E6%88%98"
                        },
                        {
                            "n": "科幻",
                            "v": "%E7%A7%91%E5%B9%BB"
                        },
                        {
                            "n": "校园",
                            "v": "%E6%A0%A1%E5%9B%AD"
                        },
                        {
                            "n": "动物",
                            "v": "%E5%8A%A8%E7%89%A9"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "area",
                    "name": "地区",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "内地",
                            "v": "%E5%86%85%E5%9C%B0"
                        },
                        {
                            "n": "日本",
                            "v": "%E6%97%A5%E6%9C%AC"
                        },
                        {
                            "n": "美国",
                            "v": "%E7%BE%8E%E5%9B%BD"
                        },
                        {
                            "n": "韩国",
                            "v": "%E9%9F%A9%E5%9B%BD"
                        },
                        {
                            "n": "台湾",
                            "v": "%E5%8F%B0%E6%B9%BE"
                        },
                        {
                            "n": "香港",
                            "v": "%E9%A6%99%E6%B8%AF"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "year",
                    "name": "年代",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "2024",
                            "v": "2024"
                        },
                        {
                            "n": "2023",
                            "v": "2023"
                        },
                        {
                            "n": "2022",
                            "v": "2022"
                        },
                        {
                            "n": "2021",
                            "v": "2021"
                        },
                        {
                            "n": "2020",
                            "v": "2020"
                        },
                        {
                            "n": "2019",
                            "v": "2019"
                        },
                        {
                            "n": "2018",
                            "v": "2018"
                        },
                        {
                            "n": "2010-2000",
                            "v": "20002010"
                        },
                        {
                            "n": "90年代",
                            "v": "19901999"
                        },
                        {
                            "n": "更早",
                            "v": "18001989"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "order",
                    "name": "排序",
                    "value": [
                        {
                            "n": "最近热播",
                            "v": "hits"
                        },
                        {
                            "n": "最新上映",
                            "v": "addtime"
                        },
                        {
                            "n": "点赞最多",
                            "v": "up"
                        }
                    ],
                    "init": "hits"
                }
            ],
            "4": [
                {
                    "key": "tag",
                    "name": "类型",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "脱口秀",
                            "v": "%E8%84%B1%E5%8F%A3%E7%A7%80"
                        },
                        {
                            "n": "真人秀",
                            "v": "%E7%9C%9F%E4%BA%BA%E7%A7%80"
                        },
                        {
                            "n": "选秀",
                            "v": "%E9%80%89%E7%A7%80"
                        },
                        {
                            "n": "美食",
                            "v": "%E7%BE%8E%E9%A3%9F"
                        },
                        {
                            "n": "旅游",
                            "v": "%E6%97%85%E6%B8%B8"
                        },
                        {
                            "n": "汽车",
                            "v": "%E6%B1%BD%E8%BD%A6"
                        },
                        {
                            "n": "访谈",
                            "v": "%E8%AE%BF%E8%B0%88"
                        },
                        {
                            "n": "纪实",
                            "v": "%E7%BA%AA%E5%AE%9E"
                        },
                        {
                            "n": "搞笑",
                            "v": "%E6%90%9E%E7%AC%91"
                        },
                        {
                            "n": "情感",
                            "v": "%E6%83%85%E6%84%9F"
                        },
                        {
                            "n": "游戏",
                            "v": "%E6%B8%B8%E6%88%8F"
                        },
                        {
                            "n": "职场",
                            "v": "%E8%81%8C%E5%9C%BA"
                        },
                        {
                            "n": "娱乐",
                            "v": "%E5%A8%B1%E4%B9%90"
                        },
                        {
                            "n": "资讯",
                            "v": "%E8%B5%84%E8%AE%AF"
                        },
                        {
                            "n": "音乐",
                            "v": "%E9%9F%B3%E4%B9%90"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "area",
                    "name": "地区",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "香港",
                            "v": "%E9%A6%99%E6%B8%AF"
                        },
                        {
                            "n": "美国",
                            "v": "%E7%BE%8E%E5%9B%BD"
                        },
                        {
                            "n": "大陆",
                            "v": "%E5%A4%A7%E9%99%86"
                        },
                        {
                            "n": "韩国",
                            "v": "%E9%9F%A9%E5%9B%BD"
                        },
                        {
                            "n": "台湾",
                            "v": "%E5%8F%B0%E6%B9%BE"
                        },
                        {
                            "n": "日本",
                            "v": "%E6%97%A5%E6%9C%AC"
                        },
                        {
                            "n": "其他",
                            "v": "%E5%85%B6%E4%BB%96"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "year",
                    "name": "年代",
                    "value": [
                        {
                            "n": "全部",
                            "v": ""
                        },
                        {
                            "n": "2024",
                            "v": "2024"
                        },
                        {
                            "n": "2023",
                            "v": "2023"
                        },
                        {
                            "n": "2022",
                            "v": "2022"
                        },
                        {
                            "n": "2021",
                            "v": "2021"
                        },
                        {
                            "n": "2020",
                            "v": "2020"
                        },
                        {
                            "n": "2019",
                            "v": "2019"
                        },
                        {
                            "n": "2018",
                            "v": "2018"
                        },
                        {
                            "n": "2010-2000",
                            "v": "20002010"
                        },
                        {
                            "n": "90年代",
                            "v": "19901999"
                        },
                        {
                            "n": "更早",
                            "v": "18001989"
                        }
                    ],
                    "init": ""
                },
                {
                    "key": "order",
                    "name": "排序",
                    "value": [
                        {
                            "n": "最近热播",
                            "v": "hits"
                        },
                        {
                            "n": "最新上映",
                            "v": "addtime"
                        },
                        {
                            "n": "点赞最多",
                            "v": "up"
                        }
                    ],
                    "init": "hits"
                }
            ]
    }
}

async function genFilterObj(classes) {
    let filterObj = {};
    for (let value of classes) {
        let typeId = value.type_id;
        const html = await request(host + `/list-select-id-${typeId}-type--area--year--star--state--order-addtime.html`);
        const $ = load(html);
        
        //类型
        const tags = $('dl.dl-horizontal > dd:nth-of-type(2) > a');
        let tag = {
            key: 'tag',
            name: '类型',
            value: _.map(tags, (n) => {
                let v = n.attribs['href'] || '';
                v = v.match(/type-(.*?)-/)[1];
                return { n: n.children[0].data, v: v };
            }),
        };
        tag['init'] = tag.value[0].v;
    
        //地区
        const areas = $('dl.dl-horizontal > dd:nth-of-type(3) > a');
        let area = {
            key: 'area',
            name: '地区',
            value: _.map(areas, (n) => {
                let v = n.attribs['href'] || '';
                v = v.match(/area-(.*?)-/)[1];
                return { n: n.children[0].data, v: v };
            }),
        };
        area['init'] = area.value[0].v;
       
        //年代
        const years = $('dl.dl-horizontal > dd:nth-of-type(4) > a');
        let year = {
            key: 'year',
            name: '年代',
            value: _.map(years, (n) => {
                let v = n.attribs['href'] || '';
                v = v.match(/year-(.*?)-/)[1];
                return { n: n.children[0].data, v: v };
            }),
        };
        year['init'] = year.value[0].v;
        
        //排序
        let order = {
            key: 'order',
            name: '排序',
            value:[
                {'n': '最近热播', 'v': 'hits'},
                {'n': '最新上映', 'v': 'addtime'},
                {'n': '点赞最多', 'v': 'up'}
            ]
        };
        order['init'] = order.value[0].v;
        
        filterObj[typeId] = [tag,area,year,order];
    }
    return filterObj;
}

//await category({body: {id: '1', page: '1',filters: {tag: '', area: '', year: '', order: 'addtime'}}})
async function category(inReq, _outResp) {
    // tid, pg, filter, extend
    const tid = inReq.body.id;
    let pg = inReq.body.page;
    const extend = inReq.body.filters;

	if(pg <= 0) pg = 1;

    const tag = extend.tag || '';
    const area = extend.area || '';
    const year = extend.year || '';
    const order = extend.order || '';
    const link = host + `/list-select-id-${tid}-type-${tag}-area-${area}-year-${year}-star--state--order-${order}-p-${pg}.html`;
    const html = await request(link);
    const $ = load(html);
    const items = $('ul.list-unstyled.vod-item-img.ff-img-140 > li');
    let videos = _.map(items, (item) => {
        const img = $(item).find('img:first')[0];
        const a = $(item).find('a:first')[0];
        const continu = $($(item).find('span.continu')[0]).text().trim();
        return {
            vod_id: a.attribs.href,
            vod_name: img.attribs.alt,
            vod_pic: img.attribs['data-original'],
            vod_remarks: continu ||  '',
        };
    });

    return JSON.stringify({
        page: parseInt(pg),
        list: videos,
    });
}

//await detail({body: {id: '/vod-read-id-177355.html'}});
async function detail(inReq, _outResp) {
    const id = inReq.body.id;
    const videos = [];
    const html = await request(host + id);
    let $ = load(html);
    const detail = $('dl.dl-horizontal > dt');
    let vod = {
        vod_id: id,
        vod_pic: $('img.media-object.img-thumbnail.ff-img').attr('data-original'),
        vod_remarks: '',
        vod_content: $('meta[name = description]').attr('content').trim(),
    };
    for (const info of detail) {
        const i = $(info).text().trim();
        if (i.startsWith('地区：')) {
            vod.vod_area = _.map($(info).find('+ dd').find('a'), (a) =>{
                return $(a.children[0]).text() }).join('/');
        } else if (i.startsWith('年份：')) {
            vod.vod_year = _.map($(info).find('+ dd').find('a'), (a) =>{
                return $(a.children[0]).text() }).join('/');
        } else if (i.startsWith('导演：')) {
            vod.vod_director = _.map($(info).find('+ dd').find('a'), (a) =>{
                return $(a.children[0]).text() }).join('/');
        } else if (i.startsWith('主演：')) {
            vod.vod_actor = _.map($(info).find('+ dd').find('a'), (a) =>{
                return $(a.children[0]).text() }).join('/');
        } else if (i.startsWith('语言：')) {
            vod.vod_lang = _.map($(info).find('+ dd').find('a'), (a) =>{
                return $(a.children[0]).text() }).join('/');
        }
    }
    let playUrls = $($('ul.list-unstyled.row.text-center.ff-playurl-line.ff-playurl')[0]).find('li > a');
    const playlist = _.map(playUrls, (a) => {
        return a.children[0].data + '$' + a.attribs.href;
    });
    vod.vod_play_from = '盒子影视';
    vod.vod_play_url = playlist.join('#');
    videos.push(vod);

    return {
        list: videos
    };
}
//await search({body: {wd: '都市'}});
async function search(inReq, _outResp) {
    const wd = inReq.body.wd;
    let url = host + '/index.php?s=vod-search-name';
    const html = await request(url, `wd=${wd}`, true);
    const $ = load(html);
    let data = $('ul.list-unstyled.vod-item-img.ff-img-140 > li');
    let videos = _.map(data, (n) => {
        let id = $($(n)
            .find('p.image > a')[0])
            .attr('href');
        let pic = $($(n)
            .find('p.image > a > img')[0])
            .attr('data-original');
        let name = $($(n)
            .find('p.image > a > img')[0])
            .attr('alt');
        let continu = $($(n)
            .find('p.image span')[0])
            .text().trim();
        return {
            vod_id: id,
            vod_name: name,
            vod_pic: pic,
            vod_remarks: continu
        };
    });
    return ({
        list: videos,
    });
}


//await play({body: {id: '/vod-play-id-178008-sid-2-pid-1.html'}})
async function play(inReq, _outResp) {
    let id = inReq.body.id;
    let link = host + id;
	const sniffer = await inReq.server.messageToDart({
            action: 'sniff',
            opt: {
                url: link,
                timeout: 10000,
                rule: 'http((?!http).){12,}?\\.(m3u8|mp4|mkv|flv|m4a|aac)\\?.*|http((?!http).){12,}\\.(m3u8|mp4|mkv|flv|m4a|aac)|http((?!http).)*?video/tos*|http((?!http).)*?obj/tos*',
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


async function test(inReq, outResp) {
    try {
        const printErr = function(json) {
            if (json.statusCode && json.statusCode == 500) {
                console.error(json);
            }
        };
        const prefix = inReq.server.prefix;
        const dataResult = {};
        let resp = await inReq.server.inject()
            .post(`${prefix}/init`);
        dataResult.init = resp.json();
        printErr(resp.json());
        resp = await inReq.server.inject()
            .post(`${prefix}/home`);
        dataResult.home = resp.json();
        printErr(resp.json());
        if (dataResult.home.class && dataResult.home.class.length > 0) {
            resp = await inReq.server.inject()
                .post(`${prefix}/category`)
                .payload({
                id: dataResult.home.class[1].type_id,
                page: 1,
                filter: true,
                filters: {},
            });
            dataResult.category = resp.json();
            printErr(resp.json());
            if (dataResult.category.list && dataResult.category.list.length > 0) {
                resp = await inReq.server.inject()
                    .post(`${prefix}/detail`)
                    .payload({
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
                                resp = await inReq.server.inject()
                                    .post(`${prefix}/play`)
                                    .payload({
                                    flag: flag,
                                    id: urls[i].split('$')[1],
                                });
                                dataResult.play.push(resp);
                            }
                        }
                    }
                }
            }
        }
        resp = await inReq.server.inject()
            .post(`${prefix}/search`)
            .payload({
            wd: '都市',
            page: 1,
        });
        dataResult.search = resp.json();
        printErr(resp.json());
        return dataResult;
    } catch (err) {
        console.error(err);
        outResp.code(500);
        return {
            err: err.message,
            tip: 'check debug console output'
        };
    }
}

export default {
    meta: {
        key: 'hezi',
        name: '盒子',
        type: 3,
    },
    api: async(fastify) => {
        fastify.post('/init', init);
        fastify.post('/home', home);
        fastify.post('/category', category);
        fastify.post('/detail', detail);
        fastify.post('/play', play);
        fastify.post('/search', search);
        fastify.get('/test', test);
    },
};