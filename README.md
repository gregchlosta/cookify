# Cookify

> Cooking app built with the MERN stack, Redux and Styled-Components.

Here is a [Live Cookify Demo](https://cookify-greg.herokuapp.com/)

## Features

- Full user authnetication and authorization with JWT
- User profile with image upload.
- Create, read, update and delete recipe (CRUD)
- Search recipies by keyword
- Filter recipies by categories
- List user's recipes, and user's favorite recipies

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000)
npm run frontend

# Run backend (:5000)
npm run backend
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

## License

The MIT License

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND
