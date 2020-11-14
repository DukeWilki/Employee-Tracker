# Employee Tracker

<img src="https://img.shields.io/badge/Licence-MIT%20License-ff69b4">

## Table of Contents
* [Description](#description)
* [Files](#files)
* [Installation](#installation)
* [Usage](#usage)
* [Design](#design)
* [Screenshots](#screenshots)
* [Demo](#demo)
* [License](#license)
* [Contributing Guidelines](#contributing-guidelines)
* [Testing Instructions](#testing-instructions)
* [Questions](#questions)

## Description
Using SQL databases, this application stores basic information of employees and roles within an organisation. Within this application, users can add and remove employees, create new roles and departments and assign managers to users.

## Files
This applictaion is made up of: The main appliucation is run from tracker.js. This project also contains an SQL schema and seed data to get the app started. It also contains npm modules, such as mysql and inquirer.

## Installation
Use the schema and seed data in mySQL Workbench. Open the appliction in the Terminal, and in tracker.js, enter your mySQL password in line 14 of the code. You will need to install several npm packages. Use these commands in the Terminal: npm i ; npm i inquirer ; npm i mysql

## Usage
Once installed, open the app in your terminal with 'node tracker.js'. Use the menu options to navigate and explore the database. To exit, use the 'Exit program' function from the main menu, or press CTRL C if not in the main menu.

## Design
It was more of a basic functional design. Design effort has been put into data integrity. for example:
* Error messages have been written in simple English, 
* Validation on text inputs have been designed to disable attempts of SQL injection.
* Users must reassign a manager's direct reports to remove the manager from the databe (NB not everyone needs a manager in the SQL database, and the only person without one is the CEO in this example. In most day-to-day cases employess have a reporting line so the application asks)
* Lines have been added to make it easy to read

## Screenshots
![Screenshot 1](https://github.com/DukeWilki/Employee-Tracker/blob/master/Assets/removingmanager.JPG)
![Screenshot 2](https://github.com/DukeWilki/Employee-Tracker/blob/master/Assets/addingstaff.jpg)
![Screenshot 3](https://github.com/DukeWilki/Employee-Tracker/blob/master/Assets/changingdetails.JPG)
![Screenshot 4](https://github.com/DukeWilki/Employee-Tracker/blob/master/Assets/salesteam.jpg)

## Demo
A demo of this app is available on https://drive.google.com/file/d/1YcKYhyrvKSW1mLMdfLjIJWWp9hGjTrQy/preview

## License
This application has MIT License applied.

## Contributing Guidelines
Please don't make any contributions right now.

If can contribute to this project, please follow these simple rules:
* Write bug reports with detail, background, and sample code
* Make sure commits have appropriate 
* All changes are covered under MIT License applied to this appliction
* Please respect the authors request if they do not want contributions on this project. 

## Testing Instructions
Make sure you test thoughly prior to uploading to git. Always remember to delete your password prior to committing.

## Questions
Conatct me on gitHub at https://github.com/DukeWilki or email me at N/A for any questions about Employee Tracker.

