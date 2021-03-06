(function (exports) {

  var serverUrl = 'http://govathon.tagping.com/';
  var dataBase =
    [{ "id": 8, "name": "City Hall", "address_street": "55 Trinity Street", "address_zip": 30303, "area": 15000, "cost": 200, "description": "This is the city hall of Atlanta", "phone": 5555555555, "contact_name": "John Doe", "email": "john@doe.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00", "latitude": 33.7489528, "longitude": -84.3904934 }, { "id": 9, "name": "Trinity Church", "address_street": "265 Washington Street", "address_zip": 30303, "area": 5000, "cost": 520, "description": "This is Trinity United Methodist Church", "phone": 3333333333, "contact_name": "Jim Smith", "email": "jim@smith.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00", "latitude": 33.7425322, "longitude": -84.3904768 }, { "id": 10, "name": "Hypepotamus", "address_street": "817 W Peachtree Street NW", "address_zip": 30308, "area": 200, "cost": 20000, "description": "This is Hypepotamus", "phone": 1111111111, "contact_name": "Sue Jones", "email": "sue@jones.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00", "latitude": 33.778295380292, "longitude": -84.385792219709 }, { "id": 11, "name": "The Tabernacle", "address_street": "152 Luckie Street NW", "address_zip": 30303, "area": 150000, "cost": 10, "description": "This is the Tabernacle", "phone": 4444444444, "contact_name": "Bill Washington", "email": "bill@washington.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00", "latitude": 33.7589273, "longitude": -84.3914425 }, { "id": 12, "name": "Starbucks", "address_street": "21 14th Sreet NE", "address_zip": 30309, "area": 1700, "cost": 2200, "description": "This is the coffee place", "phone": 8888888888, "contact_name": "John Coffee", "email": "joe@coffee.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00", "latitude": 33.788021630292, "longitude": -84.386101019708 }];  //[{ "id": 1, lat: 33.7, lng: -84.3, "name": "City Hall", "address_street": "55 Trinity Street", "address_zip": 30303, "area": 15000, "cost": 200, "description": "This is the city hall of Atlanta", "phone": 5555555555, "contact_name": "John Doe", "email": "john@doe.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00" },
  //              { "id": 2, lat: 33.73, lng: -84.33, "name": "City Wall", "address_street": "101 Main", "address_zip": 90210, "area": 15000, "cost": 150, "description": "This is the city hall of Atlanta", "phone": 5555555555, "contact_name": "Mark Twain", "email": "mark.twain@gmail.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00" }];


  function addData(item) {
    dataBase.push(item);
  }

  function getFacilityList(http) {
    // todo: replace with xhr call... if we're able to get there...
    return dataBase;
  }

  window.app = {
    getList: function () {
      //$.get(serverUrl)
      return dataBase;
    },

    AboutController: function ($scope, $rootScope, $location) {
      $scope.goHome = function () {
        $rootScope.setLocation('home');
      };
    },

    HomeController: function ($scope, $rootScope) {
      $scope.goTo = function (value) {
        $rootScope.setLocation(value);
      };
    },

    FindController: function ($scope, $http) {

      //$http({
      //  method: 'GET',
      //  url: serverUrl + 'facilities'
      //})
      //  .success(
      //  function (data) {
      //    $scope.facilities = data;
      //    updateMarkers($scope.facilities);
      //  })
      //  .error(function (data, status, headers, config) {
      //    alert('error retrieving');
      //  });
      //;
      $scope.facilities = getFacilityList($http);

      var mapOptions = {
        center: new google.maps.LatLng(33.74967650, -84.38754899999999),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //var coordinates = _.map($scope.facilities, function (fac) { return { lat: fac.lat, lng: fac.lng } });
      updateMarkers($scope.facilities);

      function updateMarkers(locations) {
        _.each(locations, function (loc) {
          var latLng = new google.maps.LatLng(loc.latitude, loc.longitude);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: loc.name
          });
        });
      }
    },

    ProvideController: function ($scope, $http, $rootScope) {

      var autoSuggestItems = [];

      $('#inputAddress').typeahead({
        source: function (value) {
          console.log(value);
          return autoSuggestItems;
        },
        minLength: 5
      });

      var la = parseFloat('33.' + _.random(7, 75));
      var lo = parseFloat('-84.' + _.random(3, 4));

      $scope.record = {
        name: '',
        address_street: '',
        address_zip: 0,
        area: 30303,
        contact_name: '',
        email: '',
        description: '',

        latitude: la,
        longitude: lo
      };

      //33.7 33.75
      //-84.3, -84.4

      $scope.submitFacility = function () {
        console.log($scope.record);
        addData($scope.record);
        alert('Thanks!');
        $rootScope.setLocation('home');
        //$http({ method: 'POST', url: '' })
        //  .success(function () {
        //    alert('Thanks!');
        //    addData($scope.record);
        //  });
      };
    }
  };


  angular.module('app', []).
    config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
      $routeProvider.when('/about', { templateUrl: 'partials/about.html', controller: app.AboutController });
      $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: app.HomeController });
      $routeProvider.when('/find', { templateUrl: 'partials/find.html', controller: app.FindController });
      $routeProvider.when('/provide', { templateUrl: 'partials/provide.html', controller: app.ProvideController });
      $routeProvider.otherwise({ redirectTo: '/about' });

      $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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