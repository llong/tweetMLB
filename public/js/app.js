var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'gameController'
      }).
      when('/game/:itemId', {
        templateUrl: 'partials/game.html',
        controller: 'gameController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

// Filters

app.filter('nospace', function() {
  return function(value) {
    return (!value) ? ' ': value.replace(' ','-');
  }
});

// Controllers

var d = new Date();
var year = d.getFullYear();

var month = function() {
  var theMonth = d.getMonth()+1;
  if (theMonth < 10) {
    theMonth = '0'+theMonth;
  }
  return theMonth;
  console.log(theMonth);
}
var day = function() {
  var theDay = d.getDate();
  if (theDay < 10) {
    theDay = '0'+theDay;
  }
  return theDay;
}


app.controller('gameController',['$http','$scope','$routeParams','$location', function($http,$scope,$routeParams,$location) {
  $http.get('http://gd2.mlb.com/components/game/mlb/year_'+year+'/month_'+month()+'/day_'+day()+'/master_scoreboard.json')
  .success(function(data){
    $scope.games = data.data.games.game;
    console.log($scope.games);
    $scope.game = "";
  });

  $scope.whichGame = $routeParams.itemId;

  $scope.goToGame = function() {
    $location.url('game/'+this.$index);
    var yo = $scope.games[this.$index];
    console.log(yo);
    $http.post('/hello', $scope.games[this.$index]).success(function(data) {
      console.log(data);
    })
  }
}]);


app.controller('tweetsController',['$scope','$http', function($scope,$http){
  $http.get('/tweets')
  .success(function(data){
    $scope.tweets = data.statuses;
    console.log($scope.tweets);
  });
}]);
