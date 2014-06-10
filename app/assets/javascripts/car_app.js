window.CarApp = {
  initialize: function () {
    $(document).on('click', '#filter-cars', this.filterCars.bind(this));
    $(document).on('click', '#create-car', this.createCar.bind(this));
    this.loadCars();
  },

  carWasAdded: function (car) {
    this.displayCar(car);
  },

  loadCars: function () {
    $.get('/cars', this.displayCars.bind(this));
  },

  filterCars: function () {
    var xhr = $.getJSON('/cars', {q: $("input[name=q]").val()});

    xhr.done(this.displayCars.bind(this));
    xhr.fail(this.displayCarsFailed.bind(this));
  },

  createCar: function () {
    $.post('/cars', {car: {description: $("input[name=description]").val()}}, this.carWasAdded.bind(this));
  },

  displayCars: function (cars) {
    this.clearCarsList();
    cars.forEach(this.displayCar);
  },

  displayCarsFailed: function(request, state, statusText) {
    alert(request.responseJSON.error);
    this.clearCarsList();
  },

  displayCar: function (car) {
    var deleteLink = "<a href='/cars/'" + car.id + ">Delete</a>";
    var car = "<li>" + car.description + " " + deleteLink + "</li>";
    $('#cars').append(car);
  },

  clearCarsList: function() {
    $('#cars').empty();
  }
};