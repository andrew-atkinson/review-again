'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

var Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
    get: function() {
      return this.getDataValue('tags').join(', ');
    }
  }
}, {
  hooks: {
    beforeUpdate: function(article) {
      article.version++;
    }
  },
  getterMethods: {
    snippet: function() {
      return this.content ? this.getDataValue('content').slice(0, 23) + '...' : '';
    }
  },
  instanceMethods: {
    truncate: function(num) {
      return this.content ? this.setDataValue('content', this.content.slice(0, num)) : '';
    },
  },
  classMethods: {
    findByTitle: function(articleTitle) {
      return Article.findOne({
        where: {
          title: articleTitle
        }
      });
    }
  }
});

Article.belongsTo(User, { as: 'author' });

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
