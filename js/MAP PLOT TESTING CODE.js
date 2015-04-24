var markers = [];

function addMarker(){

	for (var i = 0; i < newJourney.length; i++) {
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(newJourney[i][0], newJourney[i][1]),
		map: map
	});
}
	// markers.push(marker)
}

function setAllMap(map){
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers() {
	setAllMap(null);
}

function deleteMarkers() {
	clearMarkers();
	markers = [];
}

for (var i = 0; i < newJourney.length)