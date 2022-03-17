const express = require('express');
const mysql = require('mysql');

exports.getPosts = (req, res, next) => {
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });

  var sql = 'SELECT posts.*, u.nom as author_name, u.prenom as author_prenom , count(r.id) as nb_responses FROM projet7.posts join utilisateur u on u.id = posts.author left join reponses r on r.post_id = posts.id group by r.post_id order by posts.created_at desc;';
  var post = [];
  db.query(sql, post, function (err, results) {
    res.status(200).json({
      posts: results
    });
  })
};

exports.getPost = (req, res, next) => {
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });

  var sql = 'SELECT posts.*, u.nom as author_name, u.prenom as author_prenom FROM projet7.posts join utilisateur u on u.id = posts.author WHERE posts.id = ? order by posts.created_at desc;';
  var post = [req.params.id];
  db.query(sql, post, function (err, results) {
    res.status(200).json({
      post: results
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
    var imgPath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    var sql = 'INSERT INTO posts (title, message, author, image) VALUES (?, ?, ?, ?)';
    var post = [req.body.postTitle, req.body.postMessage, req.body.userId, imgPath];
    
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
  var post = [req.params.id];
  var sql = 'SELECT r.*, u.nom as author_name, u.prenom as author_prenom FROM reponses r join utilisateur u on u.id = R.author where r.post_id = ? order by R.created_at asc;';
  
  db.query(sql, post, function (err, results) {
    res.status(200).json({
      responses: results
    });
  })
};