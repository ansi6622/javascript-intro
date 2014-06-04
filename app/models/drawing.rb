class Drawing < ActiveRecord::Base

  def as_json(*args)
    {
      id: id,
      description: description,
      points: JSON.parse(points.presence || "[]")
    }
  end

end