# One Click Event Publishing!

## Overview

Internal tool for ACM -- one click to publish events on various social media platforms!

## Preparing to run the project

Install relevant developer tools
* npm
* git
* python + Flask
* React + Typescript
* Code editor of choice (such as Visual Studio Code)

Install dependencies: `npm install`

## Backend info

Move into the backend folder with `cd backend`. Create a virtual environment if none made yet with `python3 -m venv venv`.

Activate your virtual environment with `source venv/bin/activate` and deactivate it with `deactivate`.

Install the dependencies needed with `pip install -r requirements.txt`.

Everytime you add a dependency, update the requirements.txt by running `pip freeze > requirements.txt`.

Create a .env file inside the backend folder with the appropriate SECRET_KEY and other environment variables.

To run the backend server use `python3 server_config.py` or `python server_config.py` -- it will run on localhost:8080.

## Frontend info

Install dependencies using
```
yarn install
yarn prepare
```

Then use `yarn start` -- the frontend will run on localhost:3000.

Other helpful commands for the frontend:
```
yarn run build
yarn lint
yarn lint-fix
```

See the README in the frontend folder for more details!

## Contribution Workflow

Thanks for your interest in contributing to one click event publishing! ❤️

Here's a quick guide on how to get started.

1. Either make a new branch or a fork of this repository. `main` is a protected branch, **so you cannot push to it**.
2. Follow the instructions in "Development Setup" above. If you're on a fork, replace the URL with the fork's URL; if you're on a different branch, check it out using `git checkout`.
3. Beep boop away!
4. **Before you push**, make sure your app runs with `yarn start`. If there are any errors, our CI/CD service will **reject your build**.
5. Once you're ready, stage and commit your changes!
6. Make a [pull request](https://github.com/uclaacm/one-click-event-publishing/pulls) with your changes, and let someone on your project team know.
    * Netlify has a neat feature called "Deploy Previews" that give you a link to preview your changes; [see the blog post](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) for more info!
7. If your code passes code review, then we can **squash and merge** it into `main`. Congratulations! If you'd like, it's now safe to delete your branch/fork.

## Important Folders and Files

Backend
* utilities.py: contains utility functions (ex. for posting to different social media)

Frontend
* src folder

## Routes

Frontend: localhost:8000/api
Default route

localhost:8000/api/post-facebook [Not for use]
Makes a post to Facebook
