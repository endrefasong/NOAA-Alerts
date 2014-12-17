// NOAA Space weather prediction center alerts on Pebble:
// Add a loop to iterate all alerts if needed, I feel the last
// alert is enough for me.
// This is mostly copy-paste as I am learning still :)
var UI = require('ui');
var ajax = require('ajax');

// Create a scrollable card
var card = new UI.Card({
  title:'NOAA Alert',
	subtitle:'loading',
	style:'small',
	icon:'images/noaa_28.png',
	scrollable:1
});

card.show();

// Construct URL
var URL = 'http://services.swpc.noaa.gov/products/alerts.json';

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    console.log("Download complete");

		// Basically all the interesting (and quite a bit superflous)
		// data reside inside message.
    var message = data[0].message;
		var issued = data[0].issue_datetime;
		card.subtitle(issued);
    card.body(message);
  },
  function(error) {
    console.log('Download failed: ' + error);
    card.subtitle('Download failed');
		card.body(error);
	}
);
