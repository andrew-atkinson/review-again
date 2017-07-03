var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

router.get('/articles', (req, res, next) => {
  //ET: Friendly reminder that in this context, .findAll() doesn't actually need to see parameters!
  Article.findAll({})
    .then(articles => res.status(200).json(articles))
    .catch(next);
});

router.get('/articles/:id', (req, res, next) => {
  Article.findOne({ where: { id: req.params.id } })
    .then(article => {
      if (article) {
        res.status(200).json(article)
      } else { res.sendStatus(404) }
    })
    .catch(next);
});

router.post('/articles', (req, res, next) => {
  Article.create({ title: req.body.title, content: req.body.content })
    .then(article => {
      res.status(200)
         .json({
           message: 'Created successfully',
           article: article
         })
    })
    .catch(next);
});

router.put('/articles/:id', (req, res, next) => {
  //ET: See my note in our Learning Team's Slack channel on how to achieve this with just one query to the database. Here you have two.
  Article.update({ title: req.body.title }, { where: { id: req.params.id } })
    .then(() => Article.findOne({ where: { id: req.params.id } }))
    .then(article => {
      res.json({
        message: 'Updated successfully',
        article: article
      })
    })
    .catch(next);
});

//ET: This isn't necessary here, as you're provided an error handler in app.js. Let's discuss error handling later this week.
router.use((err, req, res, next) => next(err));

module.exports = router;
