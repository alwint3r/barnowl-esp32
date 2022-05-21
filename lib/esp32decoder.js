const Raddec = require('raddec');

class Esp32Decoder {
  constructor(options) {
    options = options || {};

    this.barnowl = options.barnowl;
  }

  handleData(data, time) {
    const raddecs = decode(data, time);
    for (const raddec of raddecs) {
      this.barnowl.handleRaddec(raddec);
    }
  }
}

function decode(data, time) {
  const raddecs = [];
  const raddec = new Raddec({
    transmitterId: data.transmitterId,
    transmitterIdType: Raddec.identifiers.TYPE_EUI48,
    timestamp: time,
  });

  raddec.addDecoding({
    receiverId: data.receiverId,
    receiverIdType: Raddec.identifiers.TYPE_EUI48,
    rssi: data.rssi,
  });

  if (data.packet) {
    const packetLength = data.packet.length / 2;

    let packet = packetLength.toString(16).padStart(4, '0');
    packet += Buffer.from(data.transmitterId, 'hex').reverse().toString('hex');
    packet += data.packet;
    raddec.addPacket(packet);
  }

  raddecs.push(raddec);

  return raddecs;
}

module.exports = Esp32Decoder;