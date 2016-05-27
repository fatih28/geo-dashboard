//Setting up the map	

var map = L.map('map', {
	center : [ 52.53337875789125, 13.242585717000741 ],
	minZoom : 2,
	zoom : 9
});
L.control.fullscreen().addTo(map);

L
		.tileLayer(
				'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
				{
					attribution : '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">',
					subdomains : [ 'otile1', 'otile2', 'otile3', 'otile4' ]
				}).addTo(map);

var myURL = jQuery('script[src$="map3.js"]').attr('src').replace('map3.js', '');

var myIcon = L.icon({
	iconUrl : myURL + 'images/icon.png',
	iconRetinaUrl : myURL + 'images/icon.png',
	iconSize : [ 19, 14 ],
	iconAnchor : [ 9, 21 ],
	popupAnchor : [ 0, -14 ]
});

/*
 * function latLongObject(json){ var result=[]; for ( var i=0; i < json.length;
 * ++i ) { result.push(new Array(json[i].lat, json[i].lng)); } //alert("result=
 * "+result+"\n json= "+json); return result; }
 */
var markerClusters = L.markerClusterGroup();

for (var i = 0; i < markers.length; ++i) 
	{
	var m = L.marker([ markers[i].lat, markers[i].lng ], {
		icon : myIcon
	}).bindPopup();

	markerClusters.addLayer(m);

}
map.addLayer(markerClusters);
/*
 * var polyline_options = { color: '#000' }; var polyline =
 * L.polyline(latLongObject(markers), polyline_options).addTo(map);
 */

