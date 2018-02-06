/*
 * This file assumes that manageLibsVersions is already available globally.
 * https://github.com/ghybs/manage-libs-versions
 * It is intended to be loaded by other repositories demo page as well.
 */

(function (global) {

  var cdn = 'https://unpkg.com/';
  var versionPlaceholder = '@{{VERSION}}/';

  var mcgPathPrefix = cdn + 'leaflet.markercluster' + versionPlaceholder + 'dist/';

  // Leaflet.markercluster CSS files almost never change, therefore we can cache their SRI hash.
  var mcgSriCss = 'sha384-lPzjPsFQL6te2x+VxmV6q1DpRxpRk0tmnl2cpwAO5y04ESyc752tnEWPKDfl1olr';
  var mcgSriCssDefault = 'sha384-5kMSQJ6S4Qj5i09mtMNrWpSi8iXw230pKU76xTmrpezGnNJQzj0NzXjQLLg+jE7k';


  // Make libLeafletMarkerClusterVersions globally available.
  global.libLeafletMarkerClusterVersions = {
    name: 'leaflet.markercluster',
    mandatory: true,
    versions: [
      _makeMCGVersionAssets({
        name: '1.3.0',
        defaultVersion: true, // Make sure it is only the most recent version that is flagged as "defaultVersion".
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-NAOEbWFcjnXc7U9GkULPhupHZNAbqru9dS3c+4ANYAwtFoVAWuVuMVDH0DIy4ESp'
      }),
      _makeMCGVersionAssets({
        name: '1.2.0',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-dINZHKjXL9y0eDNSUfwb4kvRZ6MvJ4vmFALcQ/AV2mR8xf+eRadtJUC64ssRIGtP'
      }),
      _makeMCGVersionAssets({
        name: '1.1.0',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-o8NFSSgfa9PqnsO3+nQ3SQHkZfNwNVe+en1fpThO4r7AO72gGwy5zUxx3HGJiJoY'
      }),
      _makeMCGVersionAssets({
        name: '1.0.6',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-lmV2R0fFKgT9V8tqRhrINPsBGa2NTfCWs1Wy84HSmlfbtKX01TQly38wIkVtXG0p'
      }),
      _makeMCGVersionAssets({
        name: '1.0.5',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-MVfmnZ+vs5hd+jOXn6SkjoYXM3xwNNaocrr+VyryJw5oZr7elduarCOzVPMonjM1'
      }),
      _makeMCGVersionAssets({
        name: '1.0.4',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-N1djY2M5G5H27agJbWSeFU64nyV5Oo4unb0juOYWaKpr9VnX7eU2yPqzl/CSq3Yz'
      }),
      _makeMCGVersionAssets({
        name: '1.0.3',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-aPW7+bcmswg0D7N22za0Cj4RDQtJjUVz9obDfEeT0q8ekjOqn32IJt8Hmxqjl6jV'
      }),
      _makeMCGVersionAssets({
        name: '1.0.2',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-YZdVvMa2yGxN2JQjoeU0/VOEw5ukEi1qeyPeE5XMLG4NZeuG6UdasPeIWf3dggi+'
      }),
      _makeMCGVersionAssets({
        name: '1.0.1',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-Nn6VTBhTBwBk8NdNSCwI0iOCtEAYxq4ibhwBBi5ry05C+WUXieiTNfVb43K3bqA7'
      }),
      _makeMCGVersionAssets({
        name: '1.0.0',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-ho4yZuhivic8f9ODd7mDXL0tnARAH7Kjrvuziv1WljsEU8HMV416zSDtLTdMyz8i'
      }),
      _makeMCGVersionAssets({
        name: '0.5.0',
        sriCss: mcgSriCss,
        sriCssDefault: mcgSriCssDefault,
        sriSrcJs: 'sha384-DWfQP+GCYps97g3yfrDI8mUTMqyjWK8RLB3hHEq8i9j5orKVzJaeXTGl/skeKsiP'
      })
    ]
  };

  // Requires manageLibsVersions to be globally available.
  function _makeMCGVersionAssets(options) {
    var versionName = options.name;

    return {
      name: versionName,
      defaultVersion: options.defaultVersion,
      assets: [
        manageLibsVersions.makeStylesheet(mcgPathPrefix + 'MarkerCluster.css', versionName, options.sriCss),
        manageLibsVersions.makeStylesheet(mcgPathPrefix + 'MarkerCluster.Default.css', versionName, options.sriCssDefault),
        manageLibsVersions.makeScript(mcgPathPrefix + 'leaflet.markercluster-src.js', versionName, options.sriSrcJs)
      ]
    };
  }

})(this);
