const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middlewares');
const CommentController = require('../controllers/comments.controllers');
const commentController = new CommentController();

//? 댓글 조회
router.get('/:postId/comments', commentController.findAllComments);
router.post(
  '/:postId/comments',
  authMiddleware,
  commentController.createComment
);
router.put(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentController.updateComment
);
router.delete(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentController.deleteComment
);

// //? 댓글 조회
// router.get('/:postId/comments', async (req, res) => {
//   try {
//     const { postId } = req.params;
//     //! 게시물 못 찾을 때 에러(24자리 고정)
//     const posts = await Posts.findOne({ where: { postId } });
//     if (!posts) {
//       return res
//         .status(404)
//         .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//     }
//     const comments = await Comments.findAll({
//       attributes: ['commentId', 'userId', 'comment', 'createdAt', 'updatedAt'],
//       include: [
//         {
//           model: Users,
//           attributes: ['nickname'],
//         },
//       ],
//       where: { [Op.and]: { postId } },
//       order: [['createdAt', 'DESC']],
//     });

//     res.status(200).json({ comments });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '댓글 조회에 실패하였습니다.' });
//   }
// });

// //? 댓글 생성
// router.post('/:postId/comments', authMiddleware, async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const { userId } = res.locals.user;
//     //! body에 문제가 있을 때
//     const { comment } = req.body; // POST로 넘어온다. body 객체 참조할 것.
//     if (!comment)
//       return res
//         .status(412)
//         .json({ message: '데이터 형식이 올바르지 않습니다' });
//     //! 게시물 못 찾을 때 에러(24자리 고정)
//     const posts = await Posts.findOne({ where: { postId } });
//     if (!posts) {
//       return res
//         .status(404)
//         .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//     }
//     await Comments.create({ UserId: userId, PostId: postId, comment });
//     return res.status(201).json({ message: '댓글을 작성하였습니다.' });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '댓글 작성에 실패하였습니다.' });
//   }
// });

// //? 댓글 수정
// router.put('/:postId/comments/:commentId', authMiddleware, async (req, res) => {
//   try {
//     const { postId, commentId } = req.params;
//     const { comment } = req.body;
//     const { userId } = res.locals.user;
//     //! body에 문제가 있을 때
//     if (!comment) {
//       return res
//         .status(412)
//         .json({ errorMessage: '댓글 작성에 실패하였습니다.' });
//     }
//     //! 게시물 못 찾을 때 에러(24자리 고정)
//     const posts = await Posts.findOne({ where: { postId } });
//     if (!posts) {
//       return res
//         .status(404)
//         .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//     }
//     //! 댓글을 못 찾을 때 에러(24자리 고정)
//     const comments = await Comments.findOne({ where: { commentId } });
//     if (!comments) {
//       return res
//         .status(404)
//         .json({ errorMessage: '댓글이 존재하지 않습니다.' });
//     }
//     //! 권한이 없을 때 (토큰의 유저 아이디 활용)
//     if (comments.UserId !== userId) {
//       return res
//         .status(403)
//         .json({ errorMessage: '댓글의 수정 권한이 존재하지 않습니다.' });
//     }

//     const [checkCommentUpdate] = await Comments.update(
//       { comment },
//       {
//         where: {
//           [Op.and]: [{ PostId: postId }, { UserId: userId }, { commentId }],
//         },
//       }
//     );

//     //! 400 댓글 수정이 실패한 경우
//     if (!checkCommentUpdate) {
//       return res
//         .status(400)
//         .json({ errorMessage: '댓글이 정상적으로 수정되지 않았습니다.' });
//     }
//     return res.status(201).json({ message: '댓글을 수정하였습니다.' });
//   } catch (err) {
//     console.error(err);
//     res.status(204).json({ errorMessage: '댓글 수정에 실패하였습니다.' });
//   }
// });

// //? 댓글 삭제
// router.delete(
//   '/:postId/comments/:commentId',
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const { postId, commentId } = req.params;
//       const { userId } = res.locals.user;
//       //! 게시물 못 찾을 때 에러(24자리 고정)
//       const posts = await Posts.findOne({ where: { postId } });
//       if (!posts) {
//         return res
//           .status(404)
//           .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//       }
//       //! 댓글을 못 찾을 때 에러(24자리 고정)
//       const comments = await Comments.findOne({ where: { commentId } });
//       if (!comments) {
//         return res
//           .status(404)
//           .json({ errorMessage: '댓글이 존재하지 않습니다.' });
//       }
//       //! 권한이 없을 때 (토큰의 유저 아이디 활용)
//       if (comments.UserId !== userId) {
//         return res
//           .status(403)
//           .json({ errorMessage: '댓글의 삭제 권한이 존재하지 않습니다.' });
//       }
//       const checkCommentDelete = await Comments.destroy({
//         where: {
//           [Op.and]: [{ PostId: postId }, { UserId: userId }, { commentId }],
//         },
//       });
//       //! 400 댓글 삭제가 실패한 경우
//       if (!checkCommentDelete) {
//         return res.status(400).json({
//           errorMessage: '댓글 삭제가 정상적으로 처리되지 않았습니다.',
//         });
//       }
//       return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
//     } catch (err) {
//       console.error(err);
//       res.status(400).json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
//     }
//   }
// );

module.exports = router;
