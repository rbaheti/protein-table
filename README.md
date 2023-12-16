# Protein Sample data

React single page application that is used to display protein sample data in a table. This app demonstrates the use of GraphQl on the client side, react-router, pagination and navigation.

# Libraries Used

1. `react-router-dom` to route the data when Navigation tabs are clicked.
2. `react-bootstrap` to make the app beautiful.
3. `appolo-client` & `graphql` to interact with the GraphQl api to fetch and display data.

# Data

The app fetches data from the graphql server: `http://35.92.236.234:9190/graphql`

# Future Work

1. Make the UI same as the mocks provided via Figma.
2. Add unit tests to test the application code.
3. Make pagination work without calling useQuery. We are calling it right now since we don't know the exact number of protein samples count. This count is use for pagination.
4. Modify code to incluse variables for static values.

## How to install and run the app:

1. `npm i` // To install all package dependencies.
2. `npm start` // To start the app.
3. Visit `http://localhost:3000/` in your browser.
