var express = require('express');
var router = express.Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("868449691994-qs07uckaki4h1r630hphiliaua6ucuq0.apps.googleusercontent.com")

router.post("/auth/google", async (req, res) => {
  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "868449691994-qs07uckaki4h1r630hphiliaua6ucuq0.apps.googleusercontent.com"
  });

  const { sub, name, email } = ticket.getPayload();    

  console.log(name)
  console.log(email)
  console.log(sub)


  // const user = await db.user.upsert({ 
  //     where: { email: email },
  //     update: { name, picture },
  //     create: { name, email, picture }
  // })
  res.status(201)
  // res.json(user)
})

module.exports = router