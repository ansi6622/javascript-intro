require 'spec_helper'

feature "Tasks management" do
  scenario "User can create a task", js: true do
    Task.create(description: "Grocery shopping!")

    visit '/sample-task-manager'

    within('#tasks') do
      expect(page).to have_content 'Grocery shopping!'
    end

    fill_in 'task[description]', with: 'Walk the doggies.'
    click_button 'Add it!'

    within('#tasks') do
      expect(page).to have_content 'Walk the doggies.'
      expect(page).to have_content 'Grocery shopping!'
    end
  end

  scenario "User can interact with the page using execute_script", js: true do
    # this test wouldn't usually get written, it is simply here
    # to demonstrate the use of execute_script
    visit '/sample-task-manager'

    page.execute_script("$('#tasks').append('<li>Grocery shopping!</li>');")

    within('#tasks') do
      expect(page).to have_content 'Grocery shopping!'
    end
  end
end