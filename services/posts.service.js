const PostsRepository = require('../repositories/posts.repository.js');

class PostsService {
  postsRepository = new PostsRepository();
  findAllPost = async () => {
    const allPosts = await postsRepository.findAll();
    const formatedPost = allPosts.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        nickname: post['User.nickname'],
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
      };
    });
    return formatedPost;
  };

  findUserPost = async (postId) => {
    const userPost = await postsRepository.userPost(postId);
    const formatedPost = {
      postId: userPost.postId,
      userId: userPost.userId,
      nickname: userPost['User.nickname'],
      title: userPost.title,
      content: userPost.content,
      createdAt: userPost.createdAt,
      updatedAt: userPost.updatedAt,
      likes: userPost.likes,
    };
    return formatedPost;
  };

  createPost = async (userId, title, content) => {
    // //! body 데이터가 정상적으로 전달되지 않은 경우
    // if (Object.keys(req.body).length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: '데이터 형식이 올바르지 않습니다' });
    // }

    // //! title의 형식이 비정상적인 경우
    // if (!title || title.length > 25) {
    //   return res
    //     .status(412)
    //     .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
    // }
    // //! content의 형식이 비정상적인 경우
    // if (!content || content.length > 1000) {
    //   return res
    //     .status(412)
    //     .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
    // }
    await postsRepository.createPost(userId, title, content);
  };

  updatePost = async (title, content, postId, userId) => {
    try {
      //! body 데이터가 정상적으로 전달되지 않은 경우
      if (Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ message: '데이터 형식이 올바르지 않습니다' });
      }

      //! title의 형식이 비정상적인 경우
      if (!title || title.length > 25) {
        return res
          .status(412)
          .json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });
      }
      //! content의 형식이 비정상적인 경우
      if (!content || content.length > 1000) {
        return res
          .status(412)
          .status(412)
          .json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
      }

      //* 현재 param에 해당하는 게시글 가져오기
      const posts = await Posts.findOne({ where: { postId } });

      //! 403 게시글을 수정할 권한이 존재하지 않는 경우
      if (userId !== posts.dataValues.UserId) {
        // 현재 로그인된 유저의 아이디와 게시글의 아이디가 불일치 할 경우 수정 권한 없음
        return res
          .status(403)
          .json({ errorMessage: '게시글 수정의 권한이 존재하지 않습니다.' });
      }

      const { updatePost } = await Posts.update(title, content, postId, userId);

      //! 401 게시글 수정이 실패한 경우
      if (updatePost === 0) {
        return res
          .status(401)
          .json({ errorMessage: '게시글이 정상적으로 수정되지 않았습니다.' });
      }
    } catch (err) {
      console.error(err);
    }

    deletePost = async (userId, postId) => {
      if (!postId)
        return res
          .status(400)
          .json({ message: '데이터 형식이 올바르지 않습니다.' });

      const post = await Posts.findOne({ where: { postId } });

      //! 404 게시글이 존재하지 않는 경우

      if (Object.keys(post.dataValues).length === 0) {
        return res
          .status(404)
          .json({ errorMessage: '게시글이 존재하지 않습니다.' });
      }

      //! 403 게시글을 삭제할 권한이 존재하지 않는 경우
      if (userId !== post.dataValues.UserId) {
        // 현재 로그인된 유저의 아이디와 게시글의 아이디가 불일치 할 경우 수정 권한 없음
        return res
          .status(403)
          .json({ errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.' });
      }
      const { deletePost } = await postsRepository.deletePost(postId, userId);

      //! 게시글 삭제에 실패한 경우
      if (deletePost === 0) {
        return res
          .status(401)
          .json({ errorMessage: '게시글이 정상적으로 삭제되지 않았습니다.' });
      }

      return res.status(200).json({ message: '게시글을 삭제하였습니다' });
    };
  };
}

module.exports = PostsService;
