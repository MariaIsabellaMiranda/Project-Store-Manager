const productsSchema = require('./productsSchema');

const nameValidSchema = (name) => {
  const { error } = productsSchema.nameProductSchema.validate({ name });

  if (error) {
    const [code, message] = error.message.split('|');

    return { code, message };
  }
  return false;
};

module.exports = { nameValidSchema };
