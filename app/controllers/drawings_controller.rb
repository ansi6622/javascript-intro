class DrawingsController < ApplicationController

  def index
    render json: Drawing.all.map{|drawing| drawing.as_json.merge(url: drawing_path(drawing)) }
  end

  def create
    @drawing = Drawing.new(params.require(:drawing).permit(:description, :points))
    if @drawing.save
      render json: @drawing.as_json.merge(url: drawing_path(@drawing))
    else
      render json: @drawing.errors
    end
  end

  def destroy
    Drawing.destroy(params[:id])
    render nothing: true
  end

end