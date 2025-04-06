# Apple Calendar clone

> I started this project to remind myself and train my ReactJS and .NET skills by creating a clone of the task manager website. Of course some functions and buttons won't work or will be changed based on my requirements or project idea barrier (won't be able to transfer to other iCloud websites for examples).

## ReadMe stucture

1. [Installation and testing](#installation-and-testing)
2. [Project plans](#project-plans)
3. [Programmer Diary](#developer-diary)

## Installation and testing

*is not available now

## Project plans

### 01.04

- [x] Prepare basic models for the database
- [x] Write necessary controllers for the models
- [x] Test user profile creation functionality
- [ ] Test login and logout functionality for user profiles
- [x] Add code for user session management
- [ ] Test and debug session management functionality

### 02.04

- [x] {debug} Adding "Swagger" for testing API
- [x] {postponed} Test login and logout functionality for user profiles
- [x] {postponed} Test and debug session management functionality
- [x] Write interface code for header, userform, navigation and sidebar
- [ ] Write basic code for the calendar interface
- [ ] Create the first example of adding tasks to the calendar
- [ ] Create the first example of adding and displaying groups, grouping tasks into groups

### 03.04

- [x] {postponed} Write basic code for the calendar interface
- [x] Updating user form interface make it look more like icloud userform
- [x] Rewrite the code for calendar rendering from "Atrium" project
- [x] Connect navbar buttons with calendar
- [x] Write the calendar context for rendering control

### 04.04

- [x] Finish month version of the calendar and make it looks like iCloud as much as possible, *but only in a popup account container*
- [x] Plan and design the way of creating week and day versions of calendar
- [ ] Write new functions in api.js for basic events logic
- [ ] Test new api logic using Swagger

### 05.04

- [x] Write main structure for day calendar
- [x] Write basic styles for the day calendar
- [x] Create the scroll container for event chart

### 06.04

- [x] Restructuring the calendar functions and files for better code orientation
- [x] Upgrade scroll container part *except handling events*
- [x] Upgrade context controller to handle date changeing and smooth page refresh without losing selected view and date
- [x] Write full styles for day calendar *except events objects*
- [x] Write code for small month calendar grid in day calendar

### 07.04

- [ ] Write the main structure for week calendar
- [ ] Write basic styles for the week calendar

- [ ] Analyse and plan the event adding pattern *firstly just with the navbar button*
- [ ] Write all code required for event popup element *firstly just with the navbar button*

### ToDo later

- [ ] {postponed} Create the first example of adding tasks to the calendar
- [ ] {postponed} Create the first example of adding and displaying groups, grouping tasks
- [ ] {postponed} Write new functions in api.js for basic events logic
- [ ] {postponed} Test new api logic using Swagger

## Developer Diary

> In this section, would just like to write down interesting areas of development and writing code for myself in the future.

### Day calendar

On the fourth day of development, having finished with the month version of calendar, I switched to the daily calendar. Since I have already interacted with databases, as well as with regular calendars, this is the first time in the project when I did something radically new and exciting. After studying the structure of this section on the Apple website, I started designing what needed to be implemented next.

``` html
    <div class="calendar-day-view">
        <div class="day-body">
            <div class="day-header">
                <h1>04</h1>
                <span>Friday</span>
            </div>
            <div class="evets-container"> 
                <div class="events-header"> // has massive devider line under it
                    <div class="all-day-line">
                        All day
                    </div>
                    <div class="all-day-events" />
                </div>

                <div class="scroll-container">
                    <div class="day-timline-chart" />
                    <div class="day-event-chart">
                        <div class="event-chart-background"/>
                        <div class="event-column-chart" />
                    <div/>
                    <div class="now-timeline" /> // vertical % translate
                </div>
            </div>
        </div>
        <div class="info-container">
            <div id="month-calendar-mini" />
            <hr />
            <div class="event-info" id="event-info"/>
        </div>
    </div>
```
