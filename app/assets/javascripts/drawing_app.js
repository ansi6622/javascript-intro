window.DrawingApp = {

  tracking: false,
  coordinates: [],
  currentCoordinateIndex: 0,
  replayDiv: null,
  trackingDivs: [],
  overlayDiv: null,
  drawings: [],

  initialize: function () {
    $.getJSON("/drawings", this.drawingsWereLoaded.bind(this));
    $(document).on("keypress", this.keyWasPressed.bind(this));
    $(document).on("mousemove", this.trackMovement.bind(this));
    $(document).on("click", ".drawing", this.shapeDrawingWasClicked.bind(this));
    $(document).on("ajax:success", "form", this.drawingWasAdded.bind(this));
    $(document).on("click", ".delete", this.deleteButtonWasClicked.bind(this));
    this.resetForm();
  },

  drawingWasAdded: function (event, drawing) {
    this.drawings.push(drawing);
    this.renderDrawings();
    this.resetForm();
  },

  resetForm: function () {
    $("#create-drawing-button").prop("disabled", true).attr("disabled", "disabled");
    $("#drawing_description").prop("disabled", true).attr("disabled", "disabled");
    $("#drawing_description").val("");
  },

  enableForm: function () {
    setTimeout(function () {
      $("#create-drawing-button").prop("disabled", false).removeAttr("disabled");
      $("#drawing_description").prop("disabled", false).removeAttr("disabled");
      $("#drawing_description").focus();
    }, 10);
  },

  deleteButtonWasClicked: function(event){
    $.ajax({
      url: $(event.target).closest(".drawing").data().drawing.url,
      type: 'DELETE',
      success: function(){
        console.log(arguments);
        $(event.target).closest(".drawing").remove();
      }
    });
    this.clearTrackingDivs();
    this.coordinates = [];
    return false;
  },

  drawingsWereLoaded: function (response) {
    this.drawings = response;
    this.renderDrawings();
  },

  shapeDrawingWasClicked: function (event) {
    this.coordinates = $(event.target).data().drawing.points;
    this.clearTrackingDivs();

    if (this.coordinates.length > 0) {
      this.currentCoordinateIndex = -1;
      this.replayDiv = $("<div>").css({
        height: "20px",
        width: "20px",
        borderRadius: "10px",
        backgroundColor: "gold",
        position: "absolute"
      });
      $("body").append(this.replayDiv);
      this.positionReplayDiv();
    } else {
      alert("This drawing has no associated shape")
    }
  },

  renderDrawings: function () {
    $("#drawings").empty();
    this.drawings.forEach(function (drawing) {
      var $deleteDiv = $('<div class="delete">x</div>');

      var $drawingDiv = $('<div class="drawing">')
        .html(drawing.description)
        .data({drawing: drawing})
        .append($deleteDiv);

      $("#drawings").append($drawingDiv);
    });
  },

  keyWasPressed: function (event) {
    if ($(event.target).is(":not(:text)") && event.which == 115) {
      this.clearTrackingDivs();
      this.toggleTracking();
    }
  },

  trackMovement: function (event) {
    if (this.tracking) {
      var mousePosition = {x: event.clientX, y: event.clientY};
      this.coordinates.push(mousePosition);

      var $otherDiv = $("<div>");
      $otherDiv.css({
        height: "4px",
        width: "4px",
        backgroundColor: "orange",
        position: "absolute",
        left: event.clientX + "px",
        top: event.clientY + "px"
      });
      this.trackingDivs.push($otherDiv);
      $("body").append($otherDiv);
    }
  },

  addOverlay: function () {
    self.overlayDiv = $("<div>").css({
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0
    });
    $("body").append(self.overlayDiv);
  },

  toggleTracking: function () {
    if (!this.tracking) {
      this.addOverlay();
      this.coordinates = [];
      this.trackingDivs = [];
      this.tracking = true;
    } else {
      document.body.style.backgroundColor = "";
      this.tracking = false;
      this.clearTrackingDivs();
      self.overlayDiv.remove();
      $("#drawing_points").val(JSON.stringify(this.coordinates));
      this.enableForm();
    }
  },

  positionReplayDiv: function () {
    this.currentCoordinateIndex++;

    var x = this.coordinates[this.currentCoordinateIndex].x;
    var y = this.coordinates[this.currentCoordinateIndex].y;

    this.replayDiv.css({
      left: x + "px",
      top: y + "px"
    });

    var $otherDiv = $("<div>").css({
      height: "4px",
      width: "4px",
      backgroundColor: "black",
      position: "absolute",
      top: y + "px",
      left: x + "px"
    });
    this.trackingDivs.push($otherDiv);
    $("body").append($otherDiv);

    if (this.currentCoordinateIndex < this.coordinates.length - 1) {
      setTimeout(this.positionReplayDiv.bind(this), 5);
    } else {
      this.replayDiv.remove();
    }
  },

  clearTrackingDivs: function () {
    this.trackingDivs.forEach(function (div) {
      div.remove();
    });
    this.trackingDivs = [];
  }

};