# SBE Mental Health App

A proof of concept application created by the SBE Innovation Team, part of the SBE NSF Council.

## Prerequisites

- Node.js 20
- Java 17
- Android CLI Tools
- ADB with a connected Android device/emulator

## Getting Started

To quickly deploy the mobile app to an Android device with Expo:

```sh
$ git clone https://github.com/safsbe/mental-health-app
$ cd mental-health-app
$ npm ci
$ npm run -w '@safsbe/mental-health-frontend' watch:common
$ npm run -w '@safsbe/mental-health-frontend' watch:android:expo

# Press 's' to switch to Expo Go builds
```

## Security

See [SECURITY.md](./SECURITY.md).

### Long-Term Support

This project does not adopt any long term support policy.

## Contributing

External pull requests are not currently being accepted. Our internal contribution workflow is documented in [CONTIRBUTING.md](./CONTRIBUTING.md).

## Developing

Instructions for building and developing this appication is provided in [DEVELOPING.md](./DEVELOPING.md).
