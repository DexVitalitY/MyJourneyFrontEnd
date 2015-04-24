var coordinates;
var drawingManager;
var selectedObject;
var map;

$(document).ready(function() {

google.maps.event.addDomListener(window, 'load', initialize);

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

function getAll() {
  $.ajax({
    type:'GET',
    url: 'http://localhost:3000/journeys',
    dataType: 'json',
    success: function(response){
      for (var i = 0; i < response.length; i++) {
        $('#journeys').append('<div class="journey-item"> Journey Name: ' + response[i].name + '<br> Journey Message: ' + response[i].message + '</div>' )
      }
      console.log(response);
    }
  })
}

getAll();

// $('.journey-item').click(function(){
  
// })

$('#delete').click(function() {
  deleteObject();
})

$('#addJourney').click(function(event){
  event.preventDefault();
  $.ajax({
    type:'POST',
    url: 'http://localhost:3000/journeys',
    crossDomain: true,
    data: {
      journey: {
        name: $('#journey-name').val(),
        message: $('#journey-message').val(),
        coordinates: newJourney
      }
    },
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function(response){
      console.log('POSTED!', response);
      function addMarker(){

        for (var i = 0; i < newJourney.length; i++) {
          var marker = new google.maps.Marker({
          position: new google.maps.LatLng(newJourney[i][0], newJourney[i][1]),
          map: map
          });
        } 
        // markers.push(marker)
      }
      addMarker();
      // location.reload();
    }
  });
})

$('#signOut').click(function(event){
  event.preventDefault();
  $.ajax({
    type:'DELETE',
    url: 'http://localhost:3000/sessions',
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    success: function(response){
      console.log(response);
      window.location.replace("../index.html");
    }
  });
})

function initialize() {
  
  var mapOptions = {
    center: new google.maps.LatLng(22.28300409, 114.15714283),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
    
  // function setMarkers(markers) {
  //   tempMark = markers
  //   for (var key in markers) {
  //     new google.maps.Marker({
  //       position: new google.maps.LatLng(markers[key].lat, markers[key].lng),
  //       map: map
  //     });
  //   }
  // }
  // $.getJSON('gps.json', setMarkers);
 
  // function makeJourney(markers) {
  //   console.log(markers);
  //   newJourney = [];
  //   for (var key in markers) {
  //   newJourney.push(markers[key]);
  //   }

  //   for(var i = 0; i < newJourney.length; i++) {
  //     $('#gps-coordinates').append('<div class="coordinates"> Picture: ' + (i+1) + '<br> Latitude: ' + newJourney[i].lat + '<br> Longitude: '+ newJourney[i].lng + '</div><br>')
  //   }
  // }
  // $.getJSON('gps.json', makeJourney);
  // I can display this in a div with a set height and width and go overflow as scroll on the maps.html page. Same as appending rows and column to a div.

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.CURSOR,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        // google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYLINE
      ]
    },
    // markerOptions: {
    //   icon: 'images/beachflag.png'
    // },
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

  google.maps.event.addListener(drawingManager, 'polylinecomplete', function(line) {
    coordinates = (line.getPath().getArray());
    console.log(coordinates);
  });
}


});