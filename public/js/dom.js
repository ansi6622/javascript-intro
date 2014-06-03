document.getElementById('insert-button').onclick = function(event){
  var newDiv = document.createElement('div');
  newDiv.innerHTML = "This is a new div";
  newDiv.className = "text inserted-element";
  event.target.parentNode.appendChild(newDiv);
};

document.getElementById('remove-button').onclick = function(event){
  var newDiv = document.createElement('div');
  newDiv.innerHTML = "This is a new div";
  var firstInsertedElement = document.getElementsByClassName('inserted-element')[0];
  if(firstInsertedElement){
    firstInsertedElement.remove();
  }
};

document.getElementById('update-button').onclick = function(event){
  Array.prototype.forEach.call(document.getElementsByClassName('inserted-element'), function(thing){
    thing.innerHTML = thing.innerHTML + ' updated';
  });
};
