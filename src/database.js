module.exports = ()=>{

  const mongoose = require('mongoose');
  const secrets = require("../secrets.json")
  const URI = secrets['mongoose-uri']
  const settings = secrets['mongoose-settings']
  
  return mongoose.connect(URI, settings)

}