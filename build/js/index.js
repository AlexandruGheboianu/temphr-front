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
      refreshToken(getEmployees);
    },
    success: function (data) {
      $.Mustache.load('../templates/components/employee_table.htm')
      .done(function () {
        $('#employee_table').mustache('paginated-table', data);
        ICHECK();
        TABLE();
      });
    }
  });
};

getEmployees();