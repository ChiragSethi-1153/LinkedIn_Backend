const { Posts } = require("../models/posts");
const { Reactions } = require("../models/reactions");
const axios= require('axios')

exports.savePostReaction = async (req) => {
  try {
    const userId = req.id;
    const { postId } = req.params;
    const { emoji } = req.body;
    const existingReaction = await Reactions.findOne({
      $and: [{ userId: userId }, { postId: postId }],
    });
    console.log(existingReaction?.emoji);

    if (existingReaction) {
      const newReaction = await Reactions.findOneAndUpdate(
        { $and: [{ userId: userId }, { postId: postId }] },
        { emoji: emoji },
        { new: true }
      );
      // console.log(newReaction, "hbiu");
      return newReaction;
    } else {
      const reaction = await new Reactions({
        postId: postId,
        userId,
        emoji,
      }).populate('userId', "name headline");
      await reaction.save();
        console.log(reaction)

        const post = await Posts.find({_id: postId})
        // console.log(post)

        const reciever = post.map((i) => i?.userId)
        // console.log(reciever)

        const notificationData = {sender: reaction.userId, reciever: reciever, type: 'reaction'}
        console.log(notificationData)

        const commentNotification = await axios.post(`${process.env.NOTIFICATIONS_URL}/notification`, notificationData)
        console.log(commentNotification.data)




      return reaction;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getPostReactions = async (req) => {
  try {
    const userId = req.id;
    const { postId } = req.params;
    const totalReactions = await Reactions.countDocuments({ postId: postId });

    const currReaction = await Reactions.find({
      $and: [{ postId: postId }, { userId: userId }],
    });
    // console.log(currReaction);
    const reactions = { currReaction: currReaction, totalReactions };
    // console.log(reactions);

    return reactions;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.saveCommentReaction = async (req) => {
  try {
    const userId = req.id;
    const { commentId } = req.params;
    const { emoji } = req.body;

    const existingReaction = await Reactions.findOne({
      $and: [{ userId: userId }, { commentId: commentId }],
    });
    // console.log(existingReaction?.emoji);

    if (existingReaction) {
      const newReaction = await Reactions.updateOne(
        { $and: [{ userId: userId }, { commentId: commentId }] },
        { emoji: emoji }
      );
      // console.log(newReaction);
      return newReaction;
    } else {
      const reaction = await new Reactions({
        commentId: commentId,
        userId,
        emoji,
      });
      await reaction.save();
      return reaction;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.getCommentReactions = async (req) => {
  try {
    const { commentId } = req.params;
    const reactions = await Reactions.countDocuments({ commentId: commentId });
    return reactions;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.updateReaction = async (req) => {
  try {
    const userId = req.id;
    const { reactionId } = req.params;
    const { emoji } = req.body;
    const currentUserId = await Reactions.findById(reactionId);

    if (userId === currentUserId.userId) {
      const edit = await Reactions.findByIdAndUpdate(
        reactionId,
        { emoji },
        { new: true }
      );
      return edit;
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.removeReaction = async (req) => {
  try {
    const { postId } = req.params;
    const userId = req.id;
    const remove = await Reactions.findOneAndDelete({
      $and: [{ postId: postId }, { userId: userId }],
    });
    return remove;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.deleteReactions = async (req) => {
  try {
    const { commentId } = req.params;
    const del = await Reactions.find({ commentId: commentId });
    return del;
  } catch (err) {
    console.log(err);
    return err;
  }
};
