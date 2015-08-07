var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Videoplattform' });
});


/* GET videoMap page. */
router.get('/videoMap', function(req, res, next) {
  res.render('videoMap', { title: 'Videoplattform | Karte' });
});

module.exports = router;
