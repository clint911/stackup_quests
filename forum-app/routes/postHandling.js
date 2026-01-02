const router = require('express').Router();
const postController = require('../controllers/postController');
const { validateInput, sanitizePostInput } = require('../middleware/inputValidation');

// Views
router.post('/', validateInput, sanitizePostInput, (req, res) => postController.create_post(req, res));
router.post('/comment/id/:post_id', validateInput, sanitizePostInput, (req, res) => postController.submit_comment(req, res));

module.exports = router;
