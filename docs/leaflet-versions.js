/*
 * This file assumes that manageLibsVersions is already available globally.
 * https://github.com/ghybs/manage-libs-versions
 * It is intended to be loaded by other repositories demo page as well.
 */

(function (global) {

  var cdn = 'https://unpkg.com/';
  var versionPlaceholder = '@{{VERSION}}/';

  var leafletPathPrefix = cdn + 'leaflet' + versionPlaceholder + 'dist/';


  // Make libLeafletVersions globally available.
  global.libLeafletVersions = {
    name: 'leaflet',
    mandatory: true,
    versions: [
      {
        name: 'master',
        assets: [{
          type: 'stylesheet',
          path: 'https://leafletjs-cdn.s3.amazonaws.com/content/build/master/leaflet.css'
        }, {
          type: 'script',
          path: 'https://leafletjs-cdn.s3.amazonaws.com/content/build/master/leaflet-src.js'
        }]
      },
      _makeLeafletVersionAssets({
        name: '1.3.1',
        defaultVersion: true, // Make sure it is only the most recent version that is flagged as "defaultVersion".
        sriCss: 'sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==',
        sriSrcJs: 'sha512-IkGU/uDhB9u9F8k+2OsA6XXoowIhOuQL1NTgNZHY1nkURnqEGlDZq3GsfmdJdKFe1k1zOc6YU2K7qY+hF9AodA=='
      }),
      _makeLeafletVersionAssets({
        name: '1.3.0',
        sriCss: 'sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==',
        sriSrcJs: 'sha512-2h9aokfcaYW7k0VPn1JqbQDQCaNQRrZJwetlnQ88yJrtIzGLVW/2StdQKoE+TIVNNTUxf6SVa+2vW2KB2EXnnA=='
      }),
      _makeLeafletVersionAssets({
        name: '1.2.0',
        sriCss: 'sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ==',
        sriSrcJs: 'sha512-YLT+I34kEPlk5OqR5XObf40B7sInrIU+bGe5VcwSpfR5OrFVjExFxfhVoJQEPZQWMyB53o3AU/bb5J91nc8CPA=='
      }),
      _makeLeafletVersionAssets({
        name: '1.1.0',
        sriCss: 'sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw==',
        sriSrcJs: 'sha512-sIPSXEX730B6EcdQyVPmIGp7f7ZrxIuECnkwYtPpEltG6NqOVtmBNoxHkMamNsAOHLMnDFaUoJYA4PWtzNZDuA=='
      }),
      _makeLeafletVersionAssets({
        name: '1.0.3',
        sriCss: 'sha512-07I2e+7D8p6he1SIM+1twR5TIrhUQn9+I6yjqD53JQjFiMf8EtC93ty0/5vJTZGF8aAocvHYNEDJajGdNx1IsQ==',
        sriSrcJs: 'sha512-WXoSHqw/t26DszhdMhOXOkI7qCiv5QWXhH9R7CgvgZMHz1ImlkVQ3uNsiQKu5wwbbxtPzFXd1hK4tzno2VqhpA=='
      }),
      _makeLeafletVersionAssets({
        name: '1.0.2',
        sriCss: 'sha384-UWNncEeCHTwoCP7ET6ZTVSPNXkKL7EWioe9by1pCm4Nu7nF9hR+tOaQzYSKp2dWN',
        sriSrcJs: 'sha384-KNLak5IVC1MuCvuK2/vsXntDe3JNjiQVrRbeoCBUtLnSRbQgcPbTepID1g8Llk9Y'
      }),
      _makeLeafletVersionAssets({
        name: '1.0.1',
        sriCss: 'sha384-jbhYDFfm+l6mA6jJUD5X/yv7LoRqVSoV/P77fNwITqMNlHHVIdSwj3SexyasxFL/',
        sriSrcJs: 'sha384-ObOe0J9dj8lQbJA8Pq3nwRiDPV58lDWqCJ/gLn2KPrUefv5P427o9ph0I4zyWWyu'
      }),
      _makeLeafletVersionAssets({
        name: '1.0.0',
        sriCss: 'sha384-eEKCX4qfm6OKwQ/hvjr7cRoBNXSQuFQoaiS7sXxD1x5Fmus85DkG7OTFoU6eI3FV',
        sriSrcJs: 'sha384-l/IzbI3svpXQy9ek7BrZfibt+dygUKc6XwMFKuvoCCGcwL+3GKNzMbF920axFAUy'
      }),
      _makeLeafletVersionAssets({
        name: '0.7.7',
        sriCss: 'sha384-99ZJFcuBCh9c/V/+8YwDX/TUGG8JWMG+gKFJWzk0BZP3IoDMN+pLGd3/H0yjg4oa',
        sriSrcJs: 'sha384-AoPn7rJ3h17Ohw5HQ0Y6dQ/PwJxk6tIU61Hn0B7So8NGej/J1YCA9R4eehsfCid7'
      })
    ]
  };

  // Requires manageLibsVersions to be globally available.
  function _makeLeafletVersionAssets(options) {
    var versionName = options.name;

    return {
      name: versionName,
      defaultVersion: options.defaultVersion,
      assets: [
        manageLibsVersions.makeStylesheet(leafletPathPrefix + 'leaflet.css', versionName, options.sriCss),
        manageLibsVersions.makeScript(leafletPathPrefix + 'leaflet-src.js', versionName, options.sriSrcJs)
      ]
    };
  }

})(this);
