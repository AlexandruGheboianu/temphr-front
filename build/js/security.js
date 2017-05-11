/**
 * Created by agheboianu on 10.05.2017.
 */

function displayLoginForm() {
  window.location.replace("/temphr-jquery/production/login.html");
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
    displayLoginForm();
  }
};


