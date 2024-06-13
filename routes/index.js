var express = require('express');
var router = express.Router();

router.post('/', async function (req, res, next) {

  try {

    res.redirect("API IS WORKING")

    res.status(201).json({
      message: "API"
    })

  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

module.exports = router;
