export default {
czzy: {
        url: 'https://cz01.vip'
    },
live: {
        contents: 'https://gitee.com/galnt/cctv/raw/master/contents.txt', // 按省区分的目录,供参考,可以不添加
        url: [
            {name: 'ITV ', url: 'https://10518590.xyz/bg/itvlist.txt'} 
        ]
    },
vcm3u8: {
        ffm3u8: [{
            name: "非凡采集",
            url: "https://cj.ffzyapi.com/api.php/provide/vod/from/ffm3u8/",
            categories: ["国产剧", "香港剧", "韩国剧", "欧美剧", "台湾剧", "日本剧", "海外剧", "泰国剧", "短剧", "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "剧情片", "战争片", "动漫片", "大陆综艺", "港台综艺", "日韩综艺", "欧美综艺", "国产动漫", "日韩动漫", "欧美动漫", "港台动漫", "海外动漫", "记录片"],
            search: true
        }],
        hhm3u8: [{
            name: "火狐采集",
            url: "https://hhzyapi.com/api.php/provide/vod/from/hhm3u8/",
            categories: ["动作片", "爱情片", "喜剧片", "科幻片", "恐怖片", "剧情片", "战争片", "灾难片", "悬疑片", "犯罪片", "奇幻片", "短剧", "内地剧", "欧美剧", "香港剧", "韩剧", "日剧", "马泰剧", "中国动漫", "日本动漫", "欧美动漫", "欧美动漫", "大陆综艺", "港台综艺", "日韩综艺", "欧美综艺", "记录片"],
            search: true
        }],
        lzm3u8: [{
            name: "量子采集",
            url: "https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8/",
            categories: ["动作片", "爱情片", "喜剧片", "科幻片", "恐怖片", "剧情片", "战争片", "短剧", "国产剧", "欧美剧", "香港剧", "韩国剧", "日本剧", "台湾剧", "海外剧", "泰国剧", "国产动漫", "日韩动漫", "欧美动漫", "港台动漫", "海外动漫", "大陆综艺", "港台综艺", "日韩综艺", "欧美综艺", "记录片", "足球", "篮球", "网球", "斯诺克"],
            search: true
        }],
        subm3u8: [{
            name: "速播采集",
            url: "https://subocaiji.com/api.php/provide/vod/from/subm3u8/",
            categories: ["动作片", "爱情片", "喜剧片", "科幻片", "恐怖片", "剧情片", "战争片", "动漫电影", "短剧", "大陆剧", "美剧", "港澳剧", "韩剧", "日剧", "台湾剧", "泰剧", "中国动漫", "日本动漫", "欧美动漫", "综艺", "纪录片"],
            search: true
        }],
        xlm3u8: [{
            name: "新浪采集",
            url: "https://api.xinlangapi.com/xinlangapi.php/provide/vod/from/xlm3u8/",
            categories: ["动作片", "爱情片", "喜剧片", "科幻片", "恐怖片", "剧情片", "战争片", "动漫电影", "短剧", "大陆剧", "欧美剧", "港澳剧", "韩剧", "日剧", "台湾剧", "泰剧", "动漫", "综艺", "纪录片", "体育"],
            search: true
        }],
        wjm3u8: [{
            name: "无尽采集",
            url: "https://api.wujinapi.me/api.php/provide/vod/from/wjm3u8/",
            categories: ["动作片", "爱情片", "喜剧片", "科幻片", "恐怖片", "剧情片", "战争片", "悬疑片", "动画片", "犯罪片", "奇幻片", "邵氏电影", "短剧", "国产剧", "美国剧", "香港剧", "韩国剧", "日本剧", "台湾剧", "泰剧", "海外剧", "国产动漫", "日韩动漫", "欧美动漫", "大陆综艺", "日韩综艺", "港台综艺", "欧美综艺", "体育赛事", "影视解说"],
            search: true
        }],
        sanjiu: [{
            name: '三九',
            url: 'https://www.39kan.com/api.php/provide/vod/at/json',
            search: true
        }],
        ikunzy: [{
            name: '爱坤',
            url: 'https://ikunzyapi.com/api.php/provide/vod/at/json',
            search: true
        }],
        collec: [{
            name: '卧龙',
            url: 'https://collect.wolongzyw.com/api.php/provide/vod/at/json',
            search: true
        }],
        apitia: [{
            name: '天空',
            url: 'https://api.tiankongapi.com/api.php/provide/vod/at/json',
            search: true
        }],
        cjvodi: [{
            name: '影图',
            url: 'https://cj.vodimg.top/api.php/provide/vod/at/json',
            search: true
        }],
        apizui: [{
            name: '最大',
            url: 'https://api.zuidapi.com/api.php/provide/vod/at/json',
            search: true
        }]
    },
appys: {
    ttmjas: [{
      name: "天天美剧",
      url: "https://www.ttmja.com/api.php/app/",
      search: true
    }],
    netfly: [{
      name: "奈飞",
      url: "https://www.netfly.tv/api.php/app/",
      search: true
    }],
    bro51d: [{
      name: "零刻",
      url: "https://ys.51bro.cn/mogai_api.php/v1.vod",
      search: true
    }]
  },
avlive: {
        url: [
           { name: "性视界", "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lndsqhj/zblive/main/YG.txt" , index: "true" }, 
           { name: "玩偶", "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lndsqhj/zblive/main/hongkongdoll.txt" , index: "true" }, 
           { name: "传媒仓库", "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lndsqhj/zblive/main/hsck.txt" , index: "true" },         
           { name: "三级", "url":"https://mirror.ghproxy.com/https://raw.githubusercontent.com/lndsqhj/zblive/main/idol.txt", index: "true" },
           { name: "刘玥", "url":"https://mirror.ghproxy.com/https://raw.githubusercontent.com/lndsqhj/zblive/main/juneliu.txt", index: "true" }, 
           { name: "小姐姐", "url":"https://mirror.ghproxy.com/https://raw.githubusercontent.com/lndsqhj/zblive/main/madou.txt", index: "true" },
           { name: "麻豆", "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lndsqhj/zblive/main/monlingwu.txt", index: "true" }
        ]
      },
avm3u8: {
        md1m3u8: [{
            name: "麻豆①",
            url: "http://www.9191md.me/api.php/provide/vod/",   
            search: true
            }],

        md3m3u8: [{
            name: "麻豆②",
            url: "http://86876.cc/api.php/provide/vod/from/mdm3u8/", 
            search: true
            }],

        clm3u8: [{
            name: '草榴资源',
            url: 'https://www.caoliuzyw.com/api.php/provide/vod/from/clm3u8',
            search: true
        }],
        askm3u: [{
            name: '奥卡资源',
            url: 'https://aosikazy.com/api.php/provide/vod/',
            search: true
        }],
        ptm3u8: [{
            name: '葡萄资源',
            url: 'https://caiji.putaozyw.net/inc/apijson_vod.php',
            search: true
        }],
        xbm3u8: [{
            name: '雪豹资源',
            url: 'https://api.xbapi.cc/api.php/provide/vod/',
            search: true
        }],
        sw401m: [{
            name: '丝袜资源',
            url: 'https://www.siwazyw.tv/api.php/provide/vod/',
            search: true
        }],
        adm3u8: [{
            name: '爱豆资源',
            url: 'http://chujia.cc/api.php/provide/vod/from/m3u8',
            search: true
        }],
        ddx1m3: [{
            name: '滴滴资源',
            url: 'https://api.ddapi.cc/api.php/provide/vod/',
            search: true
        }],
        lym3u8: [{
            name: '老鸭资源',
            url: 'https://api.apilyzy.com/api.php/provide/vod/',
            search: true
        }],
        mym3u8: [{
            name: '猫源传媒',
            url: 'https://api.maozyapi.com/inc/apijson_vod.php',
            search: true
        }],
        jdm3u8: [{
            name: '精东影业',
            url: 'http://chujia.cc/api.php/provide/vod/from/m3u8/',
            search: true
        }],

        kkzydd: [{
            name: '写真',
            url: 'https://kkzy.me/api.php/provide/vod/at/json',
            search: true
        }],
        apittz: [{
            name: '天天',
            url: 'https://apittzy.com/api.php/provide/vod/at/json',
            search: true
        }],
        apilsb: [{
            name: '色逼',
            url: 'https://apilsbzy1.com/api.php/provide/vod/at/json',
            search: true
        }],
        slapib: [{
            name: '森林',
            url: 'https://slapibf.com/api.php/provide/vod/at/json',
            search: true
        }],
        lbapi9: [{
            name: '乐播',
            url: 'https://lbapi9.com/api.php/provide/vod/at/json',
            search: true
        }],
        fhapi9: [{
            name: '番号',
            url: 'http://fhapi9.com/api.php/provide/vod/at/json',
            search: true
        }]
    },
alist: [{
    name: "🐉神族九帝",
    server: "https://alist.shenzjd.com"
  }, {
    "name": "🌱小新盘",
    "server": "https://pan.cdnxin.top/"
  }, {
    "name": "🌱小丫",
    "server": "http://alist.xiaoya.pro/"
  }, {
    "name": "🌱星梦",
    "server": "https://pan.bashroot.top"
  }, {
    "name": "🌱ecve资源",
    "server": "https://pan.ecve.cn/"
  }, {
    "name": "🌱雨呢",
    "server": "https://pan.clun.top/"
  }, {
    "name": "🌱酷呵盘",
    "server": "https://pan.kuhehe.top/"
  }, {
    "name": "🌱分享者",
    "server": "https://melist.me/"
  }, {
    "name": "🌱目瞪口呆",
    "server": "https://pan.mdgd.cc/"
  }, {
    "name": "🌱神奇云",
    "server": "https://al.chirmyram.com/"
  }],
    color: [
        {
            light: {
                bg: 'https://i2.100024.xyz/2024/01/13/pptcej.webp',
                bgMask: '0x50ffffff',
                primary: '0xff446732',
                onPrimary: '0xffffffff',
                primaryContainer: '0xffc5efab',
                onPrimaryContainer: '0xff072100',
                secondary: '0xff55624c',
                onSecondary: '0xffffffff',
                secondaryContainer: '0xffd9e7cb',
                onSecondaryContainer: '0xff131f0d',
                tertiary: '0xff386666',
                onTertiary: '0xffffffff',
                tertiaryContainer: '0xffbbebec',
                onTertiaryContainer: '0xff002020',
                error: '0xffba1a1a',
                onError: '0xffffffff',
                errorContainer: '0xffffdad6',
                onErrorContainer: '0xff410002',
                background: '0xfff8faf0',
                onBackground: '0xff191d16',
                surface: '0xfff8faf0',
                onSurface: '0xff191d16',
                surfaceVariant: '0xffe0e4d6',
                onSurfaceVariant: '0xff191d16',
                inverseSurface: '0xff2e312b',
                inverseOnSurface: '0xfff0f2e7',
                outline: '0xff74796d',
                outlineVariant: '0xffc3c8bb',
                shadow: '0xff000000',
                scrim: '0xff000000',
                inversePrimary: '0xffaad291',
                surfaceTint: '0xff446732',
            },
            dark: {
                bg: 'https://i2.100024.xyz/2024/01/13/pptg3z.webp',
                bgMask: '0x50000000',
                primary: '0xffaad291',
                onPrimary: '0xff173807',
                primaryContainer: '0xff2d4f1c',
                onPrimaryContainer: '0xffc5efab',
                secondary: '0xffbdcbb0',
                onSecondary: '0xff283420',
                secondaryContainer: '0xff3e4a35',
                onSecondaryContainer: '0xffd9e7cb',
                tertiary: '0xffa0cfcf',
                onTertiary: '0xff003738',
                tertiaryContainer: '0xff1e4e4e',
                onTertiaryContainer: '0xffbbebec',
                error: '0xffffb4ab',
                onError: '0xff690005',
                errorContainer: '0xff93000a',
                onErrorContainer: '0xffffdad6',
                background: '0xff11140e',
                onBackground: '0xffe1e4d9',
                surface: '0xff11140e',
                onSurface: '0xffe1e4d9',
                surfaceVariant: '0xff43483e',
                onSurfaceVariant: '0xffe1e4d9',
                inverseSurface: '0xffe1e4d9',
                inverseOnSurface: '0xff2e312b',
                outline: '0xff8d9286',
                outlineVariant: '0xff43483e',
                shadow: '0xff000000',
                scrim: '0xff000000',
                inversePrimary: '0xff446732',
                surfaceTint: '0xffaad291',
            },
        },
        {
            light: {
                bg: 'https://i2.100024.xyz/2024/01/13/pi2rpw.webp',
                bgMask: '0x50ffffff',
                primary: '0xff666014',
                onPrimary: '0xffffffff',
                primaryContainer: '0xffeee58c',
                onPrimaryContainer: '0xff1f1c00',
                secondary: '0xff625f42',
                onSecondary: '0xffffffff',
                secondaryContainer: '0xffe9e4be',
                onSecondaryContainer: '0xff1e1c05',
                tertiary: '0xff3f6654',
                onTertiary: '0xffffffff',
                tertiaryContainer: '0xffc1ecd5',
                onTertiaryContainer: '0xff002114',
                error: '0xffba1a1a',
                onError: '0xffffffff',
                errorContainer: '0xffffdad6',
                onErrorContainer: '0xff410002',
                background: '0xfffef9eb',
                onBackground: '0xff1d1c14',
                surface: '0xfffef9eb',
                onSurface: '0xff1d1c14',
                surfaceVariant: '0xffe7e3d0',
                onSurfaceVariant: '0xff1d1c14',
                inverseSurface: '0xff323128',
                inverseOnSurface: '0xfff5f1e3',
                outline: '0xff7a7768',
                outlineVariant: '0xffcbc7b5',
                shadow: '0xff000000',
                scrim: '0xff000000',
                inversePrimary: '0xffd1c973',
                surfaceTint: '0xff666014',
            },
            dark: {
                bg: 'https://i2.100024.xyz/2024/01/13/pi2reo.webp',
                bgMask: '0x50000000',
                primary: '0xffd1c973',
                onPrimary: '0xff353100',
                primaryContainer: '0xff4d4800',
                onPrimaryContainer: '0xffeee58c',
                secondary: '0xffcdc8a3',
                onSecondary: '0xff333117',
                secondaryContainer: '0xff4a482c',
                onSecondaryContainer: '0xffe9e4be',
                tertiary: '0xffa6d0b9',
                onTertiary: '0xff0e3727',
                tertiaryContainer: '0xff274e3d',
                onTertiaryContainer: '0xffc1ecd5',
                error: '0xffffb4ab',
                onError: '0xff690005',
                errorContainer: '0xff93000a',
                onErrorContainer: '0xffffdad6',
                background: '0xff14140c',
                onBackground: '0xffe7e2d5',
                surface: '0xff14140c',
                onSurface: '0xffe7e2d5',
                surfaceVariant: '0xff49473a',
                onSurfaceVariant: '0xffe7e2d5',
                inverseSurface: '0xffe7e2d5',
                inverseOnSurface: '0xff323128',
                outline: '0xff949181',
                outlineVariant: '0xff49473a',
                shadow: '0xff000000',
                scrim: '0xff000000',
                inversePrimary: '0xff666014',
                surfaceTint: '0xffd1c973',
            },
        },
        {
            light: {
                bg: 'https://i2.100024.xyz/2024/01/13/qrnuwt.webp',
                bgMask: '0x50ffffff',
                primary: '0xFF2B6C00',
                onPrimary: '0xFFFFFFFF',
                primaryContainer: '0xFFA6F779',
                onPrimaryContainer: '0xFF082100',
                secondary: '0xFF55624C',
                onSecondary: '0xFFFFFFFF',
                secondaryContainer: '0xFFD9E7CA',
                onSecondaryContainer: '0xFF131F0D',
                tertiary: '0xFF386666',
                onTertiary: '0xFFFFFFFF',
                tertiaryContainer: '0xFFBBEBEB',
                onTertiaryContainer: '0xFF002020',
                error: '0xFFBA1A1A',
                onError: '0xFFFFFFFF',
                errorContainer: '0xFFFFDAD6',
                onErrorContainer: '0xFF410002',
                background: '0xFFFDFDF5',
                onBackground: '0xFF1A1C18',
                surface: '0xFFFDFDF5',
                onSurface: '0xFF1A1C18',
                surfaceVariant: '0xFFE0E4D6',
                onSurfaceVariant: '0xFF1A1C18',
                inverseSurface: '0xFF2F312C',
                onInverseSurface: '0xFFF1F1EA',
                outline: '0xFF74796D',
                outlineVariant: '0xFFC3C8BB',
                shadow: '0xFF000000',
                scrim: '0xFF000000',
                inversePrimary: '0xFF8CDA60',
                surfaceTint: '0xFF2B6C00',
            },
            dark: {
                bg: 'https://i2.100024.xyz/2024/01/13/qrc37o.webp',
                bgMask: '0x50000000',
                primary: '0xFF8CDA60',
                onPrimary: '0xFF133800',
                primaryContainer: '0xFF1F5100',
                onPrimaryContainer: '0xFFA6F779',
                secondary: '0xFFBDCBAF',
                onSecondary: '0xFF283420',
                secondaryContainer: '0xFF3E4A35',
                onSecondaryContainer: '0xFFD9E7CA',
                tertiary: '0xFFA0CFCF',
                onTertiary: '0xFF003737',
                tertiaryContainer: '0xFF1E4E4E',
                onTertiaryContainer: '0xFFBBEBEB',
                error: '0xFFFFB4AB',
                errorContainer: '0xFF93000A',
                onError: '0xFF690005',
                onErrorContainer: '0xFFFFDAD6',
                background: '0xFF1A1C18',
                onBackground: '0xFFE3E3DC',
                outline: '0xFF8D9286',
                onInverseSurface: '0xFF1A1C18',
                inverseSurface: '0xFFE3E3DC',
                inversePrimary: '0xFF2B6C00',
                shadow: '0xFF000000',
                surfaceTint: '0xFF8CDA60',
                outlineVariant: '0xFF43483E',
                scrim: '0xFF000000',
                surface: '0xFF1A1C18',
                onSurface: '0xFFC7C7C0',
                surfaceVariant: '0xFF43483E',
                onSurfaceVariant: '0xFFC7C7C0',
            },
        },
    ],
};
