'use strict';

const request = require('request');
const SerialPort = require('serialport').SerialPort;
const PN532 = require('pn532').PN532;
const ndef = require('ndef');

const device = '/dev/tty.usbserial-AH03B1EK';
const baudrate = 115200;

const serialPort = new SerialPort(device, {baudrate});
const nfc = new PN532(serialPort);

nfc.on('ready', () => {
  console.log('pn532 ready!');
  
  nfc.on('tag', (tag) => {
    const dataToWrite = 'hello Signal!';

    const messages = [
      ndef.uriRecord('http://google.com'),
      ndef.textRecord(dataToWrite)
    ];

    const data = ndef.encodeMessage(messages);

    nfc.writeNdefData(data).then(() => {
      console.log('write successful');
    });
  });
});