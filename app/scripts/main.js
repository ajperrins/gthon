(function (exports) {

  var serverUrl = 'http://localhost/app/api/facilities';
  var sampleData = [{ "id": 1, "name": "City Hall", "address_street": "55 Trinity Street", "address_zip": 30303, "area": 15000, "cost": 200, "description": "This is the city hall of Atlanta", "phone": 5555555555, "contact_name": "John Doe", "email": "john@doe.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00" },
                    { "id": 2, "name": "City Wall", "address_street": "101 Main", "address_zip": 90210, "area": 15000, "cost": 150, "description": "This is the city hall of Atlanta", "phone": 5555555555, "contact_name": "Mark Twain", "email": "mark.twain@gmail.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00" }];


  function getFacilityList(http) {
    // todo: replace with xhr call
    return sampleData;
  }

  window.app = {
    getList: function () {
      //$.get(serverUrl)
      return sampleData;
    },

    AboutController: function ($scope, $rootScope, $location) {
      $scope.goHome = function () {
        $rootScope.setLocation('home');
      };
    },

    HomeController: function ($scope, $rootScope) {
    },

    FindController: function ($scope, $http) {
      $http({ method: 'GET', url: '' })
        .success(function (data) {
          $scope.facilities = data;
        });
      //$scope.facilities = getFacilityList($http);

      var mapOptions = {
        center: new google.maps.LatLng(33.74967650, -84.38754899999999),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    },

    ProvideController: function ($scope, $http) {

      var autoSuggestItems = [];

      $('#inputAddress').typeahead({
        source: function (value) {
          console.log(value);
          return autoSuggestItems;
        },
        minLength: 5
      });

      $scope.record = {
        name: '',
        address_street: '',
        address_zip: 0,
        area: 30303,
        contact_name: '',
        email: '',
        description: ''
      };

      $scope.submitFacility = function () {
        console.log($scope.record);
        $http({ method: 'POST', url: '' })
          .success(function () {
            alert('posted');
          });
      };
    }
  };


  angular.module('app', []).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: app.AboutController });
      $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: app.HomeController });
      $routeProvider.when('/find', { templateUrl: 'partials/find.html', controller: app.FindController });
      $routeProvider.when('/provide', { templateUrl: 'partials/provide.html', controller: app.ProvideController });
      $routeProvider.otherwise({ redirectTo: '/about' });
    }])
    .run(function ($rootScope, $location) {
      $rootScope.setLocation = function (loc) {
        $rootScope.loc = loc;
        $location.path(loc);
      };

      $rootScope.$on('$routeChangeStart', function (scope, newRoute) {
        $rootScope.showNav = newRoute.$route.controller !== app.AboutController;
      });
    });

}(window));