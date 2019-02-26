# Project Name
Bars&Beers
## Description

An app to find bars with your favourite beers.
 
## User Stories (MVP)

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn't exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **Sign up** - As a user I want to sign up on the webpage so that I can create my profile and add my favourte beers
- **Login** - As a user I want to be able to log in on the webpage so that I access the webpage/app
- **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **Beers list** - As a user I want to see all the beers available so that I can choose which bars have this beer
- **Bar create** - As a user I want to create a bar so that I can populate the list of bars with certain beers
- **User detail** - As a user I want to see the user details and check his/her favourte beers


## Backlog

List of other features outside of the MVPs scope

User profile:
- Add ratings and reviews and pictures of each bar
- List of favourite beers as per the ratings


Bar profile:
- Add its average ratings
- Include reviews and pictures from users

Geo Location:
- add geolocation to bars when creating
- show bar in a map in bar detail page
- show all bars in a map in the bar list page

Homepage:
- Search and finding bars per different filters (type of beer, Location, ratings, ...)


## ROUTES:  Ejemplo de tabla de cómo debe quedar

| Method      | Description | Test Text     |
| :---        |    :----:   |          :---:|
| GET         | /           | Renders the homepage   |
| GET         | /auth/signup|redirects to /signup
| POST        | /auth/signup|redirects to /barsandbeers         |
| GET        | /auth/login  |redirects to /login|
| POST        | /auth/login|redirects to /barsandbeers|
| GET        | /barsandbeers/main|redirects to /listbeers|
| GET        | /barsandbeers/main|redirects to /listusers|
| GET        | /barsandbeers/main|redirects to /createbar|
| POST        | /barsandbeers/createbar|redirects to /barsandbeers/main|
| GET        | /barsandbeers/listbeers|redirects to /listbeers/listbars|
| GET        | /barsandbeers/listbeers/listbars|redirects to /listbars/update|
| POST        | /barsandbeers/listbeers/listbars/update|redirects to /listbeers/listbars|
| POST        | /barsandbeers/listbeers/listbars/delete|redirects to /listbeers/listbars|


- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty
    - user not exists
  - create user with encrypted password
  - store user in session
  - redirect to /events
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty
    - user exists
    - passdword matches
  - store user in session
  - redirect to /events
- POST /auth/logout
  - body: (empty)
  - redirect to /events

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
  - validation
    - fields not empty
  - create event
  - redirect to event details
- GET /events/:id
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - validation
    - id is valid (next to 404)
    - id exists (next to 404)
  - body: (empty - the user is already stored in the session)
  - store in attendees if not there yet
  - redirect to event details

## Models

User model
 
```
username: String
Email: String
password: String
neighbourhood: String
draft or bottled beer: String
favourite beers: [ObjectId<Beer>]
Bar created: [ObjectId<Bar>]
```

Bar model

```
name: String
description: String
location: String
address: {
Street: String
Neighbourhood: String
City: String
}

```

Beer model

```
name: String
barDraft: [ObjectId<Bar>]
barBottle:[ObjectId<Bar>]

```

## Links

![picture](/https://www.dropbox.com/s/pyqom5wjp0b22m4/wildframes_App.jpeg?dl=0)

### Trello

https://trello.com/appbarsbeers

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides
![picture](/wildframes_App.jpeg)

The url to your presentation slides

[Slides Link](http://slides.com)

