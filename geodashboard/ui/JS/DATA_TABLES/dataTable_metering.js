/**
 * 
 * 
 * Erstellen der Datentabelle für "Metainformation Nr3" AJAX (Asynchronous
 * JavaScript and XML) Aufruf und Datenbankabfrage der Tabelle im xsjs-Service.
 * Daten intern speichern, in die richtige Struktur bringen und mit "dataTable"
 * (Jquery) als Tabelle in Metainformation 3 darstellen
 * 
 */
// _____________________________________________________________________________________________________________________________________________________________________

var myRecords = []
var t = [];
$(document).ready(function() {
	$.ajax({
		url : '../model/METERINGE.xsjs',
		data : Data1,
		success : function(METERING_E_Data) {
			myRecords = JSON.stringify(METERING_E_Data.features);
			t = JSON.parse(myRecords)
			$("#empTable3").dataTable({
				"aaData" : t,
				"bJQueryUI" : true,
				"bDestroy" : true,
				"iDisplayLength" : 10,
				"bProcessing" : true,
				// "aaSorting": [[0, 'desc']],
				"aoColumns" : [ {
					"mData" : "EQUI_ID"
				}, {
					"mData" : 'geometry.type'
				}, {
					"mData" : 'geometry.coordinates'
				}, ],
				"oLanguage" : {
					"sProcessing" : "Daten werden abgerufen, Bitte Warten..."
				},
			});}
	});
});
//______________________________________________________________________________________________________________________________________________________________________