const express = require('express');
const mysql = require('mysql');

exports.getPosts = (req, res, next) => {
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });

  var sql = 'SELECT posts.*, u.nom as author_name, u.prenom as author_prenom FROM projet7.posts join utilisateur u on u.id = posts.author order by posts.created_at desc;';
  var post = [];
  db.query(sql, post, function (err, results) {
    res.status(200).json({
      posts: results
    });
  })
};

exports.createPost = (req, res, next) => {
  
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });
  db.connect(function (err) {
    if (err) throw err;

    var sql = 'INSERT INTO posts (title, message, author) VALUES (?, ?, ?)';
    var post = [req.body.post.title, req.body.post.message, req.body.userId];

    db.query(sql, post, function (err, results) {
      if (err) throw err;
      res.status(201).json({ message: 'Post créé !' })
    });
  })
};

exports.createResponse = (req, res, next) => {
  
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });
  db.connect(function (err) {
    if (err) throw err;

    var sql = 'INSERT INTO reponses (message, post_id, author) VALUES (?, ?, ?)';
    var post = [req.body.response, req.body.postId, req.body.userId];

    db.query(sql, post, function (err, results) {
      if (err) throw err;
      res.status(201).json({ message: 'Reponse créé !' })
    });
  })
};

exports.getResponses = (req, res, next) => {
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });

  var sql = 'SELECT r.*, u.nom as author_name, u.prenom as author_prenom FROM reponses r join utilisateur u on u.id = R.author order by R.created_at asc;';
  var post = [];
  db.query(sql, post, function (err, results) {
    res.status(200).json({
      responses: results
    });
  })
};