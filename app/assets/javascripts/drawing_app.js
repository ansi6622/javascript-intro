window.DrawingApp = {

  tracking: false,
  coordinates: [],
  currentCoordinateIndex: 0,
  replayDiv: null,
  trackingDivs: [],
  overlayDiv: null,

  getStarted: function () {
    $("#range-slider").val(5);
    $(document).on("keypress", this.keyWasPressed.bind(this));
    $(document).on("mousemove", this.trackMovement.bind(this));
    $(document).on("click", "#replay", this.replayButtonWasPressed.bind(this));
  },

  keyWasPressed: function (event) {
    if (event.which == 115) {
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

  replayButtonWasPressed: function (event) {
    if (this.coordinates.length > 0) {
      this.clearTrackingDivs();
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
      alert("You must draw something before I can replay it!")
    }
  },

  addOverlay: function () {
    $("body").append($("<div>").css({
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0
    }));
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
      setTimeout(this.positionReplayDiv.bind(this), $("#range-slider").val());
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