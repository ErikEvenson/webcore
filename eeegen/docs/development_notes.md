# Development notes

## Core investigated techs

- gulp
- node

## TODOs

- Query build/setup status
- Create/clean AWS bucket
- Refactor gulp task loading
- Add CDN
- Add shrinkwrap
- Add local env module
- Add testing
- Add gulp-plumber
- Add BrowserSync
- Add source maps
- Add logging
- Add a restarter

## Architecture

Targetted project structure.

├── client
│   ├── app                 - All of our app specific components go in here
│   ├── assets              - Custom assets: fonts, images, etc…
│   ├── components          - Our reusable components, non-specific to to our app
│
├── e2e (TBD)                     - Our protractor end to end tests
├── public
│
└── server
    ├── api                 - Our apps server api
    ├── auth                - For handling authentication with different auth strategies
    ├── components          - Our reusable or app-wide components
    ├── config              - Where we do the bulk of our apps configuration
    │   └── local.env.js    - Keep our environment variables out of source control
    │   └── environment     - Configuration specific to the node environment
    └── views               - Server rendered views