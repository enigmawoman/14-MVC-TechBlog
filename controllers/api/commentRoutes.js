const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a comment and require user logged in(withAuth)
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
// update a comment and require user logged in(withAuth)
  router.put('/:id', withAuth, async (req, res) => {
    try {
  
      const updateData = {
        user_comment: req.body.user_comment,
      }
      console.log(updateData)
  
      const commentData = await Comment.update(updateData, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
      console.log("Post successfully updated")
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // delete a comment and require user logged in(withAuth)
  router.delete("/:id", withAuth, async (req, res) => {

    console.log(req.params.id)
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;