export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validatedBody = validated;

      next();
    } catch (error) {
      res.status(400).json({ message: error.errors });
    }
  };
};
