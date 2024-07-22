const router = require('express').Router();
const userServices = require('../services/userService');
const { errorMsg } = require('../utils/errorHendling');

//REGISTER
router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {
        await userServices.register({ firstName, lastName, email, password, repeatPassword });

        res.redirect('/users/login');
    } catch (error) {
        const errorMessages = errorMsg(error);
        res.status(404).render('user/register', { errorMessages });
    }
});

//LOGIN
router.get('/login', (req, res) => {
    res.render('user/login')
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const token = await userServices.login(email, password);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        const errorMessages = errorMsg(error);
        res.status(404).render('user/login', { errorMessages })
    }
});

//LOGOUT
router.get('/logout', async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;