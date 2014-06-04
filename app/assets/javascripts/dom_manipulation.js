window.DomManipulation = {

  initialize: function () {
    $(document).on('click', '#insert-button', this.insertButtonWasClicked);
    $(document).on('click', '#remove-button', this.removeButtonWasClicked);
    $(document).on('click', '#update-button', this.updateButtonWasClicked);
    $(document).on('click', '.inserted-element', this.insertedElementWasClicked);
  },

  insertButtonWasClicked: function (event) {
    var $newDiv = $('<div class="text inserted-element">This is a new div</div>');
    $(event.target).parent().append($newDiv);
  },

  removeButtonWasClicked: function (event) {
    $('.inserted-element:last').remove();
  },

  updateButtonWasClicked: function (event) {
    $('.inserted-element').each(function () {
      $(this).html($(this).html() + ' updated');
    });
  },

  insertedElementWasClicked: function (event) {
    alert($(event.target).text());
  }
};
