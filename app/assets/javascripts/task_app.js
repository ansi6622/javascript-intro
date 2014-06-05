window.TaskApp = {
  initialize: function () {
    $(document).on("ajax:success", "form", this.taskWasAdded.bind(this));
    this.loadTasks();
  },

  taskWasAdded: function (event, task) {
    this.displayTask(task);
  },

  loadTasks: function () {
    $.get('/tasks', this.displayTasks.bind(this));
  },

  displayTasks: function (tasks) {
    tasks.forEach(this.displayTask);
  },
  displayTask: function(task){
    $('#tasks').append("<li>" + task.description + "</li>");
  }
};