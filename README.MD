## Author: `Ozumah Ebenezer`

# Step by Step Instructions on How to Deploy Nodejs Application on Heroku Using CLI

- ## Heroku account and heroku cli

- ## Script Setup

### `Add script command dev : "nodemon app.js" (with the main  entry point for the resulting app) and start : "node <prod main entry point>"`

### `For this project i will be using start to "node ./dist/app.js" because dist is my build folder`

<br/>

- ## Setup node version in package.json

### `Check the node version on your computer`

```
- "engines": {"node": "16.x"}
```

<br/>

- ## Create a Procfile file on your root folder "web: node app.js"

<br/>

### `Add "web: node <prod main entry point>" (with the main  entry point for the resulting app)`

<br/>

```
web: node ./dist/app.js
```

- ## Remove existing git repo and Run the following command on your Terminal

  - git init
  - git add .
  - git commit -m "initial commit"
  - heroku login
  - heroku create "App Name"
  - git remote -v
  - setup env vars in GUI
  - git push heroku master/main
