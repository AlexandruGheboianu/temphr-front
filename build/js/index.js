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

  $.Mustache.load('../templates/sidebar.htm')
  .done(function () {
    $('#sidebar').mustache('sidebar-menu-wrapper');
    SIDEBAR();
  });

  $.Mustache.load('../templates/menuProfile.htm')
  .done(function () {
    $('#menu_profile').mustache('menu-profile', viewData);
  });
});

