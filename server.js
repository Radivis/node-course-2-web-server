const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Logger middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// Maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'We are broked',
//     welcomeMessage: 'Thank you for having chosen the WRONG pill!'
//   });
// });

// Static rendering middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Michael',
//     likes: [
//       'Programming',
//       'Biking',
//       'Horses',
//       'Writing'
//     ]
//   });
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Thank you for having chosen the red pill!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
  });
});

// /bad - send back json with errorMessage

app.get('/bad', (req, res) => {
  res.send({
    errorCode: 404,
    errorMessage: 'Bad Request'
  });
});

app.listen(port, () => {
  console.log(`Express.js HTTP server is up on port ${port}`);
});
