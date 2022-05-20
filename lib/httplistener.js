class HttpListener {
  constructor(options) {
    options = options || {};
    options.route = options.route || "/esp32";
  
    this.decoder = options.decoder;
    createRouteHandle(this, options.express, options.app, options.route);
  }
}

function createRouteHandle(httpListener, express, app, route) {
  app.use(route, express.raw({ type: 'application/json' }));
  app.post(route, (req, res) => {
    const time = Date.now();

    httpListener.decoder.handleData(req.body, time);

    res.status(200).end();
  });
}

module.exports = HttpListener;
