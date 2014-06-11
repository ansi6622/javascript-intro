class TasksController < ApplicationController
  def index
    render json: Task.all
  end
  def create
    sleep(2)
    task = Task.new(params.require(:task).permit(:description))
    if task.save
      render json: task
    else
      render json: task.errors
    end
  end

  def destroy
    Task.find(params[:id]).destroy
    redirect_to sample_task_manager_path
  end
end