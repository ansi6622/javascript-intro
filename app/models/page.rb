class Page

  def self.categories
    {
      "Hello World" => "Learn about events, <code>console.log</code> and <code>alert</code> and <code>innerHTML</code>",
      "DOM" => "Learn about the DOM",
      "Sample Apps" => "See some more complex JS in action",
    }
  end

  def self.all
    [
      new("/hello-world-inline", "With inline javascript", "Hello World"),
      new("/hello-world-script-tag", "With a script tag", "Hello World"),
      new("/hello-world-external-script", "With an external script", "Hello World"),
      new("/hello-world-organized", "With code in an external file, organized into a JavaScript object", "Hello World"),

      new("/dom-function-variables", "With Function Variables", "DOM"),
      new("/dom-named-functions", "With Named Functions", "DOM"),
      new("/dom-functions-in-objects", "With Functions in Objects", "DOM"),

      new("/sample-drawing-app", "Sample Drawing App", "Sample Apps"),
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