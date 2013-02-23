(function (exports) {

  var serverUrl = 'http://localhost/app/api/facilities';
  var sampleData = [{ "id": 1, "name": "City Hall", "address_street": "55 Trinity Street", "address_zip": 30303, "area": 15000, "cost": 200, "description": "This is the city hall of Atlanta", "phone": 5555555555, "contact_name": "John Doe", "email": "john@doe.com", "created_at": "0000-00-00 00:00:00", "updated_at": "0000-00-00 00:00:00" }];


  window.app = {
    getList: function () {
      //$.get(serverUrl)
      return sampleData;
    }
    
  };


}(window));