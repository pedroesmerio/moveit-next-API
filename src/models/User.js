const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: String,
  email: String,
  img: String,
  level: Number,
  completed: Number,
  exp: Number,
  position: Number,
  passwordHash: String,
  token: String,
});

const modelName = 'User';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, modelSchema);
}
