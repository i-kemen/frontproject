// JSON 파일 로드 함수
function loadJSON(callback) {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../src/health-stock.json', true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState === 4 && xobj.status === 200) {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);
  }
  
  // 그래프 그리는 함수
  function drawPieGraph(data) {
    const canvas = document.getElementById('pie-graph');
    const ctx = canvas.getContext('2d');
  
    // 그래프 영역의 크기와 위치 설정
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10;
  
    // 데이터를 백분율 크기에 따라 정렬
    data.sort((a, b) => b.percentage - a.percentage);
  
    // 원형 차트 색상 팔레트
    const colorPalette = [
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf'
    ];
  
    // 총 백분율 계산
    const totalPercentage = data.reduce((sum, entry) => sum + entry.percentage, 0);
    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);
  
    // 시작 각도와 종료 각도 초기화
    let startAngle = -Math.PI / 2;
    let endAngle = 0;
  
    // 색상 인덱스
    let colorIndex = 0;
  
    // 글꼴 및 크기 설정
    const labelFont = '18px Arial';
    const labelColor = 'white';
    const totalLabelFont = '18px Arial';
    const totalLabelColor = 'black'; // 검은색
  
    // 원형 그래프 그리기
    data.forEach((entry) => {
      const percentage = entry.percentage / totalPercentage;
      endAngle = startAngle + 2 * Math.PI * percentage;
  
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
  
      ctx.fillStyle = colorPalette[colorIndex % colorPalette.length];
      ctx.fill();
  
      // 텍스트 표기
      const labelAngle = startAngle + (endAngle - startAngle) / 2;
      const labelRadius = radius * 0.6; // 파이 바깥쪽에 위치하도록 반지름 조정
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;
  
      ctx.fillStyle = labelColor;
      ctx.font = labelFont;
      ctx.textAlign = 'center';
      ctx.fillText(entry.stock, labelX, labelY - 10); // 종목 이름
      ctx.fillText(`${entry.percentage}%`, labelX, labelY + 10); // 퍼센티지
      ctx.fillText(`${(entry.value / 1000000).toLocaleString()}백만원`, labelX, labelY + 30); // 금액
  
      startAngle = endAngle;
      colorIndex++;
    });
  
    // 총액 표기
    const totalLabel = `총액: ${(totalValue / 1000000).toLocaleString()}백만원`;
    ctx.fillStyle = totalLabelColor; // 검은색
    ctx.font = totalLabelFont;
    ctx.textAlign = 'end';
    ctx.fillText(totalLabel, canvas.width - 10, 20);
  }
  
  // JSON 파일 로드 후 그래프 그리기
  loadJSON(drawPieGraph);
  