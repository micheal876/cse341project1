const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
     //#swagger.tags=['Users']
    res.send('Hello World');
});

//router.get('/', (req, res)  => {res.send ('Hello World');});

router.use('/users', require('./users'));

module.exports =router;
