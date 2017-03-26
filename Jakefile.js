/**
 * Leaflet.FeatureGroup.SubGroup building script.
 *
 * To use, install Node.js, then run the following commands in the project root:
 *
 * npm install -g jake (you might need admin rights - sudo)
 * npm install
 */

var build = require("./build/build.js"),
    git = require('git-rev');


// Returns the version string in package.json, plus a semver build metadata if
// this is not an official release
function calculateVersion(officialRelease, callback) {

    var packageJsonData = require('./package.json'),
        version = packageJsonData.version;

    if (officialRelease) {
        callback(packageJsonData);
    } else {
        git.short(function(str) {
            packageJsonData.version = version + '+' + str;
            callback (packageJsonData);
        });
    }
}

desc("Combine and minify source files");
task('build', {async: true}, function (compsBase32, buildName, officialRelease) {
    calculateVersion(officialRelease, function(metaData){
        build.build(complete, metaData, compsBase32, buildName);
    });
});

desc('Generate docs');
task('buildDocs', {async: true}, function () {
    var packageJsonData = require('./package.json');

    build.buildDocs(complete, packageJsonData);
});

task("default", ["build"]);
