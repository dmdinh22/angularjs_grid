angular.module('myApp').controller('gridCtrl', function ($scope, api) {  
  $scope.totalPages = 0;
  $scope.customersCount = 0;
  $scope.headers = [{
      title: 'Id',
      value: 'id'
    },{
      title: 'Name',
      value: 'name'
    },{
      title: 'Email',
      value: 'email'
    },{
      title: 'City',
      value: 'city'
    },{
      title: 'State',
      value: 'state'
  }];

  //ajax call to fill drop down with state filters
  $scope.states = api.states();

  // default filters
  $scope.filterCriteria = {
    pageNumber: 1,
    sortDir: 'asc',
    sortedBy: 'id'
  };

  // function responsible of fetching the result from the server
  $scope.fetchResult = function () {
    return api.customers.search($scope.filterCriteria).then(function (data) {
      $scope.customers = data.Customers;
      $scope.totalPages = data.TotalPages;
      $scope.customersCount = data.TotalItems;
    }, function () {
      $scope.customers = [];
      $scope.totalPages = 0;
      $scope.customersCount = 0;
    });
  };

  // called when changing to another page
  $scope.selectPage = function (page) {
    $scope.filterCriteria.pageNumber = page;
    $scope.fetchResult();
  };

  // called when filtering the grid, reset page number back to one
  $scope.filterResult = function () {
    $scope.filterCriteria.pageNumber = 1;
    $scope.fetchResult().then(function () {
      // request fires correctly but sometimes UI does not update, so this is to fix UI issue
      $scope.filterCriteria.pageNumber = 1;
    });
  };

  // call back function that we passed into sortBy directive, called when clicking to sort
  $scope.onSort = function (sortedBy, sortDir) {
    $scope.filterCriteria.sortDir = sortDir;
    $scope.filterCriteria.sortedBy = sortedBy;
    $scope.filterCriteria.pageNumber = 1;
    $scope.fetchResult().then(function () {
      // request fires correctly but sometimes UI does not update, so this is to fix UI issue
      $scope.filterCriteria.pageNumber = 1;
    });
  };

  // manually select page to trigger ajax request to hydrate grid on page load
  $scope.selectPage(1);
});
