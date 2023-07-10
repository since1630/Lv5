const PostService = require('../services/posts.service.js');
const postsSchema = require('../schemas/posts.schema');

class PostController {
  postService = new PostService();

  findAllPost = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();

      return res.status(200).json({ data: posts });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  findUserPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const userPost = await this.postService.findUserPost(postId);

      return res.status(200).json({ data: userPost });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 조회에 실패하였습니다' });
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { userId, nickname } = res.locals.user;
      const { title, content } = req.body;

      //! 유효성 검사는 따로 예외처리(유효성 검사에 관한 메세지를 보내기 위함)
      try {
        await postsSchema.validateAsync(req.body);
      } catch (err) {
        console.error(err);
        return res.status(400).json({ errorMessage: err.message });
      }

      await this.postService.createPost(userId, title, content);
      return res.status(201).json({ message: '게시글 작성에 성공하였습니다' });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;

      try {
        await postsSchema.validateAsync(req.body);
      } catch (err) {
        console.error(err);
        return res.status(400).json({ errorMessage: err.message });
      }

      //* 해당 postId의 게시글을 찾아온다.
      const posts = await this.postService.findPost(postId);

      //! 403 게시글을 수정할 권한이 존재하지 않는 경우
      if (userId !== posts.dataValues.UserId) {
        // 현재 로그인된 유저의 아이디와 게시글의 아이디가 불일치 할 경우 수정 권한 없음 응답 반환
        return res
          .status(403)
          .json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
      }

      const updatePost = await this.postService.updatePost(
        title,
        content,
        postId,
        userId
      );

      //! 401 게시글 수정이 실패한 경우
      if (updatePost === 0) {
        return res
          .status(401)
          .json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
      }
      return res.status(201).json({ message: '게시글을 수정하였습니다.' });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const posts = await this.postService.findPost(postId);

      //! 404 게시글이 존재하지 않는 경우
      if (Object.keys(posts.dataValues).length === 0) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }

      //! 403 게시글을 삭제할 권한이 존재하지 않는 경우
      if (userId !== posts.dataValues.UserId) {
        // 현재 로그인된 유저의 아이디와 게시글의 아이디가 불일치 할 경우 수정 권한 없음
        return res
          .status(403)
          .json({ errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.' });
      }
      const deletePost = await this.postService.deletePost(userId, postId);

      //! 게시글 삭제에 실패한 경우
      if (deletePost === 0) {
        return res
          .status(401)
          .json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
      }
      return res.status(200).json({ message: '게시글을 삭제하였습니다' });
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = PostController;
