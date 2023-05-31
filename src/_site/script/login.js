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
    // Compare user information with input values
    var isLoginSuccessful = false;

    if (loginData.user_id === 'i-kemen@gmail.com' && loginData.user_pw === '305305') {
      isLoginSuccessful = true;
    }

    // Handle login result
    if (isLoginSuccessful) {
      console.log('Login successful');
      // Redirect to the next page on successful login
      window.location.href = '../chart.html';
    } else {
      console.log('Login failed');
      // Perform error handling for failed login
    }
  }
});
