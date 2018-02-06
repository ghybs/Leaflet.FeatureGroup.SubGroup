(function (global) {

  var cdn = 'https://unpkg.com/';
  var versionPlaceholder = '@{{VERSION}}/';

  var subgroupPathPrefix0 = cdn + 'leaflet.featuregroup.subgroup' + versionPlaceholder;
  var subgroupPathPrefix = subgroupPathPrefix0 + 'dist/';

  var libs = [
    global.libLeafletVersions, // Assumes that "leaflet-versions.js" file has already been executed, so that libLeafletVersions is globally available.
  ];

  // In case libLeafletMarkerClusterVersions is also globally available.
  if (global.libLeafletMarkerClusterVersions) {
    libs.push(global.libLeafletMarkerClusterVersions);
  }

  // Plugin library.
  libs.push({
    name: 'leaflet.featuregroup.subgroup',
    mandatory: true,
    versions: [
      // You can use https://www.srihash.org/ to generate the SRI hash.
      _makeSubGroupVersionAssets({
        name: '1.0.2',
        sriSrcJs: 'sha384-svfed/3FeCsVv1Bq0lXOx2+p9iHbHO1ylmU9eoj7PtU5683TiHc/g0FL7FLpwlLL'
      }),
      _makeSubGroupVersionAssets({
        name: '1.0.1',
        sriSrcJs: 'sha384-jbTL/zsueVL4bMZERISP/PzASzooTdHjfAEmvij+Xmj5m41EDGfE4Ym9gT6Hvho1'
      }),
      // Version 1.0.0 not published on npm, hence not available on CDN.
      {
        name: '0.1.2',
        assets: [
          manageLibsVersions.makeScript(
              // Versions < 1.0.0 did not have a build step, hence no `dist/` folder.
              subgroupPathPrefix0 + 'leaflet.featuregroup.subgroup-src.js',
              '0.1.2',
              'sha384-FkzU6kGQEPFmZR/Te8Umcc5Mue+QV312qRXveCDpXqKxr8DsyHctFzwuaTUqyZne'
          )
        ]
      },
      // Version 0.1.1 not published on npm, hence not available on CDN.
      {
        name: 'local',
        defaultVersion: true,
        disabled: true, // Will be enabled if assets are found to be available at runtime (use `checkAssetsAvailability`).
        assets: [{
          type: 'script',
          path: '../../dist/leaflet.featuregroup.subgroup-src.js'
        }]
      }
    ]
  });


  // To be executed after manage-libs-versions is ready.
  // https://github.com/ghybs/manage-libs-versions
  // https://www.npmjs.com/package/manage-libs-versions
  global.bundle1 = new manageLibsVersions.Bundle({
    name: 'bundle1',
    libs: libs
  });


  function _makeSubGroupVersionAssets(options) {
    var versionName = options.name;

    return {
      name: versionName,
      defaultVersion: options.defaultVersion,
      disabled: options.disabled,
      assets: [
        manageLibsVersions.makeScript(subgroupPathPrefix + 'leaflet.featuregroup.subgroup-src.js', versionName, options.sriSrcJs)
      ]
    };
  }

})(this);
