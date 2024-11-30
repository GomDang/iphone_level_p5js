// iphone 15pro & chrome, It wast tested successfully.


let ballX, ballY; // 원의 위치
let centerX, centerY; // 화면 중앙 위치
let sensitivity = 200; // 움직임 민감도 조정

function setup() {
  createCanvas(windowWidth, windowHeight); // 화면 크기 설정
  centerX = width / 2;
  centerY = height / 2;
  ballX = centerX;
  ballY = centerY;

  // 배경 설정
  background(220);

  // 센서 권한 요청 (iOS)
  if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
    let button = createButton("Enable Motion Sensors");
    button.style("font-size", "18px");
    button.position(width / 2 - 100, height / 2);
    button.mousePressed(() => {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            button.remove();
          } else {
            alert("Motion sensor permission denied.");
          }
        })
        .catch(console.error);
    });
  }
}

function draw() {
  // 배경을 덮어 이전 프레임 지우기
  background(220);

  // 스마트폰의 기울기에 따라 원의 위치 계산
  ballX = centerX - rotationY * sensitivity;
  ballY = centerY - rotationX * sensitivity;

  // 화면 중앙에 녹색 원 그리기
  fill(0, 255, 0);
  noStroke();
  circle(ballX, ballY, 50);

  // 중심선 표시
  noFill();
  stroke(0);
  strokeWeight(1);
  line(centerX - 150, centerY, centerX + 150, centerY);
  line(centerX, centerY - 150, centerX, centerY + 150);
  
  drawingContext.setLineDash([5, 7])
  circle(centerX, centerY, 50);
  
  drawingContext.setLineDash([5, 0])
}
