# build-with-native-modules

This is a test project to figure out why `node_modules` weren't being packaged with my Electron app using `electron-packager`.

## Installation and Usage

* Clone this repository
* Run `npm cinstall`
* Run `npm start`

That *should* start Electron and setup an event from front-end to `electron` to show `bunyan` is working.

## Building for OSX

Run `npm run package:osx` and it should output a binary in `./build/bundle`.