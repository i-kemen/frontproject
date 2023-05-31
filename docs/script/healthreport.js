document.addEventListener('DOMContentLoaded', function() {
    const healthResultButton = document.querySelector('.health-result');
    healthResultButton.addEventListener('click', function() {
      window.location.assign('/healthreport.html'); // 경로 앞에 '/'를 제거하고 수정
    });
  });
  