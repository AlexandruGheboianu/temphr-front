/**
 * Created by agheboianu on 10.05.2017.
 */

function displayLoginForm() {
  window.location.replace("/temphr-front/production/login.html");
}

//Check auth
var checkLogin = function () {
  var currentTime = new Date().getTime();

  if (window.localStorage.authToken === undefined
      || window.localStorage.authToken === null) {
    displayLoginForm();
  }

  if (currentTime - window.localStorage.loginTime > 86400000) {
    window.localStorage.authToken = null;
    window.localStorage.refreshToken = null;

  }
};

var refreshToken = function (callback) {
  $.ajax({
    url: 'http://localhost:8080/api/auth/token',
    method: 'GET',
    headers: {"X-Authorization": 'Bearer '+localStorage.getItem('refreshToken')},
    dataType: 'json',
    contentType: 'application/json',
    error: function (jqXHR, errorText, error) {
      displayLoginForm();

    },
    success: function (data) {
      window.localStorage.authToken = data.token;
      window.localStorage.loginTime = new Date().getTime();
      callback();
    }
  });
};


