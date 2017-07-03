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

router.use((err, req, res, next) => next(err));

module.exports = router;
