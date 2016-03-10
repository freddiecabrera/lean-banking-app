angular.module('banking-app', [])
  .controller('mainCtrl', function($scope, $http) {
    $scope.balance = 200000;
    $scope.withdrawal = function(amount) {
      $scope.balance = $scope.balance - amount;
    };

    // $scope.initialStatement = function() {
    //   $http({
    //     method: 'GET',
    //     url: '/contacts',
    //   }).then(function(res) {
    //     res.data.forEach(function(contact) {
    //       $scope.contacts.push(contact);
    //     });
    //     console.log('$scope.contacts:', $scope.contacts);
    //   }).then(function(err) {
    //   });
    // };
    // $scope.initialContacList();


  });
