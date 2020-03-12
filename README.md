# Venture Cafe Drink System Front End Code for bar checkin

VCT_bar_Screenshot.png

## About The Project
This is a project cooperating with Venture Cafe Tokyo. This application keeps track of drink informaiton with users. I am currently working on refactoring and creating visualization tool for drink history. Also, the UI would be updated soon. Once these updates on dev branch is finalized, it would be merged to master (production).

## Getting Started
To run this project, access keys to backend server is required. Currently the keys are hidden because it is using confidential data. This project mainly utilizes latest React Hooks instead of using class component.
This app runs on Netlify.

![VCT_bar_Screenshot](https://user-images.githubusercontent.com/32227575/75651666-ae398180-5c1e-11ea-8479-e8ca9cb93120.png)

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
The naming convention is the following:
Getting multiple documents -> adding List in the end
Each API call name starts with action ex) getAvailableDrinkList
It is removing the "current" keyword because it is confusing. Instead, there are
"Registered Drink": All the drinks that are registered so far.
"Available Drink": The drinks available for a specific event. So, before the event starts, the organizer would pic the drinks from the Registered Drink list. This feature would be implemented in future commits.
"User": User includes everyone who has registered, including admin. Admin would have an admin flag and can access Dashboard.
"Attendee": Attendee is users who attend to a specific event. Once the event is done, they are removed to prevent saving unnecessary personal information. 
"DrinkHistroy": Saves the history of drink consumed. Each row is associated with event and date, so it is easier to query specific types of data such as "drinks consumed around 7 PM from the event happening in Los Angels." 

## Task
Working on renaming and restructuring.

