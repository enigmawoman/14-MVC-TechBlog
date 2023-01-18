const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/'. withAuth, async (req, res) => {

// })

router.post('/', withAuth, async (req, res) => {

  newData = {
    post_title: req.body.post_title,
    post_body: req.body.post_body,
    user_id: req.session.user_id,
  };
  try {
    const newPost = await Post.create(newData);

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {

    const updateData = {
      post_title: req.body.post_title,
      post_body: req.body.post_body,
    }
    console.log(updateData)

    const postData = await Post.update(updateData, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
    console.log("Post successfully updated")
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
