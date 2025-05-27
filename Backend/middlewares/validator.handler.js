function validateData(schema) {
  return function (req, res, next) {
    const data = req.body;
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}

module.exports = { validateData };
