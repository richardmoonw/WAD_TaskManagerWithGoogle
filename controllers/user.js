const User = require('../models/user');

exports.findOrCreate = async (request, response) => {

  const { sub, email, name } = request.user;

  const user = await User.findOne(
    { id: sub }, { name, email }
  )

  if (user) {
    response.json(user)
  } else {
    const newUser = await new User({
      id: sub,
      email: email,
      name: name
    }).save()
    response.json(newUser)
  }
}