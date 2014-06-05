class TasksController < ApplicationController
  def index
    render json: Task.all.as_json
  end
  def create
    sleep(2)
    task = Task.new(params.require(:task).permit(:description))
    if task.save
      render json: task.as_json
    else
      render json: task.errors
    end
  end

  def destroy
    Task.find(params[:id]).destroy
    redirect_to sample_task_manager_path
  end
end