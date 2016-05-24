'use strict';
const SerialPort = require('serialport').SerialPort;
const pn532 = require('pn532');
const ndef = require('ndef');

const device = '/dev/tty.usbserial-AH03B1EK';
const baudrate = 115200;

const serialPort = new SerialPort(device, { baudrate });
const nfc = new pn532.PN532(serialPort);

nfc.on('ready', () => {
  console.log('pn532 ready');

  nfc.on('tag', (tag) => {
    console.log('tag found');
    console.log(`tag UUID : ${tag.uid}`);

    nfc.readNdefData().then(function(data) {
      var records = ndef.decodeMessage(Array.from(data));
      console.log(records);
    });
  });
});

