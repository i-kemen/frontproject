window.onload = function() {
  // 각 버튼의 클래스에 맞게 이벤트 리스너를 추가합니다.
  document.querySelector('.report-button1').addEventListener('click', function() {
    openReport(1);
  });

  document.querySelector('.report-button2').addEventListener('click', function() {
    openReport(2);
  });

  document.querySelector('.report-button3').addEventListener('click', function() {
    openReport(3);
  });
}

function openReport(reportNumber) {
  var reportPath = 'report' + reportNumber + '.json';
  window.location.href = reportPath;
}
