# Creating and Hosting an Express App on Google App Engine (Flexible Environment)


## Configure Google Cloud Platform Console
1. Install Node.js

Easiest is [via a package manager](https://nodejs.org/en/download/package-manager)

2. Install the Google Cloud SDK

[Follow OS Specific Install Guide](https://cloud.google.com/sdk/docs/quickstarts)

3. Create a Project

4. Enable billing


## Express App

1. Initialize app
```
npm init
```

2. Add start script to your package.json
```
"scripts": {
	"start" : "node index.js"
}
```

3. Install Express
```
npm i express
```

4. Create index.js file
```
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Duke!');
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app! We are listening on port ${port}`);
});
```

## Run App

1. Start the command in your terminal:
```
npm start
```

2. Visit the launched web app at [localhost:8080](http://localhost:8080). Make sure you see your ```Hello``` message

### Deploy App
1. app.yaml files tell Google App Engine how to configure your app
```
runtime: nodejs
env: flex
```

2. Run the command once you're ready!
```
gcloud app deploy
```

3. Visit your project url! ```http://PROJECT_ID.appspot.com``` to see the same message as before!

## Custom Domain

1. If this is a hackathon... you likely get a free domain.

[GCP Custom Domain Documentation](https://cloud.google.com/appengine/docs/flexible/nodejs/mapping-custom-domains)

---


# Extending the Web App
Now that it is all up and running... let us make it actually look good.

## Using PUG as a templating engine
Pug offers "offers templates that can be conditionally rendered, hydrated with data available in the server, and composed using inheritance to create sleek pages."

1. Install ```pug``` as a dependency.
```
npm i pug
```

2. Create a new directory named ```views```
```
mkdir views
```

3. In ```views``` create a ```layout.pug``` file
```
block variables
doctype html
html
  head
    meta(charset="utf-8")
    link(rel="shortcut icon", href="/favicon.ico")
    meta(name="viewport", content="width=device-width, initial-scale=1, shrink-to-fit=no")
    meta(name="theme-color", content="#000000")
    title #{title} | HACKDUKE
  body
    div#root
      block layout-content
```

4. Create an ```index.pug``` file also in ```views```

This file will extend layout.

```
extends layout

block layout-content
  div.View
    h1.Banner HACKDUKE DEMO
    div.Message
      div.Title
        h3 Making the Best
        h1 Demos for Devs
      span.Details Access the HACKDUKE Team Portal
    div.NavButtons
      if isAuthenticated
        a(href="/user")
          div.NavButton Just dive in!
      else
        a(href="/login")
          div.NavButton Log in
```

5. Next, update ```index.js``` to use the pug templates

Add the following two lines before any route definitions:

```
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
```

Also, make sure you require ```path``` at the top of your file:
```
const path = require('path');
```

Change the render method to pass in ```title``` as a value, and ```index``` as the template:
```
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
```

Quick notes...

```res.render(view)``` method takes a string argument, view, that represents the file path of the view file to render. It renders the file and sends the rendered HTML as a string to the client.

```res.render()``` takes in a second, optional parameter, locals, which is an object that lets you pass data from the controller to the template. Its object properties define local variables that can be accessed by the template. This is done above with ```{ title: "Home" }```


# Styling your web app

You need to place styling materials into a ```public``` directory. All stylesheets and images belong here.

1. Create a public directory.
```
mkdir public
```

2. Modify ```index.js``` to use your static public pages.
```
app.use(express.static(path.join(__dirname, "public")));
```

3. Create a ```style.css``` file in your new directory
```
body {
  background: aqua;
}

:root {
  --logo-font: "Share Tech Mono", monospace;
  --header-font: "Raleway", sans-serif;
  --core-font: "Merriweather Sans", sans-serif;

  --primary: #ffffff;
  --secondary: #2a3747;

  --highlight: #fa4141;

  --ui-shawdow: 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 5px 0 rgba(0, 0, 0, 0.06),
    0 1px 10px 0 rgba(0, 0, 0, 0.08);
  fill: rgba(0, 0, 0, 0.54);
  --ui-shawdow-border: 1px solid rgba(0, 0, 0, 0.14);
}
```

4. Modify ```layout.pug``` to pull styles from your new stylesheet
```
block variables
doctype html
html
  head
    meta(charset="utf-8")
    link(rel="shortcut icon", href="/favicon.ico")
    meta(name="viewport", content="width=device-width, initial-scale=1, shrink-to-fit=no")
    meta(name="theme-color", content="#000000")
    title #{title} | HACKDUKE DEMO
    link(rel="stylesheet" href="/style.css")
  body
    div#root
      block layout-content
```

5. Adding pictures is easy!
- Visit unsplash and choose a picture
- Save it as ```my-photo.jpg``` in the public directory

Then open ```public/styles.css``` and append the following:
```
.WelcomeView {
  background: url("my-photo.jpg") left bottom;
  background-size: cover;
}
```

Then, modify ```views/index.pug```
```
extends layout

block layout-content
  div.View.WelcomeView
  // rest of the template...
```
