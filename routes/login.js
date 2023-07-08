const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

// 로그인 API
router.post('/', loginController.login);

// router.post('/', async (req, res) => {
//   try {
//     const { nickname, password } = req.body;
//     const user = await Users.findOne({ where: { nickname } });
//     if (!user || password !== user.password) {
//       res.status(412).json({
//         errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
//       });
//       return;
//     }

//     // JWT 생성
//     const token = jwt.sign(
//       { userId: user.userId, nickname: user.nickname },
//       'customized-secret-key'
//       // 시크릿키는 내일 조정
//     );
//     res.cookie('authorization', 'Bearer ' + token);
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(400).json({
//       errorMessage: '로그인에 실패하였습니다.',
//     });
//     return;
//   }
// });

module.exports = router;
