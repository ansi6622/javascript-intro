require 'spec_helper'

feature "Tasks management" do
  scenario "User can create a task" do
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
end