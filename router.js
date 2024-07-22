const router = require('express').Router();
const homeControler = require('./src/controllers/homeControlers')
const allPostControlers = require('./src/controllers/postControler')
const userControler = require('./src/controllers/userControl')

router.use(homeControler);
router.use('/posts', allPostControlers);
router.use('/users', userControler);

router.get('*', (req,res) => {
    res.redirect('/404')
})

module.exports = router