# Contributing to Leaflet.FeatureGroup.SubGroup


## Installing and building

Install the dependencies:
```bash
$ npm install -g jake
$ npm install
```

Then to build:
```bash
$ jake
```

Output will be in the `dist/` directory


## Contributing code

Please feel free to submit PR's! :-)

Make sure you test it on your side obviously.

Unfortunately there is no automated test, so you should simply use the debug /
example pages, open the browser console, play with the map and make sure
everything works as expected and does not throw any error in the console.


### Licensing

As per Open Source Community practice, and explicitly stated in
[GitHub's Terms](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license):

> Whenever you make a contribution to a repository containing notice of a
license, you license your contribution under the same terms, and you agree that
you have the right to license your contribution under those terms.

In the case of this repository, you agree to license your contribution under
the BSD-2-Clause license.


## Publishing

Normally done by the package owner only.

1. Build, test, commit. The git working directory must be clean.
2. Update the CHANGELOG.md, using the next version. Commit it.
3. Record a new tag version with message:
[`npm version`](https://docs.npmjs.com/cli/version)
[`major` / `minor` / `patch`]
`-m "v%s: git commit title and description"`
4. Push to GitHub, including the tag.
5. Edit the release tag on GitHub. Upload the dist files in there, keeping
their filename intact. Make sure they reference the same commit hash as for the
newly created tag.
6. Make sure the links on README are functional (except for unpkg CDN, since
the new version is not published yet to npm). **Do not** make any commit
between the tag and the publication to npm, otherwise the commit references
stored in the dist files will mismatch.
7. Publish to npm registry: `npm publish`
