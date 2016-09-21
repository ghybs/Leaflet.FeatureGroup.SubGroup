module.exports = {

    ///////////////////////////
    before:
    ///////////////////////////
'(function (root, factory) {\n' +
'    if (typeof define === "function" && define.amd) {\n' +
'        define(["leaflet"], factory);\n' +
'    } else if (typeof module === "object" && module.exports) {\n' +
'        factory(require("leaflet"));\n' + // Side effect only even in CommonJS
'    } else {\n' +
'        factory(root.L);\n' +
'    }\n' +
'}(this, function (L) {\n\n',


    ///////////////////////////
    after:
    ///////////////////////////
'\n' +
'}));\n'

};
