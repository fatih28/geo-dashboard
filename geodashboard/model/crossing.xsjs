// DB Verbidung
var eString = "";

try {
	var conn = $.db.getConnection();
	var pstmt = conn
			.prepareStatement("Select top 10 OSM_ID, SHAPE.ST_AsGeoJson() AS LineString from DEV_DK10VNE0VKQK3U1OQO9EPDEDN.CROSSING");
	var rs = pstmt.executeQuery();
	var response = {
		type : "FeatureCollection"
	};
	response.features = [];
	while (rs.next()) {
		response.features.push({
			type : "Feature",
			OSM_ID : rs.getString(1),
			geometry : JSON.parse(rs.getString(2))
		});
	}
	response.properties = {};
	// Beenden der DB Konnektivität
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