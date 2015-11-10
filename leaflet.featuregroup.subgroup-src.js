/**
 * Leaflet.FeatureGroup.SubGroup creates a Feature Group that adds its child
 * layers into a parent group when added to a map (e.g. through L.Control.Layers).
 * (c) 2015 Boris Seang
 * License BSD 2-Clause (Simplified)
 */


// Universal Module Definition
// from https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js
// as recommended by https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md#module-loaders
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['leaflet'], function (L) {
			return (root.L.FeatureGroup.SubGroup = factory(L));
		});
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require('leaflet'));
	} else {
		// Browser globals
		root.L.FeatureGroup.SubGroup = factory(root.L);
	}
}(this, function (L) {

	var FG = L.FeatureGroup,
	    FGproto = FG.prototype,
	    LG = L.LayerGroup;


	var SubGroup = FG.extend({

		statics: {
			version: '0.1.0'
		},

		initialize: function (parentGroup, layersArray) {
			FGproto.initialize.call(this, layersArray);

			this.setParentGroup(parentGroup);
		},

		setParentGroup: function (parentGroup) {
			this._parentGroup = parentGroup;

			// onAdd
			this.onAdd =
				(typeof parentGroup.addLayers === "function") ?
					this._onAddToGroupBatch :
				(parentGroup instanceof LG) ?
					this._onAddToGroup :
					this._onAddToMap;

			// onRemove
			this.onRemove =
				(typeof parentGroup.removeLayers === "function") ?
					this._onRemoveFromGroupBatch :
				(parentGroup instanceof LG) ?
					this._onRemoveFromGroup :
					this._onRemoveFromMap;

			return this;
		},

		setParentGroupSafe: function (parentGroup) {
			var map = this._map,
				wasOnMap = !!map;

			if (wasOnMap) {
				map.removeLayer(this);
			}

			this.setParentGroup(parentGroup);

			if (wasOnMap) {
				map.addLayer(this);
			}

			return this;
		},

		getParentGroup: function () {
			return this._parentGroup;
		},

		_onAddToGroupBatch: function (map) {
			var layersArray = this.getLayers();

			this._map = map;
			this._parentGroup.addLayers(layersArray);
		},

		_onRemoveFromGroupBatch: function (map) {
			var layersArray = this.getLayers();

			this._parentGroup.removeLayers(layersArray);
			this._map = null;
		},

		_onAddToGroup: function (map) {
			var parentGroup = this._parentGroup;

			this._map = map;
			this.eachLayer(parentGroup.addLayer, parentGroup);
		},

		_onRemoveFromGroup: function (map) {
			var parentGroup = this._parentGroup;

			this.eachLayer(parentGroup.removeLayer, parentGroup);
			this._map = null;
		},

		_onAddToMap: FGproto.onAdd,
		_onRemoveFromMap: FGproto.onRemove

	});



	// Supply with a factory for consistency with Leaflet.
	L.featureGroup.subGroup = function (parentGroup, options) {
		return new FG.SubGroup(parentGroup, options);
	};

	// Just return a value to define the module export.
	return SubGroup;
}));
