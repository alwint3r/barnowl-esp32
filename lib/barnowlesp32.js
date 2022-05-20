
const HttpListener = require('./httplistener');
const Esp32Decoder = require('./esp32decoder');
const EventEmitter = require('events').EventEmitter;

class BarnowlEsp32 extends EventEmitter {
  constructor(options) {
    super();

    options = options || {};
    options.barnowl = this;

    this.listeners = [];
    this.esp32Decoder = new Esp32Decoder({ barnowl: this });
  }

  addListener(ListenerClass, options) {
    options = options || {};
    options.decoder = this.esp32Decoder;

    const listener = new ListenerClass(options);
    this.listeners.push(listener);
  }

  handleRaddec(raddec) {
    this.emit('raddec', raddec);
  }

  handleInfrastructureMessage(message) {
    this.emit('infrastructureMessage', message);
  }
}

module.exports = BarnowlEsp32;
module.exports.HttpListener = HttpListener;