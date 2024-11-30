let ballX, ballY; // 원의 위치 
let centerX, centerY; // 화면 중앙 위치
let sensitivity = 50; // 움직임 민감도 조정
let button; // 센서 권한 버튼
const baseLength = 1435; // 밑변의 길이 (mm)
let beta = 0, gamma = 0; // DeviceOrientation 값

function setup() {
  createCanvas(windowWidth, windowHeight); // 화면 크기 설정
  calculateCenter();

  // 센서 권한 요청 (iOS)
  if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
    button = createButton("Enable Motion Sensors");
    button.style("font-size", "18px");
    button.position(centerX - 100, centerY);
    button.mousePressed(function () {
      DeviceOrientationEvent.requestPermission()
        .then(function (response) {
          if (response === "granted") {
            button.remove();
            // DeviceOrientation 이벤트 리스너 추가
            window.addEventListener("deviceorientation", handleOrientation);
          } else {
            alert("Motion sensor permission denied.");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  } else {
    // Android 또는 일반 브라우저
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

function draw() {
  background(220);

  // 스마트폰의 기울기에 따라 원의 위치 계산
  ballX = centerX - gamma * sensitivity;
  ballY = centerY - beta * sensitivity;

  // 화면 중앙에 녹색 원 그리기
  fill(0, 255, 0);
  noStroke();
  circle(ballX, ballY, 50);

  // 중심선 표시
  stroke(0);
  strokeWeight(1);
  line(centerX - 150, centerY, centerX + 150, centerY);
  line(centerX, centerY - 150, centerX, centerY + 150);
  

  
  // 화면 중앙에 점선 원 그리기
  drawingContext.setLineDash([5, 8]);
  noFill();
  strokeWeight(1);
  circle(centerX, centerY, 50);
  
  drawingContext.setLineDash([5, 0]);
  
  

  // 각도 및 높이 계산
  let angleX = gamma; // X 방향 각도 (degree)
  let angleY = beta; // Y 방향 각도 (degree)

  // 삼각형 높이 계산 (tan 함수 이용)
  let cant_X = tan(radians(angleX)) * baseLength; // X 방향 높이 (mm)
  let cant_Y = tan(radians(angleY)) * baseLength; // Y 방향 높이 (mm)

  // 소수점 이하 첫째 자리까지 표시
  cant_X = nf(cant_X, 0, 1);
  cant_Y = nf(cant_Y, 0, 1);

  // 기울기 및 높이값 텍스트 표시
  noStroke();
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text('녹색공은 기포처럼 높은쪽으로 이동함', 30, 50);
  text(`X-Angle: ${angleX.toFixed(1)}°`, 30, 100);
  text(`Y-Angle: ${angleY.toFixed(1)}°`, 30, 140);
  text(`cant_X: ${cant_X} mm`, 30, 180);
  text(`cant_Y: ${cant_Y} mm`, 30, 220);
}

function calculateCenter() {
  centerX = width / 2;
  centerY = height / 2;
  ballX = centerX;
  ballY = centerY;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateCenter();

  // 버튼 위치 재조정
  if (button) {
    button.position(centerX - 100, centerY);
  }
}

function handleOrientation(event) {
  beta = event.beta; // X 축 기울기 (전후)
  gamma = event.gamma; // Y 축 기울기 (좌우)
}
