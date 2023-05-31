document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginFrm');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get input values
      const userId = document.querySelector('input[name="user_id"]').value;
      const userPw = document.querySelector('input[name="user_pw"]').value;
  
      // Perform validation
      if (userId.trim() === '') {
        showError('id_error', '아이디(이메일)을 입력해주세요.');
        return;
      }
      if (userPw.trim() === '') {
        showError('pw_error', '비밀번호를 입력해주세요.');
        return;
      }
  
      // Create login object
      const loginData = {
        user_id: userId,
        user_pw: userPw
      };
  
      // Perform login request
      performLogin(loginData);
    });
  
    function showError(errorClassName, errorMessage) {
      const errorElement = document.querySelector(`.${errorClassName}`);
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    }
  
    function performLogin(loginData) {
      // JSON 파일 가져오기
      getJSONFile('src/login.json', function(response) {
        var jsonData = JSON.parse(response);
  
        // 비교를 위한 사용자 정보 추출
        var users = jsonData.users;
  
        // 사용자 정보와 입력값 비교
        var isLoginSuccessful = false;
        for (var i = 0; i < users.length; i++) {
          if (users[i].id === loginData.user_id && users[i].password === loginData.user_pw) {
            isLoginSuccessful = true;
            break;
          }
        }
  
        // 로그인 결과에 따른 처리
        if (isLoginSuccessful) {
          console.log('Login successful');
          // 로그인 성공 시 다음 페이지로 리다이렉션
          window.location.href = '../chart.html';
        } else {
          console.log('Login failed');
          // 로그인 실패 시 에러 처리 등을 수행
        }
      });
    }
  
    // JSON 파일 가져오기
    function getJSONFile(file, callback) {
      var xhr = new XMLHttpRequest();
      xhr.overrideMimeType('application/json');
      xhr.open('GET', file, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(xhr.responseText);
        }
      };
      xhr.send(null);
    }
  });
  