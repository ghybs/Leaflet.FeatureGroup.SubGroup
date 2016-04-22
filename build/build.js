var fs = require("fs"),
    zlib = require("zlib"),
    UglifyJS = require("uglify-js"),
    MagicString = require("magic-string");

function getFiles() {
    return [
        "src/subgroup.js"
    ];
}

function bundleFiles(files, copyright) {
    var bundle = new MagicString.Bundle(),
        umdTemplate = require(__dirname + "/umd.template.js"),
        i = 0;

    for (; i < files.length; i += 1) {
        bundle.addSource({
            filename: files[i],
            content: new MagicString( fs.readFileSync(files[i], "utf8") + "\n\n" )
        });
    }

    bundle.prepend(
        copyright + umdTemplate.before
    ).append(umdTemplate.after);

    return bundle;
}

function getSizeDelta(newContent, oldContent, fixCRLF) {
    if (!oldContent) {
        return " (new)";
    }
    if (newContent === oldContent) {
        return " (unchanged)";
    }
    if (fixCRLF) {
        newContent = newContent.replace(/\r\n?/g, '\n');
        oldContent = oldContent.replace(/\r\n?/g, '\n');
    }
    var delta = newContent.length - oldContent.length;

    return delta === 0 ? "" : " (" + (delta > 0 ? "+" : "") + delta + " bytes)";
}

function loadSilently(path) {
    try {
        return fs.readFileSync(path, "utf8");
    } catch (e) {
        return null;
    }
}

function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2) + " kB";
}

exports.build = function (callback, version, copyrightYear, compsBase32, buildName) {

    var files = getFiles(compsBase32);

    console.log("Bundling and minifying " + files.length + " file(s)...");

    var copyrightSrc = fs.readFileSync("build/copyright-src.js", "utf8").replace("{VERSION}", version).replace("{YEAR}", copyrightYear),
        copyrightMin = fs.readFileSync("build/copyright.js", "utf8").replace("{VERSION}", version).replace("{YEAR}", copyrightYear),

        filenamePart = "leaflet.featuregroup.subgroup" + (buildName ? "-" + buildName : ""),
        pathPart = "dist/",
        srcFilename = filenamePart + "-src.js",
        mapFilename = filenamePart + "-src.map",
        srcPath = pathPart + srcFilename,
        mapPath = pathPart + mapFilename,

        bundle = bundleFiles(files, copyrightSrc),
        newSrc = bundle.toString() + "\n//# sourceMappingURL=" + mapFilename,

        oldSrc = loadSilently(srcPath),
        srcDelta = getSizeDelta(newSrc, oldSrc, true);

    pathPart += filenamePart;

    console.log("\tNon-minified: " + bytesToKB(newSrc.length) + srcDelta);

    if (newSrc !== oldSrc) {
        fs.writeFileSync(srcPath, newSrc);
        fs.writeFileSync(mapPath, bundle.generateMap({
            file: srcFilename,
            includeContent: true,
            hires: false
        }));
        console.log("\tSaved to " + srcPath);
    }

    var path = pathPart + ".js",
        oldMinified = loadSilently(path),
        newMinified = copyrightMin + UglifyJS.minify(newSrc, {
                warnings: true,
                fromString: true
            }).code,
        delta = getSizeDelta(newMinified, oldMinified);

    console.log("\tMinified: " + bytesToKB(newMinified.length) + delta);

    var newGzipped,
        gzippedDelta = "";

    function done() {
        if (newMinified !== oldMinified) {
            fs.writeFileSync(path, newMinified);
            console.log("\tSaved to " + path);
        }
        console.log("\tGzipped: " + bytesToKB(newGzipped.length) + gzippedDelta);
        callback();
    }

    zlib.gzip(newMinified, function (err, gzipped) {
        if (err) { return; }
        newGzipped = gzipped;
        if (oldMinified && (oldMinified !== newMinified)) {
            zlib.gzip(oldMinified, function (err, oldGzipped) {
                if (err) { return; }
                gzippedDelta = getSizeDelta(gzipped, oldGzipped);
                done();
            });
        } else {
            done();
        }
    });
};
