const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
function initialize(passport, getUserByEmail, getUserById){
  //done function called when done authenticating user
  const authenticateUser = async(email, password, done) => {
    const user = getUserByEmail(email)
    if(user === null){
      return done(null, false, {message: "Email not found!"})
    }
    try {
      //check the password
        if(await bcrypt.compare(password, user.password)){
          return done(null, user)
        }else {
          return done(null, false, {message: "Password incorrect"})
        }

      } catch(e) {
        return done(e)
      }

  }
  passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser)) //authenticateUser is called to confirm the user
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))

}
module.exports = initialize