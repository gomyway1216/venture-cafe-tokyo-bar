# Venture Cafe Drink System Front End Code for bar checkin

VCT_bar_Screenshot.png

## About The Project
This is a project I am building for Venture Cafe. This application consists of 3 parts. 

Backend: 
https://github.com/gomyway1216/venture-cafe-backend

Frontend for user signup:
https://github.com/gomyway1216/venture-cafe-tokyo-signup

Frontend for dashboard at the bar:
this repository.

Backend is responsible for interacting with MongoDB and FrontEnd to handle GraphQL API calls. All the CRUD operations are implemented. 

Frontend for user signup is responsible for creating new users. A new user goes to a link and fills in name and email. Then, the backend would produce a QR code, which is displayed in signup. Then, the user would save it on the phone.

Frontend for dashboard at the bar is in charge of displaying the drink information and handles interaction between users and backend CRUD APIs. First, an admin user has to log in with the email and password. The backend would return token and login to the dashboard, which is valid for a limited time. (This would be updated to keep the token valid while opening the application.)

Then, the admin would select the event. If the event does not exist, he/she will create one. The event likely needs to be built at the beginning.

After selecting an event, it redirects to the dashboard where the attendee list is displayed with the count of drinks on the left side and the available drink list for the day on the right side. (The UI might be updated.)

The admin would scan the QR code that the user has on their phone. If it is the first time, the user would be checked into the Attendee list. If not, it would just find from the table. 

![VCT_bar_Screenshot](https://user-images.githubusercontent.com/32227575/75651666-ae398180-5c1e-11ea-8479-e8ca9cb93120.png)

## Getting Started
To run this project, access keys to backend server is required. Currently the keys are hidden because it is using confidential data. This project mainly utilizes latest React Hooks instead of using class component.
This app runs on Netlify.


### Prerequisites
Node, Access Keys to server

### Installing
This would install all the dependencies
```
$ npm install
```

### Running Locally
```
$ npm start
```
This app runs on [localhost:3000](http://localhost:3000/).


## Language and libraries
JavaScript, React, GraphQL

## Logistics
This pull request updates all the old API calls and transfers them to the new ones. In addition, it changes the names of some components to match the ones in the backend.
<br />
The naming convention is the following:
<br />
Getting multiple documents -> adding List in the end
<br />
Each API call name starts with action ex) getAvailableDrinkList
<br />
It is removing the "current" keyword because it is confusing. Instead, there are"Registered Drink": All the drinks that are registered so far.
<br />
"Available Drink": The drinks available for a specific event. So, before the event starts, the organizer would pic the drinks from the Registered Drink list. This feature would be implemented in future commits.
<br />
"User": User includes everyone who has registered, including admin. Admin would have an admin flag and can access Dashboard.
<br />
"Attendee": Attendee is users who attend to a specific event. Once the event is done, they are removed to prevent saving unnecessary personal information. 
<br />
"DrinkHistroy": Saves the history of drink consumed. Each row is associated with event and date, so it is easier to query specific types of data such as "drinks consumed around 7 PM from the event happening in Los Angels." 
<br />

## Task
CSS styling.

