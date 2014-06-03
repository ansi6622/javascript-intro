class Page

  def self.all
    [
      new("/01-hello-world-inline", "With inline javascript", "Hello World"),
      new("/02-hello-world-script-tag", "With a script tag", "Hello World"),
      new("/03-hello-world-external-script", "With an external script", "Hello World"),
      new("/04-dom-anonymous-functions", "Anonymous functions", "DOM"),
      new("/05-dom-function-variables", "Function Variables", "DOM"),
      new("/06-dom-named-functions", "Named Functions", "DOM"),
      new("/07-dom-functions-in-objects", "Functions in Objects", "DOM"),
    ]
  end

  attr_reader :path, :title, :category

  def initialize(path, title, category)
    @path = path
    @title = title
    @category = category
  end

  def action
    path.gsub("/", "").gsub("-", "_")
  end

end