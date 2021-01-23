const mongoose = require('mongoose');

const customCommandSchema = new mongoose.Schema({ 
   cmd: 'string', // command name
   rsp: 'string', // response,
   guild: 'string' // Server that the custom command works in
 });
const CustomCommand = mongoose.model('custom-commands', customCommandSchema);

module.exports = CustomCommand