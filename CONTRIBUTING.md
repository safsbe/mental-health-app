# Contributing

Thanks for your interest in contibuting to the project! Unfortunately, we are not currently accepting external pull requests.

This document explains the internal workflow adopted by the maintainers of this project.

## Contribution workflow

This project uses a pull request-based workflow.

The following branches are protected from direct push of commits:

- `main` (default branch)
  This branch will contain the latest deployable (though not necessarily released) version of the project

- `<y>.x`
  Branches where `<y>` is replaced with a version number (e.g. `1.x`) are branches which carry an deployable (though not necessarily released), older or upcoming major version of the project.

All contributions are done on a fork or a separate branch with the parent being one of the above. The parent branch will be dependent on the major version that you'd wish to submit changes to.

## Getting started

The first few commands to get started are as follows:

```sh
$ git clone https://github.com/safsbe/mental-health-app.git
$ cd mental-health-app
$ git submodule update --init
$ npm ci
```

NPM Scripts are provided to automate commands for common tasks. For example, to quickly deploy to an ADB-connected Android device/emulator:

```sh
$ npm run watch:android
```

## Contributing changes

### Accepting the Developer Certificate of Origin (DCO)

The [DCO](https://wiki.linuxfoundation.org/dco) is a more relaxed equivalent to a Contributor License Agreement (CLA). When contributing changes, you have to agree to the DCO (steps provided below).

A copy of the DCO can be found at [DCO.txt](./DCO.txt).

### Updating the `assets/` submodule

Due to the proprietary license and size of assets, they are stored in a separate Git repository.

**Do not introduce local changes directly to the git submodule. Instead, merge the changes to the original `safsbe/mental-health-app-assets` Git repository's `main` branch and follow the steps below to update the reference in this Git repository.**

After merging changes into the `main` branch of `safsbe/mental-health-app-assets`, run the following in the root of **this** repository:

```sh
$ git submodule update --remote assets/
```

You must `git commit` after a `git submodule update --remote`.

### Writing a commit

This project uses Conventional Commits 2.0.

When using `git commit`, add `--signoff` or `-s`. This adds a line to your Git message footer whcich indicates your acceptance of the DCO.

### Creating a pull request

#TODO

## Common issues

### `husky - pre-commit script failed (code 127)` when committing

Run `npm prepare` and then re-run the Git commit command.

To bypass pre-commit hook, add `--no-verify` to your Git commit command.

### The `DCO` check is failing

Ensure that:

- `user.email` in your `~/.gitconfig` is an email tied to your Github account (Github's masked emails **are** accepted).
- The email in at least one `Signed-off-by` line in each commit matches the email of the Git Committer or Git Author of that commit.

### `Error: Unable to resolve module` or `None of these files exist` in CI pipeline

You may have added new assets into the `assets/` subdirectory. Ensure that these new assets have been merged into the `main` branch of the `mental-health-app-assets` Git repository.
