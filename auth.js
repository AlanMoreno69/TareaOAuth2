const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// Configurar las credenciales del cliente de Google OAuth2
const GOOGLE_CLIENT_ID ='520072655925-vtd810jahuiih9dtqgg2klch62su9qdu.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Configurar la estrategia de Google en Passport
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

// Serialización del usuario (guarda los datos del usuario en la sesión)
passport.serializeUser(function(user, done){
    done(null, user);
});

// Deserialización del usuario (recupera los datos del usuario de la sesión)
passport.deserializeUser(function(user, done){
    done(null, user);
});