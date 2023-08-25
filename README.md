
# Habit_Tracker_App
This appplication is a Fullstack app using Nodejs and Ejs for creating and keeping track on our Habits.
There are two views to see our habits **DAILY** in which list of habits are shown
and **WEEKLY** in which datewise habits are shown where we can mark the status of the habits.
The project is built using a tech stack consisting of Node.js for the server-side scripting, Express for handling HTTP requests and routing,
MongoDB for storing and managing the data, and EJS for rendering the views and templates.

## Features:
 - Add habits
 - delete habit
 - mark as favourite
 - change status of completion in 3 categories:
      + Done - Mark the habit as done for a day
      + Not done - Mark the habit as not done for a day
      + None - User did not take any action on a habit for a day

## Setup project on local system
- clone the project in your local system
  ```
  clone <github-url>
  ```
- Install dependencies using command in your terminal
  ```
  npm install
  ```
- Run your project using command
  ```
  npm start
  ```
  


***
## Folder Structure
```
Habit Tracker
    |
    |               |--->css(contains css files for all ejs files)
    |--->assets---->|--->images(contains images used in app)
    |               |---> js(script for implementing toggle view of habits from daily to weekly)
    |
    |               |--->mongoose.js
    |--->config---->|--->flashMiddleware.js
    |               |--->passport-local-Strategy.js
    |
    |                  |-->habit_controller.js
    |--->controllers-->|-->home_controller.js
    |                  |-->user_controller.js
    |
    |               |-->habit.js
    |--->models---->|
    |               |-->user.js
    |
    |              
    |               |-->user.js
    |--->routes---->|-->habit.js
    |               |--index.js
    |
    |              |--->signUp.ejs
    |--->views---->|--->usignIn.ejs
    |              |--->home.ejs
    |              |--->forgetPassword.ejs
    |              |--->layout.ejs
    |              |--->_header.ejs
    |              |--->_footer.ejs
    |              
    |
    |-->node_modules
    |-->.gitignore
    |-->package.json
    ```
