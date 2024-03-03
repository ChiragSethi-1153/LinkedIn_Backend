const { Posts } = require("../models/posts");

exports.createPosts = async (req) => {
  try {
    const userId = req.id;
    const { title, body } = req.body;
    // console.log(req.body)
    let newImages = [];
    if (req.files.images !== null) {
      newImages = req.files.images.map((i) => {
        return i.path;
      });
      console.log(newImages, "ghvugyiv");
    }

    const post = new Posts({
      userId,
      title,
      body,
      images: newImages,
    });
    // console.log(userId, title, body, newImages, "guy7gbh");
    await post.save();
    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.getAllPost = async (req) => {
  try {
    console.log(req.query.createdAt);
    let time = req.query.createdAt;
    // if (req.query && req.query.createdAt) {
    //   time = new Date(req.query.createdAt); 
    // }

    if (time) {
      const posts = await Posts.find({ createdAt: { $lt: time } })
        .populate("userId", "name headline company")
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
      console.log(posts);
      return posts;
    } 
    else {
      const posts = await Posts.find()
        .populate("userId", "name headline company")
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
      console.log(posts);
      return posts;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Need to be updated
exports.getPost = async (req) => {
  try {
    const { userId } = req.body;

    const post = Posts.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(10);
    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// verification needed
exports.updatePost = async (req) => {
  try {
    const { userId } = req.id;
    const { postId } = req.params;
    const { body, title } = req.body;
    // console.log(req.body)
    const currentUserId = await Posts.findById(postId);
    if (currentUserId.userId === userId) {
      const updated = await Posts.findByIdAndUpdate(
        postId,
        { title, body },
        { new: true }
      );
      console.log(updated);
      return updated;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.deletePosts = async (req) => {
  try {
    const { postId } = req.params;
    const { userId } = req.id;
    // console.log(req.body)
    const currentUserId = await Posts.findById(postId);
    if (currentUserId.userId == userId) {
      const deleted = await Posts.findByIdAndDelete(postId);
      return deleted;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
