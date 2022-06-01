import path from 'path';
import { fileURLToPath } from 'node:url';

import Koa from 'koa';
import Router from 'koa-router';

import hbs from 'koa-hbs';

import serve from 'koa-static';
import { pages } from './data/pages.js';
import { link } from './helpers/helpers.js';

const app = new Koa();
const router = new Router();
const dirname = path.dirname(fileURLToPath(import.meta.url));
let pageData = {};

// Static Assets
app.use(serve('public'));

app.use(
  hbs.middleware({
    viewPath: dirname + '/views',
    partialsPath: dirname + '/views/components',
    defaultLayout: 'layout',
  })
);

/// Register HBS helpers
hbs.registerHelper('link', link);

/// CREATE MENU FROM PAGES
const menu = pages.map((item) => {
  return { name: item.name, href: item.link, active: false };
});

/// CREATE LIST OF PAGE IDs
const ids = pages.map((obj) => obj.id);

// LOCALS
app.use(async (ctx, next) => {
  ctx.state.menu = menu;
  await next();
});

/// GET PAGE DATA AND ADD MENU
async function getPageData(page) {
  pageData = pages.find((data) => data.id === page);
  pageData.data.menu = menu;
}

/// RENDER PAGE
async function renderPage(ctx, page) {
  if (ids.includes(page)) {
    await getPageData(page);
    const { template, data } = pageData;
    await ctx.render(`pages/${template}`, data);
  } else {
    ctx.throw(404, `404: Page not Found : ${page}`);
  }
}

/// ERROR PAGE
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    ctx.status = err.status || 500;
    await ctx.render(`pages/error`, { error: err.message });
  }
});

// Router
router.get('/', async (ctx) => {
  await getPageData('index');
  const { template, data } = pageData;
  await ctx.render(`pages/${template}`, data);
});
router.get('/:page', async (ctx) => {
  await renderPage(ctx, ctx.params.page);
});
router.get('/:category/:type', async (ctx) => {
  const { category, type } = ctx.params;
  await renderPage(ctx, [category, type].join('/'));
});

app.use(router.routes());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// Run, Baby Run
app.listen(9000);
console.log('Server started on port 9000');
