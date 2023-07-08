// /** LSP After **/
// class Shape {
//   // Rectangle과 Square의 부모 클래스를 정의합니다.
//   getArea() {
//     // getArea는 빈 메소드로 정의
//   }
// }

class Rectangle {
  // Rectangle은 Shape를 상속받습니다.
  constructor(width = 0, height = 0) {
    // 직사각형의 생성자
    // super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    // 직사각형의 높이와 너비의 결과값을 조회하는 메소드
    return this.width * this.height;
  }
}

class Square {
  // Square는 Shape를 상속받습니다.
  constructor(length = 0) {
    // 정사각형의 생성자
    // super();
    this.length = length; // 정사각형은 너비와 높이가 같이 깨문에 width와 height 대신 length를 사용합니다.
  }

  getArea() {
    // 정사각형의 높이와 너비의 결과값을 조회하는 메소드
    return this.length * this.length;
  }
}

const rectangleArea = new Rectangle(8, 8) // 49
  .getArea(); // 7 * 7 = 49
const squareArea = new Square(7) // 49
  .getArea(); // 7 * 7 = 49

console.log(rectangleArea);
console.log(squareArea);
