'use strict';
const request = require('request');
const SerialPort = require('serialport').SerialPort;
const pn532 = require('pn532');
const ndef = require('ndef');

const serialPort = new SerialPort('/dev/tty.usbserial-AH03B1EK', { baudrate: 115200 });
const nfc = new pn532.PN532(serialPort);

nfc.on('ready', () => {
  console.log('pn532 ready');

  nfc.on('tag', (tag) => {
    console.log('tag found');
    console.log(`tag UUID : ${tag.uid}`);

    request('https://kmoe.herokuapp.com/nfc', (error, response, body) => {
      const messageToWrite = '' + body;
      console.log(`preparing to write ${messageToWrite}`);

      var messages = [
        ndef.uriRecord('https://www.twilio.com/signal'),
        ndef.textRecord(messageToWrite)
      ];
      var data = ndef.encodeMessage(messages);

      console.log('writing data');
      nfc.writeNdefData(data).then(function(response) {
        console.log('write successful');
      });
    });
  });
});

