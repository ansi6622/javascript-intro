class Page

  def self.categories
    {
      "Hello World" => "Learn about events, <code>console.log</code> and <code>alert</code> and replacing html",
      "DOM" => "Learn about the DOM",
      "Sample Apps" => "See some more complex JS in action",
    }
  end

  def self.all
    [
      new("/hello-world", "With code in an external file, organized into a JavaScript object", "Hello World"),

      new("/dom-manipulation", "With Functions in Objects", "DOM"),

      new("/sample-drawing-app", "Sample Drawing App", "Sample Apps"),
      new("/legacy-events", "Working with legacy events", "Sample Apps"),
      new("/sample-task-manager", "Sample Task Manager", "Sample Apps"),
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