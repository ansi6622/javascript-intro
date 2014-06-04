class DrawingsController < ApplicationController

  def index
    render json: Drawing.all
  end

  def create
    @drawing = Drawing.new(params.require(:drawing).permit(:description, :points))
    if @drawing.save
      render json: @drawing
    else
      render json: @drawing.errors
    end
  end

end