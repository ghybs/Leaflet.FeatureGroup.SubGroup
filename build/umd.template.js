module.exports = {

    ///////////////////////////
    before:
    ///////////////////////////
'(function (root, factory) {\n' +
'    if (typeof define === "function" && define.amd) {\n' +
'        define(["leaflet"], factory);\n' +
'    } else if (typeof module === "object" && module.exports) {\n' +
'        module.exports = factory(require("leaflet"));\n' +
'    } else {\n' +
'        factory(root.L);\n' +
'    }\n' +
'}(this, function (L) {\n\n',


    ///////////////////////////
    after:
    ///////////////////////////
'\n    return Plugin;\n' +
'\n' +
'}));\n'

};
