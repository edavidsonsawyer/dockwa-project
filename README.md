# README

This is a very basic full stack app built with Rails and React which takes two example text files and renders the data in a sortable table. Over-engineered for demonstration purposes. 

## Requirements
This uses Rails 6 and React 17. To run it you'll need ruby, nodejs, and yarn

## App walkthrough

Here are the interesting/important parts of the app:

### Backend
This is designed as if the back end might regularly consume data from text files and make it available through an API. 

Models: There are two: Customer and Vehicle which are linked. 
Views: There's one view, Home, which does nothing but launch the React app. 
Controllers: The important one is the customers controller, which responds to GET with json containing an array of customers including their vehicles. Although the test files have one vehicle per customer, and the table expects this, the back end will accomodate any number of vehicles per customer. If we wanted to display more vehicles, we could modify the CustomersTable component.

Data import: It's reasonable to assume that any new data sets would be in the same format as the test files, so data import is handled in a helper object in /impoters/data_importer.rb. This could be modified to import txt files with different data in the future without affecting existing functionality. For demonstration purposes this is automatically run in a rake task after initialization, though in a production app it would probably be better to have a scheduled import. 

Tests: All these have basic rspec tests included

### Frontend

The front end has several components with isolated concerns

App: top level component - kept slim here as a best practice, but would be the place to wrap the rest of the application if that were necessary
CustomerList: Handles the api call to the server and passes the raw response to the table component
CustomerTable: Creates the display table and holds the state for sorting the customer list and passes this to the TableList component for sorting.
TableList: The rows for the table. Responsible for sorting the customer rows. 

