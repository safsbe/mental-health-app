# Deploying

This file explains how to build & deploy the different components of the application. It assumes you have performed the prerequisites in [DEVELOPING.md](./DEVELOPING.md).

## Web Application

## Mobile Application

```sh
$ npm exec --package=expo --no-install -- expo prebuild --platform=android

# For public releases with Google Play
$ npm exec --package=react-native --no-install -- react-native build-android --mode=release
```
