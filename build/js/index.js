/**
 * Created by agheboianu on 11.05.2017.
 */

var getEmployees = function () {
  $.ajax({
    url: 'http://localhost:8080/api/employees',
    method: 'GET',
    headers: {"X-Authorization": 'Bearer ' + localStorage.getItem('authToken')},
    dataType: 'json',
    contentType: 'application/json',
    error: function (jqXHR, errorText, error) {
      console.log(jqXHR.responseJSON.errorCode);
      refreshToken(getEmployees);
    },
    success: function (data) {
      console.log(data);
    }
  });
};

getEmployees();