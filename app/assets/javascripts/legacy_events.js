window.LegacyEvents = {

  initialize: function () {

    // setup variables
    var text = "Hello World";

    var alertHelloWorld = function () {
      alert(text);
    };

    var addAnotherButton = function () {
      var button = '<button class="bind-button">Broken Hello World</button>'

      $('main .container section').append(button);
    };

    // define event listeners
    $(".bind-button").bind("click", alertHelloWorld);
    $(".add-dynamic-button").bind("click", addAnotherButton);
  }

};
