const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares.js');
const PostController = require('../controllers/posts.controller');
const postController = new PostController();

//게시글 전체 조회
router.get('/', postController.findAllPost);

// 게시글 상세 조회
router.get('/:postId', postController.findUserPost);

// 게시글 작성
router.post('/', authMiddleware, postController.createPost);

// 게시글 수정
router.put('/', authMiddleware, postController.updatePost);

// 게시글 삭제
router.delete('/', authMiddleware, postController.deletePost);

// //게시글 전체 조회
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Posts.findAll({
//       attributes: [
//         'postId',
//         'userId',
//         'title',
//         'createdAt',
//         'updatedAt',
//         [sequelize.fn('count', sequelize.col('Likes.postId')), 'likes'],
//       ],
//       include: [
//         {
//           model: Users,
//           attributes: ['nickname'],
//         },
//         { model: Likes, attributes: [] },
//       ],
//       group: ['postId'],
//       order: [['createdAt', 'DESC']],
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
//     console.log(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
//   }
// });

// // 게시글 상세 조회
// router.get('/:postId', async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const post = await Posts.findOne({
//       attributes: [
//         'postId',
//         'userId',
//         'title',
//         'content',
//         'createdAt',
//         'updatedAt',
//         [sequelize.fn('count', sequelize.col('Likes.PostId')), 'likes'],
//       ],
//       include: [
//         {
//           model: Users,
//           attributes: ['nickname'],
//           required: true,
//         },
//         {
//           model: Likes,
//           attributes: [],
//           required: false,
//         },
//       ],
//       group: ['postId'],
//       where: { postId },
//       raw: true,
//     });

//     const formatedPost = {
//       postId: post.postId,
//       userId: post.userId,
//       nickname: post['User.nickname'],
//       title: post.title,
//       content: post.content,
//       createdAt: post.createdAt,
//       updatedAt: post.updatedAt,
//       likes: post.likes,
//     };
//     return res.status(200).json({ post: formatedPost });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
//   }
// });

// // 게시글 작성
// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user;
//     const { title, content } = req.body;

//     //! body 데이터가 정상적으로 전달되지 않은 경우
//     if (Object.keys(req.body).length === 0) {
//       return res
//         .status(400)
//         .json({ message: '데이터 형식이 올바르지 않습니다' });
//     }

//     //! title의 형식이 비정상적인 경우
//     if (!title || title.length > 25) {
//       return res
//         .status(412)
//         .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
//     }
//     //! content의 형식이 비정상적인 경우
//     if (!content || content.length > 1000) {
//       return res
//         .status(412)
//         .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
//     }
//     await Posts.create({ UserId: userId, title, content });
//     return res.status(201).json({ message: '게시글 작성에 성공하였습니다' });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
//   }
// });

// // 게시글 수정
// router.put('/:postId', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user;
//     const { postId } = req.params;
//     const { title, content } = req.body;

//     //! body 데이터가 정상적으로 전달되지 않은 경우
//     if (Object.keys(req.body).length === 0) {
//       return res
//         .status(400)
//         .json({ message: '데이터 형식이 올바르지 않습니다' });
//     }

//     //! title의 형식이 비정상적인 경우
//     if (!title || title.length > 25) {
//       return res
//         .status(412)
//         .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
//     }
//     //! content의 형식이 비정상적인 경우
//     if (!content || content.length > 1000) {
//       return res
//         .status(412)
//         .status(412)
//         .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
//     }

//     //* 현재 param에 해당하는 게시글 가져오기
//     const posts = await Posts.findOne({ where: { postId } });

//     //! 403 게시글을 수정할 권한이 존재하지 않는 경우
//     if (userId !== posts.dataValues.UserId) {
//       // 현재 로그인된 유저의 아이디와 게시글의 아이디가 불일치 할 경우 수정 권한 없음
//       return res
//         .status(403)
//         .json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
//     }

//     const checkPostUpdate = await Posts.update(
//       { title, content },
//       { where: { [Op.and]: [{ postId }, { UserId: userId }] } }
//     );

//     //! 401 게시글 수정이 실패한 경우
//     if (checkPostUpdate[0] === 0) {
//       return res
//         .status(401)
//         .json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
//     }
//     return res.status(201).json({ message: '게시글을 수정하였습니다.' });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '게시글 수정에 실패하였습니다.' });
//   }
// });

// // 게시글 삭제
// router.delete('/:postId', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user;
//     const { postId } = req.params;

//     if (!postId)
//       return res
//         .status(400)
//         .json({ message: '데이터 형식이 올바르지 않습니다.' });

//     const post = await Posts.findOne({ where: { postId } });

//     //! 404 게시글이 존재하지 않는 경우

//     if (Object.keys(post.dataValues).length === 0) {
//       return res
//         .status(404)
//         .json({ errorMessage: '게시글이 존재하지 않습니다.' });
//     }

//     //! 403 게시글을 삭제할 권한이 존재하지 않는 경우
//     if (userId !== post.dataValues.UserId) {
//       // 현재 로그인된 유저의 아이디와 게시글의 아이디가 불일치 할 경우 수정 권한 없음
//       return res
//         .status(403)
//         .json({ errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.' });
//     }
//     const checkPostDelete = await Posts.destroy({
//       where: { [Op.and]: [{ postId }, { UserId: userId }] },
//     });

//     //! 게시글 삭제에 실패한 경우
//     if (checkPostDelete[0] === 0) {
//       return res
//         .status(401)
//         .json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
//     }

//     return res.status(200).json({ message: '게시글을 삭제하였습니다' });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(400)
//       .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
//   }
// });

module.exports = router;
