const { checkSchema } = require('express-validator');

module.exports = {
  signup: checkSchema({
    name: {
      trim: true,
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: 'Nome precisa ter pelo menos 2 caracteres',
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'E-mail inválido',
    },
    img: {},
    level: {},
    completed: {},
    exp: {},
    password: {
      isLength: {
        options: { min: 7 },
      },
      errorMessage: 'Senha precisa ter pelo menos 7 caracteres',
    },
  }),

  signin: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: 'E-mail inválido',
    },
    password: {
      isLength: {
        options: { min: 2 },
      },
      errorMessage: 'Senha precisa ter pelo menos 2 caracteres',
    },
  }),
};
