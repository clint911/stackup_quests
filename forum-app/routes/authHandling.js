const router = require('express').Router();
const authController = require('../controllers/authController');
const { validateInput, sanitizeAuthInput } = require('../middleware/inputValidation');

// Views
router.get('/register', (req, res) => authController.registerView(req, res));
router.get('/login', (req, res) => authController.loginView(req, res));

router.post('/register', validateInput, sanitizeAuthInput, (req, res) => authController.register(req, res));
router.post('/login', validateInput, sanitizeAuthInput, (req, res) => authController.login(req, res));

module.exports = router;
