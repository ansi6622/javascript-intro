window.HelloWorld = {

  initialize: function () {
    document.getElementById("console-log-button").onclick = function () {
      console.log('Hello World')
    };

    document.getElementById("alert-button").onclick = function () {
      alert('Hello World')
    };

    document.getElementById("inner-html-button").onclick = function () {
      document.getElementById('hello-container').innerHTML = 'Hello World'
    };
  }

};
