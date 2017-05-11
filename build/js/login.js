/**
 * Created by agheboianu on 10.05.2017.
 */

$('#login').click(function (e) {
  e.preventDefault();

  $('#loginForm').parsley().validate();

  if (true === $('#loginForm').parsley().isValid()) {
    doLogin();
  }

});

var doLogin = function () {
  $.ajax({
    url: 'http://localhost:8080/api/auth/login',
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
      username: $("#username").val(),
      password: $("#password").val()
    }),
    error: function (jqXHR, errorText, error) {
      console.log("Login failed");
    },
    success: function (data) {
      window.localStorage.authToken = data.token;
      window.localStorage.refreshToken = data.refreshToken;
      window.localStorage.firstName = data.firstName;
      window.localStorage.lastName = data.lastName;
      window.localStorage.roles = data.roles.split('#');
      window.localStorage.loginTime = new Date().getTime();
      window.location.replace("/temphr-jquery/production/index.html");
    }
  });
}