# One Click Event Publishing!

One click to publish events/posts on various social media platforms.

# Developer tools:
* npm
* git
* python3 (for backend)
* django (backend python framework)
* react
* Visual Studio Code (or code editor of choice)

# Preparing to run the project
Install relevant developer tools
* Install dependencies: Run `npm install`

# Run the backend
Move into the backend folder with `cd backend`. Create a virtual environment if none made yet with `python3 -m venv venv`.

Activate your virtual environment with `source venv/bin/activate` and deactivate it with `deactivate`.

Install the dependencies needed with `pip install -r requirements.txt`.

Everytime you add a dependency, update the requirements.txt by running `pip freeze > requirements.txt`.

Create a .env file inside the backend folder with the appropriate SECRET_KEY and other environment variables.

To apply migrations (changes) if prompted, run `python3 manage.py migrate` or `python manage.py migrate`

To run server use `python3 manage.py runserver` or `python manage.py runserver`

# Run the frontend
Install packages using
* `yarn install`
* `yarn prepare`

Then use `yarn start`

Other helpful commands for the frontend:
* Build:
    * `yarn run build`
* Lint:
    * `yarn lint`
* Lint and fix:
    * `yarn lint-fix`

# Making a pull request
Run ____ for formatting

# Important Folders and Files
## backend
urls file: contains general routes
## api
* urls file: contains specific routes
* utilities file: contains utility functions (ex. for posting to different social media)
* views file: other functions
## frontend
src folder

# Routes:
localhost:8000/api
Default route

localhost:8000/api/post-facebook [Not for use]
Makes a post to Facebook


