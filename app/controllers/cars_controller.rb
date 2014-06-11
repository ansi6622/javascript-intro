class CarsController < ApplicationController
  def index
    cars = if params[:q].present?
             Car.where(description: params[:q])
           else
             Car.all
           end
    if cars.empty?
      render json: {error: 'No cars found!'}, status: 404
    else
      render json: cars
    end
  end

  def create
    car = Car.new(params.require(:car).permit(:description))
    if car.save
      render json: car
    else
      render json: car.errors
    end
  end
end