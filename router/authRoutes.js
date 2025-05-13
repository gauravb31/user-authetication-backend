const router = require('express').Router();
const { signup, login } = require('../controller/authControl');
const { signupvalidation, loginvalidation, authenticate } = require('../middleware/authMiddleware');

router.post('/signup', signupvalidation, signup);
router.post('/login', loginvalidation, login);

router.get('/test',authenticate, (req, res) => {
    res.send("Hello from test route");
});



module.exports = router;