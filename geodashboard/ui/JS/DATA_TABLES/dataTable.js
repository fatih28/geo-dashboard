/**
 * 
 * 
 * Erstellen der Datentabelle für "Metainformation Nr1" AJAX (Asynchronous
 * JavaScript and XML) Aufruf und Datenbankabfrage der Tabelle im xsjs-Service.
 * Daten intern speichern, in die richtige Struktur bringen und mit "dataTable"
 * (Jquery) als Tabelle in Metainformation 1 darstellen
 * 
 */
// _____________________________________________________________________________________________________________________________________________________________________
var myRecords = []
var tables = [];

	

$(document).ready(function() {
	$.ajax({
		url : '../model/INTENSIVE_MEASUREMENT.xsjs',
		data : Data1,
		success : function(Data) {
			myRecords = JSON.stringify(Data.features);
			tables = JSON.parse(myRecords)
			$("#empTable").dataTable({
				"aaData" : tables,
				responsive : true,

				"bJQueryUI" : true,
				"bDestroy" : true,
				"iDisplayLength" : 10,
				"bProcessing" : true,
				// "aaSorting": [[0, 'desc']],
				"aoColumns" : [ {
					"mData" : "OBJECTID"
				}, {
					"mData" : "Messmeter"
				}, {
					"mData" : "Potential__V_Ein"
				}, {
					"mData" : "Potential_V_Aus"
				}, {
					"mData" : "Gradient_mV_Ein"
				}, {
					"mData" : "Gradient_mV_Aus"
				},
				/*
				 * { "mData" : "Kommentar" }, { "mData" : "Referenz" }, {
				 * "mData" : "VOLTAGE" }, { "mData" : "EQUI_ID" }, { "mData" :
				 * "GlobalID" },
				 */
				],
				"oLanguage" : {
					"sProcessing" : "Daten werden abgerufen, Bitte Warten..."
				},
			});
		}
	});
});
// ____________________________________________________________________________________________________________________________________________________________________