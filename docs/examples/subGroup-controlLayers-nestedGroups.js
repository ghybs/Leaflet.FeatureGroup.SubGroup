var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }),
    latlng = L.latLng(-37.82, 175.24);


var map = L.map('map', {center: latlng, zoom: 11, layers: [tiles]});

var parent = L.featureGroup(),
    groupA = L.featureGroup.subGroup(parent),// use `L.featureGroup.subGroup(parentGroup)` instead of `L.featureGroup()` or `L.layerGroup()`!
    groupB = L.featureGroup.subGroup(parent),
    groupC = L.featureGroup.subGroup(parent),
    groupD = L.featureGroup.subGroup(parent),
    control = L.control.layers(null, null, { collapsed: false });

// Trick to force order of listing in L.Control.Layers.
// See https://stackoverflow.com/questions/33655746/leaflet-how-to-specifiy-order-of-overlays-in-the-layers-control
L.stamp(parent);
L.stamp(groupA);
L.stamp(groupB);
L.stamp(groupC);
L.stamp(groupD);

parent.addTo(map);

var marker = L.marker([-37.8, 175.2]).addTo(groupA).bindPopup("Marker at [-37.8, 175.2] in group A");
L.marker([-37.8, 175.3]).addTo(groupB).bindPopup("Marker at [-37.8, 175.3] in group B");
L.marker([-37.9, 175.2]).addTo(groupC).bindPopup("Marker at [-37.9, 175.2] in group C");
L.marker([-37.9, 175.3]).addTo(groupD).bindPopup("Marker at [-37.9, 175.3] in group D");

control.addOverlay(parent, 'Parent');
control.addOverlay(groupA, 'Child A');
control.addOverlay(groupB, 'Child B');
control.addOverlay(groupC, 'Child C');
control.addOverlay(groupD, 'Child D');
control.addTo(map);

// Pre-add a few groups to the map.
parent.addTo(map);
groupA.addTo(map);
groupC.addTo(map);


// Set-up buttons.

document.getElementById("add").addEventListener("click", function () {
  map.addLayer(parent);
});

document.getElementById("remove").addEventListener("click", function () {
  map.removeLayer(parent);
});

document.getElementById("addMarker").addEventListener("click", function () {
  groupA.addLayer(marker);
});

document.getElementById("removeMarker").addEventListener("click", function () {
  groupA.removeLayer(marker);
});
