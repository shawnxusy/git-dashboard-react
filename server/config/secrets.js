/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

module.exports = {
  // Find the appropriate database to connect to, default to localhost if not found.
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/ReactWebpackNode',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  google: {
    clientID: process.env.GOOGLE_CLIENTID || '50893858224-82gv8n54h1ad47clg2q28k96ddnsnlr2.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'czwNOGGeZzEkp1D0abECNPqC',
    callbackURL: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID || '1ed54025f0ba1581b43f',
    clientSecret: process.env.GITHUB_SECRET || '5e9e362d0f19df49ce33637a925b6af26d7b1ecd',
    callbackURL: process.env.GITHUB_CALLBACK || "http://localhost:3000/auth/github/callback"
  }
};
