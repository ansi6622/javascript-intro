class TasksController < ApplicationController
  def index
    render json: Task.all.as_json
  end
  def create
    task = Task.new(params.require(:task).permit(:description))
    if task.save
      render json: task.as_json
    else
      render json: task.errors
    end
  end
end