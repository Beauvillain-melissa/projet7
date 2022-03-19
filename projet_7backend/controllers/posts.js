const express = require('express');
const mysql = require('mysql');
var config = require('../config/config.js');


exports.getPosts = (req, res, next) => {
  var connection = mysql.createConnection(config.databaseOptions);

  var sql = 'SELECT posts.*, u.nom as author_name, u.prenom as author_prenom , count(r.id) as nb_responses FROM projet7.posts join utilisateur u on u.id = posts.author left join reponses r on r.post_id = posts.id group by posts.id order by posts.created_at desc;';
  var post = [];
  connection.query(sql, post, function (err, results) {
    res.status(200).json({
      posts: results
    });
  })
};

exports.getPost = (req, res, next) => {
  var connection = mysql.createConnection(config.databaseOptions);

  var sql = 'SELECT posts.*, u.nom as author_name, u.prenom as author_prenom FROM projet7.posts join utilisateur u on u.id = posts.author WHERE posts.id = ? order by posts.created_at desc;';
  var post = [req.params.id];
  connection.query(sql, post, function (err, results) {
    res.status(200).json({
      post: results
    });
  })
};

exports.createPost = (req, res, next) => {
  var connection = mysql.createConnection(config.databaseOptions);

  connection.connect(function (err) {
    if (err) throw err;
    if (req.file) {
      var imgPath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {
      var imgPath = null;
    }
    
    var sql = 'INSERT INTO posts (title, message, author, image) VALUES (?, ?, ?, ?)';
    var post = [req.body.postTitle, req.body.postMessage, req.body.userId, imgPath];
    
    connection.query(sql, post, function (err, results) {
      if (err) throw err;
      res.status(201).json({ message: 'Post créé !' })
    });
  })
};

exports.createResponse = (req, res, next) => {
  var connection = mysql.createConnection(config.databaseOptions);

  connection.connect(function (err) {
    if (err) throw err;
    var sql = 'INSERT INTO reponses (message, post_id, author) VALUES (?, ?, ?)';
    var post = [req.body.response, req.body.postId, req.body.userId];

    connection.query(sql, post, function (err, results) {
      if (err) throw err;
      res.status(201).json({ message: 'Reponse créé !' })
    });
  })
};

exports.getResponses = (req, res, next) => {
  var connection = mysql.createConnection(config.databaseOptions);

  var post = [req.params.id];
  var sql = 'SELECT r.*, u.nom as author_name, u.prenom as author_prenom FROM reponses r join utilisateur u on u.id = R.author where r.post_id = ? order by R.created_at asc;';
  
  connection.query(sql, post, function (err, results) {
    res.status(200).json({
      responses: results
    });
  })
};