# Leaflet.FeatureGroup.SubGroup
Creates a Leaflet Feature Group that adds its child layers into a parent group
when added to a map (e.g. through L.Control.Layers).

**Typical usage is to dynamically add/remove groups of markers from
[Marker Cluster](https://github.com/Leaflet/Leaflet.markercluster).**

[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) plugin
provides beautiful animated Marker Clustering functionality.

[Leaflet](http://leafletjs.com/) is the leading open-source JavaScript library
for mobile-friendly interactive maps.

Current SubGroup version: 0.1.2




## Requirements
*Requires Leaflet stable (0.7.x)*

*For Leaflet 1.0 use the [`master` branch](https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/tree/master)*

*Optional: [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) plugin for Leaflet 0.7.x (i.e. Leaflet.markercluster branch `leaflet-0.7` / version 0.5.0)*



## Demos
- [SubGroup with standard L.Control.Layers and MarkerCluster](http://ghybs.github.io/Leaflet.FeatureGroup.SubGroup/examples/subGroup-markercluster-controlLayers-realworld.388.html)
- [SubGroup with standard L.Control.Layers to display Nested Groups](http://ghybs.github.io/Leaflet.FeatureGroup.SubGroup/examples/subGroup-controlLayers-nestedGroups.html)

*Note: the above demos use Leaflet 1.0 version.*


## Usage instructions

### Quick Guide
**HTML:**
```html
<!-- after Leaflet script -->
<script src="leaflet.featuregroup.subgroup.js"></script>
```

**JavaScript:**
```javascript
var map = L.map("map"),
    parentGroup = L.markerClusterGroup(options), // Could be any other Layer Group type.

    // This is where the magic happens!
    mySubGroup = L.featureGroup.subGroup(parentGroup, arrayOfMarkers);

parentGroup.addTo(map);
mySubGroup.addTo(map);
```

Now adding the sub-group to the map adds clustered markers!

It should virtually be compatible with any LayerGroup plugin, not only MarkerCluster.


### Installing the sub-plugin

#### Local copy
1. Download the "<a href="https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/releases/download/v0.1.2/leaflet.featuregroup.subgroup.js">`leaflet.featuregroup.subgroup.js`</a>" file from the [`v0.1.2` release](https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/releases/tag/v0.1.2).
2. Place the file alongside your page.
3. Add the `script` tag (see [Quick Guide > HTML](#quick-guide)) to your page after Leaflet script.


#### CDN
You can alternatively use the free [UNPKG](https://unpkg.com) CDN service, but keep in mind that it "[_is a free, best-effort service and cannot provide any uptime or support guarantees_](https://unpkg.com/#/about)".

```html
<!-- After Leaflet script -->
<script src="https://unpkg.com/leaflet.featuregroup.subgroup@0.1.2/leaflet.featuregroup.subgroup.js"></script>
```



### Creation
Simply use the `L.featureGroup.subGroup` factory instead of your regular `L.featureGroup` or `L.layerGroup`:

```javascript
var mySubGroup = L.featureGroup.subGroup(parentGroup);

mySubGroup.addTo(map);
```

Do not forget to add the parent group to your map.



## API Reference

### Creation
| Factory | Description |
| :------ | :---------- |
| **L.featureGroup.subGroup**( `<ILayer>` parentGroup?, `<ILayer[]>` layersArray? ) | Creates a sub-group with events, optionally given a parent group and an initial array of child layers. |


### Methods
| Method  | Returns  | Description |
| :------ | :------- | :---------- |
| **setParentGroup**( `<ILayer>` parentGroup ) | `this` | Changes the parent group into which child markers are added to / removed from. |
| **setParentGroupSafe**( `<ILayer>` parentGroup ) | `this` | Removes the current sub-group from map before changing the parent group. Re-adds the sub-group to map if it was before changing. |
| **getParentGroup**() | `<ILayer>` | Returns the current parent group. |

SubGroup does not provide any extra option or event beyond what
[L.LayerGroup](http://leafletjs.com/reference.html#layergroup) and
[L.FeatureGroup](http://leafletjs.com/reference.html#featuregroup) already provide.


## Limitations
If you change the parent group while the sub-group and/or its child markers are still on map, unexpected behaviour of the previous and/or new parent groups can happen.

Make sure the sub-group and its child layers are removed from map before changing the parent group, or use the `setParentGroupSafe` method instead.



## License
Leaflet.FeatureGroup.SubGroup is distributed under the [BSD 2-clause "Simplified" License](http://choosealicense.com/licenses/bsd-2-clause/), like Leaflet.
