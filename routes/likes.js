const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares');
const LoginController = require('../controllers/likes.controllers.js');
const loginController = new LoginController();

router.get('/like', authMiddleware, loginController.findAllPostLike);
router.put('/:postId/like', authMiddleware, loginController.likePost);

// // 좋아요 게시글 조회
// router.get('/like', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user;

//     const posts = await Posts.findAll({
//       attributes: [
//         'postId',
//         'userId',
//         'title',
//         'createdAt',
//         'updatedAt',
//         [sequelize.fn('count', sequelize.col('Likes.postId')), 'likes'],
//       ],
//       include: [{ model: Likes, attributes: [], required: false }],
//       group: ['postId'],
//       where: {
//         postId: {
//           [Op.in]: sequelize.literal(
//             `(select postId from Likes where UserId =${userId})`
//           ),
//         },
//       },
//       raw: true,
//     });

//     const formatedPost = posts.map((post) => {
//       return {
//         postId: post.postId,
//         userId: post.userId,
//         nickname: post['User.nickname'],
//         title: post.title,
//         createdAt: post.createdAt,
//         updatedAt: post.updatedAt,
//         likes: post.likes,
//       };
//     });
//     return res.status(200).json({ posts: formatedPost });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '좋아요 게시글 조회에 실패하였습니다.' });
//   }
// });

// // 게시글 좋아요
// router.put('/:postId/like', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user;
//     const { postId } = req.params;
//     const post = Posts.findOne({ where: { PostId: postId } });

//     //! 게시글이 존재하지 않는 경우
//     if (!post) {
//       return res
//         .status(404)
//         .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//     }

//     const like = await Likes.findOne({
//       where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
//     });
//     //! 게시글 좋아요 등록 성공 or 등록 실패
//     if (!like) {
//       await Likes.create({ UserId: userId, PostId: postId });
//       return res
//         .status(200)
//         .json({ message: '게시글의 좋아요를 등록하였습니다.' });
//     } else {
//       await Likes.destroy({
//         where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
//       });
//       return res
//         .status(200)
//         .json({ message: '게시글의 좋아요를 취소하였습니다.' });
//     }
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
//   }
// });

module.exports = router;

// //todo: 정민님 코드
// router.get('/likes', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user;

//     const postIdArray = await Likes.findAll({
//       attributes: ['PostId'],
//       where: {
//         UserId: userId,
//       },
//     });
//     const postIdList = postIdArray.map((like) => like.PostId);

//     const result = await Posts.findAll({
//       attributes: [
//         'postId',
//         'UserId',
//         'nickname',
//         'title',
//         [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'like'],
//       ],
//       include: [
//         {
//           model: Likes,
//           attributes: [],
//         },
//       ],
//       where: {
//         postId: {
//           [sequelize.Op.or]: postIdList,
//         },
//       },
//       group: ['Posts.postId'],
//       order: [[sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'DESC']],
//       raw: true,
//     });

//     res.status(200).json({ result: result });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '좋아요 게시글 조회에 실패하였습니다.' });
//   }
// });
