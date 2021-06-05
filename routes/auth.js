var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("868449691994-qs07uckaki4h1r630hphiliaua6ucuq0.apps.googleusercontent.com")

// API endpoints generated for the Authentication controller. The functions within this controller
// allows you to authenticate a user with its Google credentials, and finish the session for a given 
// user.

// Authenticate a user to use the application with their Google credentials.
router.post("/auth/google", async (req, res) => {
  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "868449691994-qs07uckaki4h1r630hphiliaua6ucuq0.apps.googleusercontent.com"
  });

  // Get the basic data provided by Google for the requested user.
  const { sub, name, email } = ticket.getPayload();    

  // If the user already exists in the database, retrieve their information.
  var user = await User.findOne(
    { id: sub }, { name, email }
  )
  
  // If the user does not exist in the database, create it.
  if(!user) {
    user = await new User({
      id: sub,
      email: email,
      name: name
    }).save()
  }

  // Send the retrieved data to the client.
  req.session.userId = user.id
  res.status(201)
  res.json(user)
})

// Finish the session for a given user.
router.delete("/auth/google/logout", async(req, res) => {
  await req.session.destroy()
  res.status(200)
  res.json({
    message: "Logged out successfully"
  })
})

module.exports = router