//require sequelise and the models
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
//require the seed data for users, posts anc comments
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
//bulk create user data and encrypt passwords in database
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
//array for the new posts with randomised user data associaietd
  const posts = [];
// for each post in the post seeds, assign a random user id
  for (const post of postData) {
   const newPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    //push these new post datasets into the posts array
    posts.push(newPost);
  }
// for each comment in the comment seeds, assign a random user id and post id
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
