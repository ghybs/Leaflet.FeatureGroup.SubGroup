/**
 * Leaflet.FeatureGroup.SubGroup building script.
 *
 * To use, install Node.js, then run the following commands in the project root:
 *
 * npm install -g jake (you might need admin rights - sudo)
 * npm install
 */

var build = require("./build/build.js"),
    copyrightData = require("./build/copyright-data.js"),
    version = copyrightData.version;

desc("Combine and minify source files");
task("build", {async: true}, function (compsBase32, buildName) {
    var v;

    jake.exec('git log -1 --pretty=format:"%h"', {breakOnError: false}, function () {
        build.build(complete, v, copyrightData.year, compsBase32, buildName);

    }).on("stdout", function (data) {
        v = version + " (" + data.toString() + ")";
    }).on("error", function () {
        v = version;
    });
});

task("default", ["build"]);
