# AFRY Test App Client

This project is part of my technical recruitment task for AFRY.

I created 2 separate repositories for the frontend and backend code. This is the code for the frontend. For simplicity I wrote one single README for both repositories here. You can find the repository for the backend code [here](https://github.com/vogelsara/afry-app-functions).

## Description of the task

This is exactly what I got as the description of the task:

> **Frontend test**
>
> Develop a simple web application with the following three views and features. You choose the framework and technology yourself according to what you deem appropriate, unless we have requested that you use a certain specific framework. The focus should be on choosing a modern framework / technology, and showing that you master these and structure your code with good architecture that is easy to follow.
>
> The program must keep all data in some form of database (of any kind, for example local storage, file on hard disk, conventional database or cloud service). This storage should make it possible to restart the program / reload the page, without losing information.
>
> In order for us to run your code, it should, and any dependencies, be able to be installed and started with npm or equivalent without requiring other software to be installed globally. We prefer that the code is sent to us in the form of a link to your code on github or equivalent before receiving it as a .zip file or similar.
>
> The web application should have the following views:
>
> **View 1**
>
> Here the user can create a person. A person has a name and can be associated with a company (companies are created in view 2).
>
> **View 2**
>
> Here the user can create a company. A company should only have "names" as attributes. Here the user should also be able to choose a company and then get all employees listed. In that listing, it should also be possible to remove an employee from the company. Then, the employee should no longer be associated with the company, but the person should remain in the system without any connection to any company (as if you created a person in view 1 without choosing a company).
>
> **View 3**
>
> Here is a list of all people who are not linked to companies, and have the opportunity to link them to one of the companies created in view 2.

## Technical solutions

I used [Firebase platform](https://firebase.google.com/) to build my app. This is a platform from Google to create mobile and web applications. It comes with a set of services and uses a serverless architecture. For the backend code you need to write Cloud Functions which run when they are triggered, and stop when finished, and get resources from the cloud on demand. (Unlike a traditional server which runs continuously.)

I used these services:

-   **Firestore** real time NoSQL database
-   **Cloud Functions**
-   **Hosting** for the client code

I used the firestore toolkit to initialize, configure and deploy my application to the cloud.

I separated the frontend and the backend, because these can be 2 independently developed applications using their own technologies and versions. Technically mobile apps or 3rd party integrations could use this backend, independently from the frontend.

### Backend

The backend code esposes a REST API publicly to create and read companies and people and modify people.

The backend is built in [NodeJS](https://nodejs.org/en/). I used [express framework](https://expressjs.com/) to create API endpoints.

In the backend code I wrote tests in [Mocha](https://mochajs.org/) test runner with [Chai](https://www.chaijs.com/) assertion library. I wrote integration tests, which test the API functions together with the database. The functions are so simple and directly read and write from and to the database that I didn't find it important to write unit tests for them.

### Frontend

I built the frontend in [React](https://reactjs.org/), using [Redux](https://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/). I bootstrapped the app with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

Create React App comes with [Jest](https://jestjs.io/) test runner. Considering the simple tests I used in this project I found it easier to use it than to unify frontend and backend tests and change to Mocha. I used simple smoke test for my components just to see if they render without an error, but of course Jest can be used for much more, especially with mocking API calls.

I also installed [Cypress](https://www.cypress.io/), which is a great end-to-end test tool, and even wrote a simlpe "test" in it which just visits the startpage. This test is written in a "Hello World" manner, showing that it works, we have end-to-end browser tests and if this was a real project, one could just start adding test code.

For the API requests I used [axios](https://github.com/axios/axios), mostly because it provides a syntax similar to Express, and it gives a nice consistency between frontend and backend.

I used Google's [Material UI](https://material-ui.com/) to build the UI.

During the development, (among other tools) [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) formatter was for my help.

## Considerations

### What was important to me

-   To show the whole suite, and my knowledge about React, Redux, testing, nice code structure
-   To have different levels of automated tests
-   To nicely document the project both the docstring (where needed) and the README level
-   To have a well versioned project where it's not only easy to track how the code evolved, but Git is also an aid for me in the development
-   To work with modern tools and modern architecture
-   To write clean, readable, extendable and easy to debug code
-   To write fully functioning code, which provides the solution to the task as a minimum

### What was not important to me

-   To have full test coverage. It was more important to show I am able to write tests in different levels and know different frameworks than to actually cover every functionality.
-   To have a unique and nice UI. I am able to work well with CSS, design my own look and feel and build responsive and good looking interfaces. It was a concious decision in this project to concentrate on functionality and use Material UI elements as they are.
-   To build the perfect product. I could add API endpoints to modify companies, delete people or companies, add buttons for these.

## How to try

### Live

You can visit the app live at https://afry-test.web.app/

### Locally

It's a bit harder to run the backend locally, because of the nature of Firebase. You can either try it or make the client code talk to the real API.

#### Run the backend locally

You need to have Firebase CLY installed. If you don't have it, you can

`npm install -g firebase-tools`

Clone the backend repository:

`git clone https://github.com/vogelsara/afry-app-functions`

Go to the folder

`cd afry-app-functions`

You need to `npm install` in the `functions` folder.

Start the emulators:

`firebase emulators:start`

This will use a bunch of ports. If there is a conflict, you can edit them in `firease.json`.

It will start a graphical UI in localhost:4000 (or on the port set in `firebase.json`) where you can edit the database and see the logs for the functions.

The API will wait for requests at http://localhost:5001/afry-test/europe-west1/api

After that, you can run the tests by `npm run test` in the `functions` folder. The emulators need to be running and the (local) database need to be empty when running the tests. You have to do these manually before running the tests.

#### Connect local client to the real server

The real API is available at https://europe-west1-afry-test.cloudfunctions.net/api. The client connects to the localhost address if itself runs on localhost, and to the real address otherwise. To change this, you have to paste the URL to the real one in `src/App.js` on line 17.

#### Run the client locally

You have to clone the client repository:

`git clone https://github.com/vogelsara/afry-test-client`

Go to the folder:

`cd afry-test-client`

Then

`npm install`

After that you can start up the app by issuing

`npm start`

This will start a local server and publish the app on port 3000.

You can run the unittests by

`npm test`

and can open Cypress and run it's end-to-end test by

`./node_modules/.bin/cypress open`

Note that the Cypress test need both the backend's emulators and the frontend's live server running. You need to start these manually.

## API documentation

Base URL: https://europe-west1-afry-test.cloudfunctions.net/api

Endpoints:

`GET /people`:

returns

```
[
    {
        "id": "3gA1PIensclrUz5ikyma",
        "name": "Person With Company",
        "companyId": "fzAmSo92WlMt9fG8IaWD",
        "createdAt": "2021-05-20T00:11:37.319Z"
    },
    {
        "id": "4p2Eow9vcQowpYN6iIUU",
        "name": "One Person",
        "companyId": "",
        "createdAt": "2021-05-20T00:11:21.557Z"
    }
]
```

`POST /person`

Input:

```
{
    "name": "One Person",
    "companyId": "",
}
```

Returns the created resource:

```
{
    "id": "4p2Eow9vcQowpYN6iIUU",
    "name": "One Person",
    "companyId": "",
    "createdAt": "2021-05-20T00:11:21.557Z"
}
```

`PUT /person/:personId`

Input:

```
{
    "companyId": "",
}
```

The body of the request can contain either `companyId`, or `name`. If only one of these are provided, the other remains unchanged. If other fields are present, they are ignored.

Returns the updated resource:

```
{
    "id": "4p2Eow9vcQowpYN6iIUU",
    "name": "One Person",
    "companyId": "",
    "createdAt": "2021-05-20T00:11:21.557Z"
}
```

`GET /companies`

Returns:

```
[
    {
        "id": "I4Iwx7XASFHdOOgaITCB",
        "name": "Another Company",
        "createdAt": "2021-05-20T00:16:21.798Z"
    },
    {
        "id": "fzAmSo92WlMt9fG8IaWD",
        "name": "A Company",
        "createdAt": "2021-05-20T00:11:27.219Z"
    }
]
```

`POST /company`

Input:

```
{
    "name": "A Company",
}
```

Returns the created resource:

```
{
    "id": "fzAmSo92WlMt9fG8IaWD",
    "name": "A Company",
    "createdAt": "2021-05-20T00:11:27.219Z"
}
```

## Room for improvement

There are many thing which I would do better in a real life project.

### Testing

-   There can be more tests written to catch functional problems
-   Some tests need manual setup. Scripts can be written to automate these and have single commands to run them and clean up. This would be also good for CD/CI in a real life project.

### API

I only created the endpoints needed for the task.

-   It's not possible to delete anything
-   It's not possible to modify a company
-   It's not possible to get information about a single person or company

### UI

-   The UI elements are not arranged nicely and a lot of CSS improvement could be done. I did it like that to limit my time and concentrate on functionality and showing my knowledge with React, Redux, Firebase, testing, etc.

### Functionality

-   Only I can delete created companies and people via the Firebase console

### Security

-   These is sensitive information (API key and configuration) in committed code in the backend. This should go to a separate config file, ignored by Git. Since this project doesn't mean real risk, I found it simpler to leave it like that, but here I note that I know about the issue and know how to solve it.
-   The Cloud Functions are available for anyone on the internet. You can restrict their availability in [Google Could Platform](https://cloud.google.com/) which is higly recommended in real projects.
