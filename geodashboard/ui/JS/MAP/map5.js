/**
 * 
 * 
 * Intialisieren der Map mit Längen und Breitengrade und Parameter individuell
 * einstellen
 * 
 * 
 */
// ___________________________________________________________________________________________________________________________________________________________________________
var map = L.map('map', {
	center : [ 52.53346182789129, 13.242641697000757 ],
	minZoom : 3,
	zoom : 10
});

L.control.fullscreen().addTo(map); // Hinzufügen der Fullscreen funktion
L
		.tileLayer(
				'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw',
				{
					maxZoom : 18,
					attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
							+ '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
							+ 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
					id : 'mapbox.streets',
				}).addTo(map);

/**
 * Styles für die MAP:
 * 
 * mapbox.streets mapbox.light mapbox.dark mapbox.satellite
 * mapbox.streets-satellite mapbox.wheatpaste mapbox.streets-basic mapbox.comic
 * mapbox.outdoors mapbox.run-bike-hike mapbox.pencil mapbox.pirates
 * mapbox.emerald mapbox.high-contrast
 */
// Eigenes ICON nutzen für die "POINTS", festlegen der Größe Position etc.
var myIcon = L.icon({
	iconUrl : '/p1941887942trial/geojson/geodashboard/ui/JS/images/icon.png',
	iconSize : [ 29, 24 ],
	iconAnchor : [ 9, 21 ],
	popupAnchor : [ 0, -14 ]
});
// ___________________________________________________________________________________________________________________________________________________________________________
/**
 * 
 * 
 * 
 * 
 * 
 * Funktion mit AJAX (Asynchronous JavaScript and XML). In query1 und query2
 * werden die xsjs-Services als JSON-Format aufgefrufen und zur "Map"
 * hinzugefügt
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
// ___________________________________________________________________________________________________________________________________________________________________________
var Data1 = [];
var Data2 = [];
query1(Data1);
query2(Data2);

function query1(Data1) {
	$.ajax({
		url : '../model/equi.xsjs',
		data : Data1,
		success : function(Data1) {
			$('#wrapper').hide();
			geojson = L.geoJson(Data1, {}).addTo(map);
		}
	});
}

function query2(Data2) {
	$.ajax({
		url : '../model/metering.xsjs',
		data : Data2,
		success : function(Data2) {
			$('#wrapper').hide();
			geojson = L.geoJson(Data2, {

				onEachFeature : function(feature, layer) {
					layer.setIcon(myIcon);
				}
			}).addTo(map);
		}
	});
}
// ______________________________________________________________________________________________________________________________________________________________________________
