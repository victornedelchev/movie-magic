const router = require('express').Router();
const mongoose = require('mongoose');
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try{
        await authService.register(userData);

        res.redirect('/auth/login');
    } catch(err) {
        let message = '';

        if (err instanceof mongoose.MongooseError) {
            message = Object.values(err.errors).at(0).message;
        } else if (err instanceof Error) {
            message = err.message;
        }

        res.render('auth/register', { error: message });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

module.exports = router;