window.DrawingApp = {

  tracking: false,

  coordinates: [],

  currentCoordinateIndex: 0,

  replayDiv: null,

  trackingDivs: [],

  overlayDiv: null,

  getStarted: function () {
    document.getElementById("range-slider").value = 5;
    document.addEventListener("keypress", this.keyWasPressed.bind(this));
    document.addEventListener("mousemove", this.trackMovement.bind(this));
    document.getElementById("replay").addEventListener("click", this.replayButtonWasPressed.bind(this));
  },

  keyWasPressed: function (event) {
    if (event.which == 115) {
      this.clearTrackingDivs();
      this.toggleTracking();
    }
  },

  trackMovement: function (event) {
    if (this.tracking) {
      var mousePosition = {x: event.x, y: event.y};
      this.coordinates.push(mousePosition);

      var otherDiv = document.createElement("div");
      otherDiv.style.height = "4px";
      otherDiv.style.width = "4px";
      otherDiv.style.backgroundColor = "orange";
      otherDiv.style.position = "absolute";
      otherDiv.style.top = event.y + "px";
      otherDiv.style.left = event.x + "px";
      this.trackingDivs.push(otherDiv);
      document.body.appendChild(otherDiv);
    }
  },

  replayButtonWasPressed: function (event) {
    if (this.coordinates.length > 0) {
      this.clearTrackingDivs();
      this.currentCoordinateIndex = -1;
      this.replayDiv = document.createElement("div");
      this.replayDiv.style.height = "20px";
      this.replayDiv.style.width = "20px";
      this.replayDiv.style.borderRadius = "10px";
      this.replayDiv.style.backgroundColor = "gold";
      this.replayDiv.style.position = "absolute";
      document.body.appendChild(this.replayDiv);
      this.positionReplayDiv();
    } else {
      alert("You must draw something before I can replay it!")
    }
  },

  addOverlay: function () {
    self.overlayDiv = document.createElement("div");
    self.overlayDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    self.overlayDiv.style.position = "absolute";
    self.overlayDiv.style.width = "100%";
    self.overlayDiv.style.height = "100%";
    self.overlayDiv.style.top = 0;
    self.overlayDiv.style.left = 0;
    document.body.appendChild(self.overlayDiv);
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

    this.replayDiv.style.left = x + "px";
    this.replayDiv.style.top = y + "px";

    var otherDiv = document.createElement("div");
    otherDiv.style.height = "4px";
    otherDiv.style.width = "4px";
    otherDiv.style.backgroundColor = "black";
    otherDiv.style.position = "absolute";
    otherDiv.style.top = y + "px";
    otherDiv.style.left = x + "px";
    this.trackingDivs.push(otherDiv);
    document.body.appendChild(otherDiv);

    if (this.currentCoordinateIndex < this.coordinates.length - 1) {
      setTimeout(this.positionReplayDiv.bind(this), document.getElementById("range-slider").value);
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