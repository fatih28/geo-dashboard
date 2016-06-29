/**
 * 
 * 
 * Erstellen der Datentabelle für "Metainformation Nr2" AJAX (Asynchronous
 * JavaScript and XML) Aufruf und Datenbankabfrage der Tabelle im xsjs-Service.
 * Daten intern speichern, in die richtige Struktur bringen und mit "dataTable"
 * (Jquery) als Tabelle in Metainformation 2 darstellen
 * 
 */
// _____________________________________________________________________________________________________________________________________________________________________
var myRecords = []
var tables = [];

$(document).ready(function() {
	$.ajax({
		url : '../model/info_metering.xsjs',
		data : Data2,
		success : function(Data) {
			myRecords = JSON.stringify(Data.features);
			tables = JSON.parse(myRecords)
			$("#empTable2").dataTable({
				"aaData" : tables,
				responsive : true,
				"bJQueryUI" : true,
				"bDestroy" : true,
				"iDisplayLength" : 10,
				"bProcessing" : true,
				// "aaSorting": [[0, 'desc']],
				"aoColumns" : [ {
					"mData" : 'geometry.type'
				}, {
					"mData" : 'geometry.coordinates'
				},
				],
				"oLanguage" : {
					"sProcessing" : "Daten werden abgerufen, Bitte Warten..."
				},
			});
		}
	});
});
//_______________________________________________________________________________________________________________________________________________________________________