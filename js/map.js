$(document).ready(function() {

google.maps.event.addDomListener(window, 'load', initialize);

var drawingManager;
var selectedObject;

function initialize() {
  
  var mapOptions = {
    center: new google.maps.LatLng(22.28300409, 114.15714283),
    zoom: 12
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);


  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYLINE
      ]
    },
    markerOptions: {
      icon: 'images/beachflag.png'
    },
    circleOptions: {
      fillColor: '#000',
      fillOpacity: 0.2,
      strokeWeight: 5,
      clickable: true,
      editable: true,
      zIndex: 1,
    },
    polylineOptions: {
      editable: true
    }
  });
  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearObject);
  google.maps.event.addListener(map, 'click', clearObject);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    if (event.type != google.maps.drawing.OverlayType.RECTANGLE) {
      drawingManager.setDrawingMode(null);

      var newLine = event.overlay;
      newLine.type = event.type;
      google.maps.event.addListener(newLine, 'click', function() {
        setSelectedObject(newLine);
      });
      setSelectedObject(newLine);
    }
});

}

function clearObject() {
  if (selectedObject) {
    selectedObject.setEditable(false);
    selectedObject = null;
  }
}

function setSelectedObject(object) {
  clearObject();
  selectedObject = object;
  object.setEditable(true);
}

function deleteObject() {
  if (selectedObject) {
    selectedObject.setMap(null);   
  }
}

$('#delete').click(function() {
  deleteObject();
})


// google.maps.event.addListener(drawingManager, 'polylinecomplete', function(line) {
//   var coordinates = (line.getPath().getArray().toString());
//   console.log(coordinates);
// });

});