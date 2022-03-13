const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');


exports.signup = (req, res, next) => {
  
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });
  bcrypt.hash(req.body.mdp, 10)
    .then(hash => {
      db.connect(function (err) {
        if (err) throw err;

        var sql = 'INSERT INTO utilisateur (nom, prenom, email, date_de_naissance, mot_de_passe) VALUES (?, ?, ?, ?, ?)';
        var post = [req.body.name, req.body.prenom, req.body.email, req.body.date, hash];

        db.query(sql, post, function (err, results) {
          if (err) throw err;
          res.status(201).json({ message: 'Utilisateur créé !' })
        });
      })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  const db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "metedor50"
  });
  var sql = 'SELECT id, nom, prenom, email, date_de_naissance, mot_de_passe FROM utilisateur WHERE email=?;';
  var post = [req.body.email];
  db.query(sql, post, function (err, results) {
    if (!results || results.length == 0) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    var userFind = results[0];
    bcrypt.compare(req.body.password, userFind.mot_de_passe)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: userFind._id,
          token: jwt.sign(
            { userId: results._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          ),
          user: userFind
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
};