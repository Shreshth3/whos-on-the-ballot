const express = require('express');
const path = require('path');
const passport = require('passport');
const passportSetup = require('./passport-config');
const officialsController = require('./officialsController.js');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Respond with index.html file when user opens the page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// Handle route to /election using electionController middleware
app.post('/officials', officialsController.getOfficials, (req, res) => {
  res.status(200).json(res.locals.officialsData);
});

// Initial OAuth route
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// Route that Google redirects to
app.get(
  '/auth/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    res.send('oauth complete');
  }
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
  console.log(`Global error handler received this error: ${err}`);
  res.status(500).send('Internal server error.');
});
