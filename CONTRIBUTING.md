# Contributing Guidelines

Welcome to the ts-ddd-skelton Backend repository! We're glad you're interested in contributing. Before you get started, please take a moment to review the following guidelines.

## Code of Conduct

Please note that this project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## How to Contribute

### Reporting Bugs

If you encounter a bug in the project, please open an issue on the GitHub repository and provide as much detail as possible, including steps to reproduce the bug.

### Suggesting Enhancements

If you have an idea for an enhancement or new feature, feel free to open an issue on the GitHub repository to discuss it. We welcome feedback and suggestions from the community.

### Contributing Code

1. Clone the GitHub repository.
2. Create a new branch for your changes: `git checkout -b feature/name`.
3. Make your changes and commit them: `git commit -am 'Add new feature'`.
4. Push your changes to your fork: `git push origin feature/name`.
5. Submit a pull request (PR) to the dev repository's `dev` branch.
6. Wait for approval and resolve reviewer suggested corrections.
5. Submit a pull request (PR) to the prod repository's `prod` branch.

Please ensure that your code adheres to the project's coding standards and conventions. Be sure to include relevant tests and documentation with your changes.

## Versioning

### Major Release Instructions

For major releases (e.g., breaking changes or significant new features), follow these steps:

1. Update the version number in your `package.json` or equivalent file to indicate a major release (e.g., from 1.0.0 to 2.0.0).
2. Update the "Unreleased" section of the changelog with the upcoming changes for the major release.
3. Create a new release section in the changelog for the major release, following the format used for previous releases.
4. Commit the changes and tag the commit with the new version number (e.g., `git tag -a v2.0.0 -m "Release v2.0.0"`).
5. Push the commit and tags to your repository (e.g., `git push origin master --tags`).

### Minor Release Instructions

For minor releases (e.g., new features or improvements without breaking changes), follow these steps:

1. Update the version number in your `package.json` or equivalent file to indicate a minor release (e.g., from 1.0.0 to 1.1.0).
2. Update the "Unreleased" section of the changelog with the upcoming changes for the minor release.
3. Create a new release section in the changelog for the minor release, following the format used for previous releases.
4. Commit the changes and tag the commit with the new version number (e.g., `git tag -a v1.1.0 -m "Release v1.1.0"`).
5. Push the commit and tags to your repository (e.g., `git push origin master --tags`).

## Code Review Process

All pull requests will be reviewed by the project maintainers. Feedback may be provided to help improve your contribution. Once your pull request is approved, it will be merged into the main repository.
