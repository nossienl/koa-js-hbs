import hbs from 'koa-hbs';

export function link(text, url) {
  text = hbs.Utils.escapeExpression(text);
  url = hbs.Utils.escapeExpression(url);

  var result = '<a href="' + url + '">' + text + '</a>';

  return new hbs.SafeString(result);
}
