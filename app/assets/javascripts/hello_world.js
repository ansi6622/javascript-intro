window.HelloWorldWithFunctionVars = {

  initialize: function () {

    // setup variables
    var text = "Hello World";

    var printHelloToConsole = function () {
      console.log(text);
    };

    var alertHelloWorld = function () {
      alert(text);
    };

    var replaceTextWithHelloWorld = function () {
      $('#hello-container').html(text);
    };

    // define event listeners
    $("#console-log-button").click(printHelloToConsole);
    $("#alert-button").click(alertHelloWorld);
    $("#inner-html-button").click(replaceTextWithHelloWorld);

  }

};
