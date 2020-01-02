var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json({
    code: 0,
    message: '',
    data: 'hiiii'
  });
});

module.exports = router;
