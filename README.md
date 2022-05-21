# Barnowl ESP32

Converts BLE packets from any ESP32-powered devices into [raddecs](https://github.com/reelyactive/raddec).

This project is heavily inspired by reelyActive's [Barnowl](https://github.com/reelyactive/barnowl).

## Usage

See `bin/barnowl-esp32` for complete standalone code.

## Data Structure

The data structure resembles the [raddec](https://github.com/reelyactive/raddec) structure.

```json
{
    "receiverId": "",
    "transmitterId": "",
    "rssi": -65,
    "packet": "..." // PDU without transmitterId and total packet length in hex string
}
```

See [lib/esp32decoder.js](lib/esp32decoder.js) for more information.


## Stability

This software is not suitable for production use. Use it at your own risk!
