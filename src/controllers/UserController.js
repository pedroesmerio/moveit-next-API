const mongoose = require('mongoose');
const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Rank = require('../models/Rank');

module.exports = {
  info: async (req, res) => {
    let token = req.query.token;
    const user = await User.findOne(token);

    const name = await User.findOne(user.name);
    const email = await User.findOne(user.email);
    //const img = await User.findOne(user.img);
    let level = await User.findOne(user.level);
    let completed = await User.findOne(user.completed);
    let exp = await User.findOne(user.exp);
    let position = await Rank.findById(user.position);

    res.json({
      name: user.name,
      email: user.email,
      //img: user.img,
      level: user.level,
      completed: user.completed,
      exp: user.exp,
      position: rank.position,
    });
  },

  editAction: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    let updates = {};

    if (data.name) {
      updates.name = data.name;
    }

    if (data.email) {
      const emailCheck = await User.findOne({ email: data.email });
      if (emailCheck) {
        res.json({ error: 'E-mail já existente!' });
        return;
      }
      updates.email = data.email;
    }

    if (data.state) {
      if (mongoose.Types.ObjectId.isValid(data.state)) {
        const stateCheck = await State.findById(data.state);
        if (!stateCheck) {
          res.json({ error: 'Estado não existe!' });
          return;
        }
        updates.state = data.state;
      } else {
        res.json({ error: 'Código de Estado inválido!' });
        return;
      }
    }

    if (data.password) {
      updates.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await User.findOneAndUpdate({ token: data.token }, { $set: updates });

    res.json({ itWorks: true });
  },
};
