
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/whatsapp_clone')
  .then(() => console.log(' db is Connected!'))
  .catch((err) => console.error('db connection error', err));
  