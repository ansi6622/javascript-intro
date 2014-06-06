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
    $.get('/cars', {q: $("input[name=q]").val()}, this.displayCars.bind(this), "json");
  },

  createCar: function () {
    $.post('/cars', {car: {description: $("input[name=description]").val()}}, this.carWasAdded.bind(this));
  },

  displayCars: function (cars) {
    $('#cars').empty();
    cars.forEach(this.displayCar);
  },

  displayCar: function (car) {
    var deleteLink = "<a href='/cars/" + car.id + ">Delete</a>";
    var car = "<li>" + car.description + " " + deleteLink + "</li>";
    $('#cars').append(car);
  }
};