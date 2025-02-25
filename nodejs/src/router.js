import douban from './spider/video/douban.js';
import live from './spider/video/live.js';
import cntvlanmu from './spider/video/cntvlanmu.js';
import cntvpianku from './spider/video/cntvpianku.js';
import wogg from './spider/video/wogg.js';
import mogg from './spider/video/mogg.js';
import lbpp from './spider/video/lbpp.js';
import feimao from './spider/video/feimao.js';
import tudou from './spider/video/tudou.js';
import xiaoya from './spider/video/xiaoya.js';
import duoduo from './spider/video/duoduo.js';
import xiaomi from './spider/video/xiaomi.js';
import ouge from './spider/video/ouge.js';
import liuqu from './spider/video/liuqu.js';
import zhizhen from './spider/video/zhizhen.js';
import yunpanres from './spider/video/yunpanres.js';
import xzys from './spider/video/xzys.js';
import meijumi from './spider/video/meijumi.js';
import czzy from './spider/video/czzy.js';
import subaibai from './spider/video/subaibai.js';
import hezi from './spider/video/hezi.js';
import ikanbot from './spider/video/ikanbot.js';
import nangua from './spider/video/ng.js';
import ttian from './spider/video/ttian.js';
import zxzj from './spider/video/zxzj.js';
import ddys from './spider/video/ddys.js';
import nongmin from './spider/video/nongmin.js';
import rrys from './spider/video/rrys.js';
import klm from './spider/video/klm.js';
import huya from './spider/video/huya.js';
import douyu from './spider/video/douyu.js';
import bili from './spider/video/bili.js';
import clicli from './spider/video/clicli.js';
import _360ba from './spider/video/_360ba.js';
import appys from './spider/video/appys.js';
//import m3u8cj from './spider/video/m3u8cj.js';
//import maiyoux from './spider/video/maiyoux.js';
import push from './spider/video/push.js';
import baseset from './spider/video/baseset.js';
import alist from './spider/pan/alist.js';
import _13bqg from './spider/book/13bqg.js';
import laobaigs from './spider/book/laobaigs.js';
import ts230 from './spider/book/230ts.js';
import bookan from './spider/book/bookan.js';
import copymanga from './spider/book/copymanga.js';
import bg from './spider/book/bengou.js';
import fengche from './spider/book/fengche.js';
import baozimh from './spider/book/baozimh.js';
import coco from './spider/book/coco.js';

const spiders = [
    douban,
    live,
    cntvlanmu,
    cntvpianku,
    wogg,
    mogg,
    lbpp,
    feimao,
    tudou,
    duoduo,
    xiaomi,
    ouge,
    liuqu,
    zhizhen,
    xiaoya,
    yunpanres,
    xzys,
    meijumi,
    czzy,
    subaibai,
    hezi,
    ikanbot,
    nangua,
    ttian,
    zxzj,
    ddys,
    nongmin,
    rrys,
    klm,
    huya,
    douyu,
    bili,
    clicli,
    _360ba,
    appys,
//    m3u8cj,
//    maiyoux,
    push,
    baseset,
    alist,
    _13bqg,
    laobaigs,
    ts230,
    bookan,
    copymanga,
    bg,
    fengche,
    baozimh,
    coco
    ];
const spiderPrefix = '/spider';

/**
 * A function to initialize the router.
 *
 * @param {Object} fastify - The Fastify instance
 * @return {Promise<void>} - A Promise that resolves when the router is initialized
 */
export default async function router(fastify) {
    // register all spider router
    spiders.forEach((spider) => {
        const path = spiderPrefix + '/' + spider.meta.key + '/' + spider.meta.type;
        fastify.register(spider.api, { prefix: path });
        console.log('Register spider: ' + path);
    });
    /**
     * @api {get} /check 检查
     */
    fastify.register(
        /**
         *
         * @param {import('fastify').FastifyInstance} fastify
         */
        async (fastify) => {
            fastify.get(
                '/check',
                /**
                 * check api alive or not
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    reply.send({ run: !fastify.stop });
                },
            );
            fastify.get(
                '/config',
                /**
                 * get catopen format config
                 * @param {import('fastify').FastifyRequest} _request
                 * @param {import('fastify').FastifyReply} reply
                 */
                async function (_request, reply) {
                    const config = {
                        video: {
                            sites: [],
                        },
                        read: {
                            sites: [],
                        },
                        comic: {
                            sites: [],
                        },
                        music: {
                            sites: [],
                        },
                        pan: {
                            sites: [],
                        },
                        color: fastify.config.color || [],
                    };
                    spiders.forEach((spider) => {
                        let meta = Object.assign({}, spider.meta);
                        meta.api = spiderPrefix + '/' + meta.key + '/' + meta.type;
                        meta.key = 'nodejs_' + meta.key;
                        const stype = spider.meta.type;
                        if (stype < 10) {
                            config.video.sites.push(meta);
                        } else if (stype >= 10 && stype < 20) {
                            config.read.sites.push(meta);
                        } else if (stype >= 20 && stype < 30) {
                            config.comic.sites.push(meta);
                        } else if (stype >= 30 && stype < 40) {
                            config.music.sites.push(meta);
                        } else if (stype >= 40 && stype < 50) {
                            config.pan.sites.push(meta);
                        }
                    });
                    reply.send(config);
                },
            );
        },
    );
}
