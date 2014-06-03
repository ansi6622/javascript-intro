class PagesController < ApplicationController

  before_action do
    pages = Page.all
    @page = pages.detect { |page| page.path == request.path }
    if @page
      @next_page = pages[pages.index(@page) + 1]
      previous_index = pages.index(@page) - 1
      if previous_index > -1
        @previous_page = pages[previous_index]
      end
    end
  end

end