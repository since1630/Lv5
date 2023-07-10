# Lv5
항해99 주특기 주차 과제

## 💬 프로젝트 설명
회원의 정보(나이,취미,소득,직업)에 따라 맞춤형 금융상품(대출,카드)을 추천해주는 금융 플랫폼입니다.

## ✅ 로그인/회원가입
POST /signup
POST /login

## ✅ 게시글 관리
GET / posts
GET / posts/:postId
POST / posts
PUT / posts/:postId
DELETE / posts/:postId

## ✅ 댓글 관리
GET / posts/:postId/comments
POST / posts/:postId/comments
PUT / posts/:postId/comments/:commentId
DELETE / posts/:postId/comments/:commentId

## ✅ 좋아요 관리
GET / posts/like
PUT / posts/:postId/like
