const { z } = require('zod');

const userSchemaZod = z.object({
  firstname: z.string()
    .trim()
    .min(2, { message: 'First name must be at least 2 characters long.' })
    .max(100, { message: 'First name must be less than 100 characters.' })
    .refine(value => /^[a-zA-Z\s]*$/.test(value), {
      message: 'First name must only contain letters and spaces.',
    })
    .optional(),
  
  lastname: z.string()
    .trim()
    .min(2, { message: 'Last name must be at least 2 characters long.' })
    .max(100, { message: 'Last name must be less than 100 characters.' })
    .refine(value => /^[a-zA-Z\s]*$/.test(value), {
      message: 'Last name must only contain letters and spaces.',
    })
    .optional(),
  
  email: z.string()
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email address.' })
    .nonempty({ message: 'Email is required.' }),
  
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .nonempty({ message: 'Password is required.' }),
});

const validateUserDataZod = (req, res, next) => {
  const validationResult = userSchemaZod.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).send(validationResult.error.issues.map(issue => issue.message).join(', '));
  } else {
    next();
  }
};

module.exports = validateUserDataZod;
