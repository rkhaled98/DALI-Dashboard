# DALI Dashboard
### By Rafi Khaled

To peruse a live version of this repository, click the [link in the description](http://rafis-dali-dashboard.herokuapp.com/). 

### What is this?

This is a dashboard made to help people learn more about the DALI Lab and the people who work there!

### Features

- View DALI Lab members as they scroll across the screen in most web browsers
- Data is retrieved from DALI's official JSON file of members
- Search for a specific DALI Lab member by name
- Click on a DALI Lab member's image to see:
  - A map representing the member's latitude and longitude
  - Whether or not the member is a staff member; If not, what project they are working on
  - What terms the member has been on for
  - A quote from the member
  - A link to the member's website, preceded by their name.

### Issues

Due to fluctuations in the speed of the hosting service and an issue with synchronizing the carousel, you may need to refresh the page to view it. If you see a list of vertical images, then the page did not loaded correctly, although it is still fully functional. Fixing this would be the next step for this project.


### Running

Again, you can see a live version [here](http://rafis-dali-dashboard.herokuapp.com/). If you would like to test this project locally (you will still need connection the internet to load the JSON), follow the below instructions.

You must have meteorJS web framework installed. 

Run `meteor --port 3000` or use the port of your choice in the cloned directory.

In a web browser, visit [localhost:3000](http://localhost:3000/) using the port that you chose in the above command.
