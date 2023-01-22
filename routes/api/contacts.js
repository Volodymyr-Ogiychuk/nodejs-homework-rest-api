const express = require('express')
const {
  getContacts,
  getById,
  updateContactById,
  createContact,
  deleteContactById,
  setFavorite,
} = require('../../controllers/contactsController');
const { authMiddleware } = require("../../middlwares/authorizationMiddlware");

const Joi = require("joi")

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  phone: Joi.string(),
}).or("name", "email", "phone");

const updateFavoriteSchema = Joi.object({
  favorete: Joi.boolean().required,
});

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  return next();
};

const router = express.Router()

router.get('/', authMiddleware, getContacts);
router.get('/:contactId', getById);
router.post('/', validator(addContactSchema), authMiddleware, createContact);
router.delete('/:contactId', authMiddleware, deleteContactById);
router.put("/:contactId", validator(updateContactSchema), updateContactById);
router.patch("/:contactId/favorite",
  validator(updateFavoriteSchema), authMiddleware, 
  setFavorite
);

module.exports = router;
