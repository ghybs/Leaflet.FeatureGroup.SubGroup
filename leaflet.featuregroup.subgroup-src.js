/**
 * Leaflet.FeatureGroup.SubGroup creates a Feature Group that adds its child
 * layers into a parent group when added to a map (e.g. through L.Control.Layers).
 * (c) 2015-2016 Boris Seang
 * BSD 2-Clause "Simplified" License
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], function (L) {
            return (root.L.FeatureGroup.SubGroup = factory(L));
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else {
        root.L.FeatureGroup.SubGroup = factory(root.L);
    }
}(this, function (L) {

    var FG = L.FeatureGroup,
        FGproto = FG.prototype,
        LG = L.LayerGroup,
        EVENTS = FG.EVENTS;


    var SubGroup = FG.extend({

        statics: {
            version: '0.1.1'
        },

        /**
         * Instantiates a SubGroup.
         * @param parentGroup (L.LayerGroup) (optional)
         * @param layersArray (L.Layer[]) (optional)
         */
        initialize: function (parentGroup, layersArray) {
            FGproto.initialize.call(this, layersArray);

            this.setParentGroup(parentGroup);
        },

        /**
         * Changes the parent group into which child markers are added to /
         * removed from.
         * @param parentGroup (L.LayerGroup)
         * @returns {SubGroup} this
         */
        setParentGroup: function (parentGroup) {
            var pgInstanceOfLG = parentGroup instanceof LG;

            this._parentGroup = parentGroup;

            // onAdd
            this.onAdd =
                pgInstanceOfLG ?
                    (
                        typeof parentGroup.addLayers === "function" ?
                            this._onAddToGroupBatch :
                            this._onAddToGroup
                    ) :
                    this._onAddToMap;

            // onRemove
            this.onRemove =
                pgInstanceOfLG ?
                    (
                        typeof parentGroup.removeLayers === "function" ?
                            this._onRemoveFromGroupBatch :
                            this._onRemoveFromGroup
                    ) :
                    this._onRemoveFromMap;

            // addLayer
            this.addLayer = pgInstanceOfLG ?
                this._addLayerToGroup :
                this._addLayerToMap;

            // removeLayer
            this.removeLayer = pgInstanceOfLG ?
                this._removeLayerFromGroup :
                this._removeLayerFromMap;

            return this;
        },

        /**
         * Removes the current sub-group from map before changing the parent
         * group. Re-adds the sub-group to map if it was before changing.
         * @param parentGroup (L.LayerGroup)
         * @returns {SubGroup} this
         */
        setParentGroupSafe: function (parentGroup) {
            var map = this._map;

            if (map) {
                map.removeLayer(this);
            }

            this.setParentGroup(parentGroup);

            if (map) {
                map.addLayer(this);
            }

            return this;
        },

        /**
         * Returns the current parent group.
         * @returns {*}
         */
        getParentGroup: function () {
            return this._parentGroup;
        },


        // For parent groups with batch methods (addLayers and removeLayers)
        // like MarkerCluster.
        _onAddToGroupBatch: function (map) {
            var layersArray = this.getLayers();

            this._map = map;
            this._parentGroup.addLayers(layersArray);
        },

        _onRemoveFromGroupBatch: function () {
            var layersArray = this.getLayers();

            this._parentGroup.removeLayers(layersArray);
            this._map = null;
        },


        // For other parent layer groups.
        _onAddToGroup: function (map) {
            var parentGroup = this._parentGroup;

            this._map = map;
            this.eachLayer(parentGroup.addLayer, parentGroup);
        },

        _onRemoveFromGroup: function () {
            var parentGroup = this._parentGroup;

            this.eachLayer(parentGroup.removeLayer, parentGroup);
            this._map = null;
        },


        // Defaults to standard FeatureGroup behaviour when parent group is not
        // specified or is not a type of LayerGroup.
        _onAddToMap: FGproto.onAdd,
        _onRemoveFromMap: FGproto.onRemove,


        _addLayerToGroup: function (layer) {
            if (this.hasLayer(layer)) {
                return this;
            }

            if (layer.on) {
                layer.on(EVENTS, this._propagateEvent, this);
            }

            var id = this.getLayerId(layer);

            this._layers[id] = layer;

            if (this._map) {
                // Add to parent group instead of directly to map.
                this._parentGroup.addLayer(layer);
            }

            if (this._popupContent && layer.bindPopup) {
                layer.bindPopup(this._popupContent, this._popupOptions);
            }

            return this.fire('layeradd', {layer: layer});
        },

        _removeLayerFromGroup: function (layer) {
            if (!this.hasLayer(layer)) {
                return this;
            }
            if (layer in this._layers) {
                layer = this._layers[layer];
            }

            if (layer.off) {
                layer.off(EVENTS, this._propagateEvent, this);
            }

            var id = layer in this._layers ? layer : this.getLayerId(layer);

            if (this._map && this._layers[id]) {
                // Remove from parent group instead of directly from map.
                this._parentGroup.removeLayer(id);
            }

            delete this._layers[id];

            if (this._popupContent) {
                this.invoke('unbindPopup');
            }

            return this.fire('layerremove', {layer: layer});
        },

        // Defaults to standard FeatureGroup behaviour when parent group is not
        // specified or is not a type of LayerGroup.
        _addLayerToMap: FGproto.addLayer,
        _removeLayerFromMap: FGproto.removeLayer

    });



    // Supply with a factory for consistency with Leaflet.
    L.featureGroup.subGroup = function (parentGroup, options) {
        return new FG.SubGroup(parentGroup, options);
    };

    // Just return a value to define the module export.
    return SubGroup;
}));
