const router = require('express').Router();
const userService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    await userService.register(userData);

    res.redirect('/auth/login');
})

module.exports = router;