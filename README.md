# SBE Mental Health App

[![CI](https://github.com/safsbe/mental-health-app/actions/workflows/ci.yaml/badge.svg)](https://github.com/safsbe/mental-health-app/actions/workflows/ci.yaml)
[![Coverage Status](https://coveralls.io/repos/github/safsbe/mental-health-app/badge.svg?branch=main)](https://coveralls.io/github/safsbe/mental-health-app?branch=main)

A proof of concept application created by the SBE Innovation Team, part of the SBE NSF Council.

## Prerequisites

- Node.js 20
- Java 17
- Android CLI Tools
- ADB with a connected Android device/emulator

## Getting Started

To quickly deploy the mobile app to an Android device/emulator with Expo:

```sh
$ git clone https://github.com/safsbe/mental-health-app.git
$ cd mental-health-app
$ git submodule update --init
$ npm ci
$ npm run watch:android
```

## Security

See [SECURITY.md](./SECURITY.md).

### Long-Term Support

This project does not adopt any long term support policy.

## Contributing

External pull requests are not currently being accepted. Our internal contribution workflow is documented in [CONTIRBUTING.md](./CONTRIBUTING.md).

## Maintaining

Instructions for maintaining this application is provided in [MAINTAINING.md](./MAINTAINING.md).

## License

Source code is licensed under [MIT](./LICENSES/MIT).

Images, text and other content are licensed under a proprietary license.
