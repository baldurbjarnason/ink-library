# Deployment

Currently the entire Ink project is hosted on the Google Cloud Platform's App Engine.

The API server deployments are managed by the `Rebus Hosting` project. While the front end development and production deployments are managed by the `ink-frontend-server-dev` and `fb-ink-dev` respectively

Deployments are done using Google's `gcloud` utility. The commands are saved as `npm` scrips:

- `npm run deploy-production` will run `npm run build && gcloud app deploy app.yaml --project fb-ink-dev`
- `npm run deploy-dev` will run `NODE_ENV=development npm run build && gcloud app deploy app-dev.yaml --project ink-frontend-server-dev`

Both require a config file: `app.yaml` for production, `app-dev.yaml` for development. You can find copies of those configuration files in the Rebus 1Password.

Both also require you to be signed in using the gcloud utility and have user account permissions to access those projects.

## Github Action

The GitHub action attached to the `ink-library` repository is set up to automatically deploy to development if the tests pass. It does so using an `app.yaml` file that's saved as an ENV secret in the repository's settings and written out to a file as a part of the action.

## Cloud Functions

To deploy the cloud functions you need to change your working directory to `functions/onfinalize` and run one of the `npm` deployment scripts set up in that directory:

- `npm run deploy-function` will run `gcloud functions deploy triggerWrapper --runtime nodejs12 --trigger-resource ink-upload-files --trigger-event google.storage.object.finalize --memory=2048MB --timeout=300s --project fb-ink-dev` which will deploy the function to the `ink-upload-files` bucket in `fb-ink-dev`
- `npm run deploy-dev-function` will run `gcloud functions deploy triggerWrapper --runtime nodejs12 --trigger-resource ink-frontend-server-dev-uploads --trigger-event google.storage.object.finalize --project ink-frontend-server-dev --memory=2048MB --timeout=300s` which will take care of the dev deployment.
