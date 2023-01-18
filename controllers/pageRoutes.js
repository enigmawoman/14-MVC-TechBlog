const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        { model: User,},
        { model: Comment } 
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log('Error', err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
       include: [
         { model: Comment,
         include: { 
           model: User,
           attributes: ['name'], 
         }, 
       },
       { model: User,
       attributes: { exclude: ['password']}}
       ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id/edit', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
       include: [
      //    { model: Comment,
      //    include: { 
      //      model: User,
      //      attributes: ['name'], 
      //    }, 
      //  },
       { model: User,
       attributes: { exclude: ['password']}}
       ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    res.render('edit-post', {
      ...post,
      logged_in: req.session.logged_in,
      isOwner: req.session.user_id === post.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  if (req.session.logged_out) {
    res.redirect('/login');
  } else {   
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
}});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
