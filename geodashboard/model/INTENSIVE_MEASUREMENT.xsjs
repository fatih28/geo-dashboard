/**
 * 
 * Mit serverseitigem JavaScript (XSJS) wird die Anwendungslogik direkt auf der
 * SAP HANA Plattform ausgeführt
 * 
 * Aus der Hana-DB werden Parameter Abgefragt, um diese Daten als "dataTable" darzustellen
 */
// ____________________________________________________________________________________________________________
var eString = "";
try {
	
	var conn = $.db.getConnection();
	var pstmt = conn
			.prepareStatement("Select * from DEV_DK10VNE0VKQK3U1OQO9EPDEDN.INTENSIVEMEASUREMENT");
	var rs = pstmt.executeQuery();
	var response = {};
	response.features = [];
	while (rs.next()) {
		response.features.push({
			OBJECTID : rs.getString(1),
			Messmeter : rs.getString(2),
			Potential__V_Ein : rs.getString(3),
			Potential_V_Aus : rs.getString(4),
			Gradient_mV_Ein : rs.getString(5),
			Gradient_mV_Aus : rs.getString(6)
		});
	}
	/***************************************************************************
	 * OBJECTID;SMALLINT;;INT;X(1);X;; Messmeter;SMALLINT;;INT;;;;
	 * Potential__V_Ein;NVARCHAR;5;STRING;;;;
	 * Potential_V_Aus;NVARCHAR;5;STRING;;;; Gradient_mV_Ein;SMALLINT;;INT;;;;
	 * Gradient_mV_Aus;SMALLINT;;INT;;;; Kommentar;NVARCHAR;24;STRING;;;;
	 * Referenz;TINYINT;;INT;;;; VOLTAGE;SMALLINT;;INT;;;;
	 * EQUI_ID;SMALLINT;;INT;;;; GlobalID;NVARCHAR;38;STRING;;;;
	 **************************************************************************/
	response.properties = {};
	rs.close();
	pstmt.close();
	conn.close();
	$.response.contentType = "application/json";
	$.response.headers.set("Access-Control-Allow-Origin", "*");
	$.response.setBody(JSON.stringify(response));
	response.status = $.net.http.OK;
} catch (e) {
	eString = "\nException.toString(): " + e.toString() + "\n";
	var prop = "";
	for (prop in e) {
		eString += prop + ": " + e[prop] + "\n";
		response.status = $.net.http.INTERNAL_SERVER_ERROR;
		response.contentType = "plain/text";
		response.setBody(eString);
	}
}
//____________________________________________________________________________________________________________