'use strict';

const SerialPort = require('serialport').SerialPort;
const ndef = require('ndef');
const PN532 = require('pn532').PN532;

const device = '/dev/tty.usbserial-AH03B1EK';
const baudrate = 115200;

const serialPort = new SerialPort(device, {baudrate});
const nfc = new PN532(serialPort);

nfc.on('ready', () => {
  console.log('pn532 ready!');

  nfc.on('tag', (tag) => {
    console.log(tag.uid);

    nfc.readNdefData().then((data) => {
      // console.log(data);

      const records = ndef.decodeMessage(Array.from(data));
      console.log(records);
    });
  });
});
