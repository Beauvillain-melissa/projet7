const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/posts', auth, postsCtrl.getPosts );
router.get('/post/:id', auth, postsCtrl.getPost );
router.get('/response/:id', auth, postsCtrl.getResponses );
router.post('/post', multer, postsCtrl.createPost);
router.post('/response', postsCtrl.createResponse);


module.exports = router;