// JSON 파일 로드 함수
function loadJSON(callback) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '../src/health-line.json', true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}

// 그래프 그리는 함수
function drawLineGraph(data) {
  const canvas = document.getElementById('line-graph');
  const ctx = canvas.getContext('2d');

  // 그래프 영역의 크기와 여백 설정
  const padding = 60;
  const width = canvas.width - padding * 2;
  const height = canvas.height - padding * 2;

  // X축, Y축 그리기
  ctx.beginPath();
  ctx.moveTo(padding, padding + height);
  ctx.lineTo(padding + width, padding + height);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2; // 선 두께 조정
  ctx.stroke();

  // X축 눈금 그리기
  const xScale = width / (data.length - 1);
  const xLabelInterval = Math.ceil(data.length / 10); // X축 눈금 라벨 간격
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  data.forEach((entry, index) => {
    if (index % xLabelInterval === 0) {
      const x = padding + index * xScale;
      const y = padding + height + 15;
      ctx.fillText(entry.month, x, y);
    }
    const x = padding + index * xScale;
    const y = padding + height + 5;
    ctx.fillRect(x, y, 1, 5);
  });

  // Y축 눈금 그리기
  const valueMax = Math.max(...data.map(entry => entry.value));
  const valueMin = Math.min(...data.map(entry => entry.value));
  const yScale = height / (valueMax - valueMin);
  const yLabelInterval = Math.ceil((valueMax - valueMin) / 10); // Y축 눈금 라벨 간격
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.strokeStyle = 'black'; // Y축 눈금 선 색상 설정
  ctx.lineWidth = 1; // Y축 눈금 선 두께 조정
  for (let i = 0; i <= 10; i++) {
    const value = valueMin + i * yLabelInterval;
    const x = padding - 45;
    const y = padding + height - i * (height / 10);
    ctx.fillText((value / 1000000).toLocaleString() + '', x, y); // 백만 단위로 묶어서 표기
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(padding + width, y);
    ctx.stroke();
  }

  // 선 그래프 그리기
  ctx.beginPath();
  ctx.moveTo(padding, padding + height);
  let currentIndex = 0;
  const drawLine = setInterval(() => {
    const entry = data[currentIndex];
    const x = padding + currentIndex * xScale;
    const y = padding + height - (entry.value - valueMin) * yScale;
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'red'; // 빨간색 선 색상 설정
    ctx.lineWidth = 2; // 선 두께 조정
    ctx.stroke();

    currentIndex++;
    if (currentIndex === data.length) {
      clearInterval(drawLine);
    }
  }, 100);

  // 그래프 우측 상단에 단위 표시
  const unitText = '(단위: 백만원)';
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.fillText(unitText, canvas.width - ctx.measureText(unitText).width - 10, padding + 20);
}

// JSON 파일 로드 후 그래프 그리기
loadJSON(drawLineGraph);
