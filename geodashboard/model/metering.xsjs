/**
 * 
 * Mit serverseitigem JavaScript (XSJS) wird die Anwendungslogik direkt auf der
 * SAP HANA Plattform ausgeführt
 * 
 * Aus der Hana-DB werden bestimmte Parameter und die ST_Geometry Daten, die als
 * SHAPE gespeichert sind mit der Funktion "XY_POINT"."ST_AsGeoJson()" von der
 * Tabelle "METERING" abgefragt. Diese Daten werden im JSON Format gespeichert
 * und werden später per AJAX und in die MAP hinzugefügt.
 */
// ____________________________________________________________________________________________________________
var eString = "";
try {
	var conn = $.db.getConnection();
	var pstmt = conn
			.prepareStatement("Select ROW_ID, XY_POINT.ST_AsGeoJson() AS POINT from DEV_DK10VNE0VKQK3U1OQO9EPDEDN.METERING WHERE MOD(ROW_ID,10)=1");
	var rs = pstmt.executeQuery();
	var response = {
		type : "FeatureCollection"
	};
	response.features = [];
	while (rs.next()) {
		response.features.push({
			type : "Feature",
			ROW_ID : rs.getString(1),
			geometry : JSON.parse(rs.getString(2))
		});
	}
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