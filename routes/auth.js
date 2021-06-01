var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("868449691994-qs07uckaki4h1r630hphiliaua6ucuq0.apps.googleusercontent.com")

router.post("/auth/google", async (req, res) => {
  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "868449691994-qs07uckaki4h1r630hphiliaua6ucuq0.apps.googleusercontent.com"
  });

  const { sub, name, email } = ticket.getPayload();    

  var user = await User.findOne(
    { id: sub }, { name, email }
  )

  if(!user) {
    user = await new User({
      id: sub,
      email: email,
      name: name
    }).save()
  }

  req.session.userId = user.id

  res.status(201)
  res.json(user)
})

router.delete("/auth/google/logout", async(req, res) => {
  await req.session.destroy()
  res.status(200)
  res.json({
    message: "Logged out successfully"
  })
})

module.exports = router