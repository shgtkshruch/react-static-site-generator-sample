import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Router, RouterContext, match, createMemoryHistory } from 'react-router';
import routes from './routes';


// if (typeof document !== 'undefined') {
//   var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
//   Router.run(Routes, Router.HistoryLocation, function (Handler) {
//     React.render(React.createElement(Handler, initialProps), document)
//   });
// }

module.exports = function(locals, callback){
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);

  return match({
    routes,
    location
  }, (error, redirectLocation, renderProps) => {
    // let html = ReactDOMServer.renderToStaticMarkup(
    let html = ReactDOMServer.renderToString(
      <RouterContext {...renderProps} />
    );

    // タイトルを抽出
    // <div title="top page"></div> => top page
    const title = html.match(/^.+title="(.+?)"/)[1];

    // タイトル用に用意している一番外側のdivを削除
    html = html.match(/^<div.+?>(.+)<\/div>/)[1]

    return callback(null, locals.template({html, title}));
  });

  // Router.run(routes, locals.path, function (Handler) {
  //   var html = React.renderToString(React.createElement(Handler, locals));
  //
  //   const title = html.match(/^.+title="(.+)"/)[1];
  //
  //   html = html.match(/^<div.+?>(.+)<\/div>/)[1]
  //
  //   callback(null, locals.template({html, title}));
  // });

};
