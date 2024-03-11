const Connections = require("../models/connections");
const axios = require('axios');
const { Posts } = require("../models/posts");

exports.createPosts = async (req) => {
  try {
    // console.log(req)
    const userId = req.id;
    const { title, body } = req.body;
    // console.log(req.body)
    let newImages = [];
    if (req.files !== null && req.files.images && req.files.images.length > 0) {
      newImages =  req.files.images.map((i) => {
        return i.path;
      });
      console.log(newImages, "ghvugyiv");
    }

    const post = await new Posts({
      userId,
      title,
      body,
      images: newImages,
    }).populate('userId', "name headline company");
    // console.log(post);
    (await post.save()).populate('userId', 'name headline company');

    const connectionsTo = await Connections.find({ status: 'accepted', connectionTo: userId })
      // .populate('connectionBy', 'name headline company');

    const connectionsBy = await Connections.find({ status: 'accepted', connectionBy: userId })
      // .populate('connectionTo', 'name headline company');

    let connections = [];
    if (connectionsTo.length > 0) {
      connections = [...connections, ...connectionsTo.map(c => ( c.connectionBy ))];
    }

    if (connectionsBy.length > 0) {
      connections = [...connections, ...connectionsBy.map(c => ( c.connectionTo ))];
    }



    console.log(connections)
    const notificationData = {sender: post.userId, reciever: connections, type: 'post'}
    // console.log(notificationData)
    const postNotification = await axios.post(`${process.env.NOTIFICATIONS_URL}/notifyPost`, notificationData)
    // console.log(postNotification.data)

    return post;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.getAllPost = async (req) => {
  try {
    // console.log(req.query.createdAt);
    let time 
    if (req.query && req.query.createdAt) {
      time = new Date(req.query.createdAt) || new Date()
      console.log(time)
    }

    if (time) {
      const posts = await Posts.find({ createdAt: { $lt: time } })
        .populate("userId", "name headline company")
        .sort({ createdAt: -1 })
        .limit(2)
        .exec();
      // console.log(posts);
      return posts;
    } 
    else {
      const posts = await Posts.find()
        .populate("userId", "name headline company")
        .sort({ createdAt: -1 })
        .limit(2)
        .exec();
      // console.log(posts);
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
      // console.log(updated);
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
