/**
 * Created by agheboianu on 11.05.2017.
 */
let currentPage = 0;
let currentPageSize = 4;

function displayEmployeeTable() {
  getEmployees(currentPage, currentPageSize);
}

function getEmployees(page, size) {
  $.ajax({
    url: 'http://localhost:8080/api/employees?size=' + size + '&page='
    + page,
    method: 'GET',
    headers: {
      "X-Authorization": 'Bearer ' + localStorage.getItem('authToken')
    },
    dataType: 'json',
    contentType: 'application/json',
    error: function (jqXHR, errorText, error) {
      refreshToken(getEmployees);
    },
    success: function (data) {
      const range = n => Array.from({length: n}, (value, key) => key + 1);

      let viewData = {
        data: data,
        pages: range(data['totalPages']),
        index: function () {
          return ++window['INDEX'] || (window['INDEX'] = 0);
        },
        resetIndex: function () {
          window['INDEX'] = undefined;
        },
        startElement: function () {
          return this.data['number'] * this.data['size'] + 1;
        },
        endElement: function () {
          return this.data['number'] * this.data['size']
              + this.data['numberOfElements'];
        },
        previous: function () {
          if (page !== 0) {
            return "getEmployees("+(page - 1)+","+currentPageSize+");";
          }
        },
        next: function () {
          if (page !== data['totalPages'] - 1) {
            return  "getEmployees("+(page+1)+","+currentPageSize+");";
          }
        }
      };

      $.Mustache.load('../templates/components/employee_table.htm')
      .done(function () {
        $('#employee_table').empty();
        $('#employee_table').mustache('paginated-table', viewData);
        $('#emp_page_' + data['number']).addClass('active');
        ICHECK();
        TABLE();
      });
    }
  });
};

let showPage = function (link) {
  currentPage = $(link).attr('id').substring(9);
  displayEmployeeTable();
};

displayEmployeeTable();