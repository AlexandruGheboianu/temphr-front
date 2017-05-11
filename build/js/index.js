/**
 * Created by agheboianu on 11.05.2017.
 */
var viewData = {
  firstName:   window.localStorage.firstName,
  lastName: window.localStorage.lastName
};
$(document).ready(function () {
  $.Mustache.load('../templates/topNav.htm')
  .done(function () {
    $('#top_nav').mustache('user-menu', viewData);
  });
});
