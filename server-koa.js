// Configuration
const API_PORT = 3200;
const API_ENDPOINT = 'api';

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router({ prefix: `/${API_ENDPOINT}`});
var qr = require('qr-image');  

router.get('/qrcode', async (ctx, next) => { 
    const text = ctx.query.text || new Date().toString();
    const code = qr.image(text, { type: 'svg' });
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = code; 
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(API_PORT);

console.log(`Koa listening at http://localhost:${API_PORT}/${API_ENDPOINT}`);