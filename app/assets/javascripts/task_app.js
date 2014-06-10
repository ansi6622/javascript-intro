window.TaskApp = {
  initialize: function () {
    $(document).on("ajax:success", "form", this.taskWasAdded.bind(this));
    this.loadTasks();
  },

  taskWasAdded: function (event, task) {
    $('#task_description').val("");
    this.displayTask(task);
  },

  loadTasks: function () {
    $.get('/tasks', this.displayTasks.bind(this));
  },

  displayTasks: function (tasks) {
    tasks.forEach(this.displayTask);
  },
  displayTask: function(task){
    var deleteLink = "<a href='/tasks/" + task.id + "' data-method='delete' data-confirm='Are you sure?'>Delete</a>";
    var task = "<li>" + task.description + " " + deleteLink + "</li>";
    $('#tasks').append(task);
  }
};