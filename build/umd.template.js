module.exports = {

    ///////////////////////////
    before:
    ///////////////////////////
'(function (root, factory) {\n' +
'    if (typeof define === "function" && define.amd) {\n' +
'        define(["leaflet"], function (L) {\n' +
'            return (root.L.FeatureGroup.SubGroup = factory(L));\n' +
'        });\n' +
'    } else if (typeof module === "object" && module.exports) {\n' +
'        module.exports = factory(require("leaflet"));\n' +
'    } else {\n' +
'        root.L.FeatureGroup.SubGroup = factory(root.L);\n' +
'    }\n' +
'}(this, function (L) {\n\n',


    ///////////////////////////
    after:
    ///////////////////////////
'\n    return SubGroup; // Must be the same identifier as in src!\n' +
'\n' +
'}));\n'

};
