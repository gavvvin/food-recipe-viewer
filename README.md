# FoodieHub App

This repository contains the FoodieHub web app, which allows users to browse, create, and rate recipes. Users can cook delicious meals using these recipes. The application has both front-end and back-end components.

## Project Details

The web app consists of the following components:

1. **Front-end**: Built using Next.js and React, the front-end provides a user interface for viewing, creating, and rating recipes. Responsive design has been considered here.
2. **Back-end**: Developed using Node.js, Express, and MongoDB, the back-end handles the fetching, updating, and storing of recipe data.

### Application Features

- View a list of all recipes
- View a single recipe in detail
- Save recipes to favorites
- Create recipes
- View recipes that the user created
- Rate recipes

## Getting Started

Follow the instructions below to set up your development environment and start building your FoodieHub application.

### Prerequisites

- Node.js 12.0 or higher
- yarn
- MongoDB

### Installation

1. Create a MongoDB instance and a recipe database in it.

2. Setting Up Environment Variables

   Create a `.env` file in the root of your project directory and add the following environment variables. Make sure to fill in the appropriate values for your specific setup.

   ```
   MONGODB_ENDPOINT=
   NEXT_PUBLIC_API_ENDPOINT={YOUR_ENDPOINT}/graphql
   ```

3. Install the necessary dependencies:

   `yarn install`

4. Seed the database by first running the back-end server:

   `yarn server:start`

   Then, invoke the API call:

   `PUT {YOUR_ENDPOINT}/seed`


## Running the Application

To start the front-end and back-end components locally, use the following commands:

- Front-end: `yarn dev`
- Back-end: `yarn server:start`

## Linting

To run the linter, use the following command:

`yarn lint`


## Formatting

To format the code, use the following command:

`yarn format`

## Testing

To test the code, use the following command:

`yarn test`

Note: there is an issue with testing, please see _Known Issues_ section below

## Building for Production

To create an optimized build for production, run the following command:

`yarn build`

## Known Issues

- Testing limitations: Currently the `yarn test` command does not execute property. This is believed to be an issue with conflicting yarn packages in the monorepo structure. However, unit test scripts have been written for most components, though remain untested.
- Enhanced error handling: The front-end can be improved to display more meaningful error messages or alternative actions when receiving API responses. Additionally, responses should be modified to return appropriate error codes and messages.
- Image attachment: Users are currently unable to attach images when creating a new recipe.

## Future Features

- Recipe filtering: Implement a filtering functionality for easier recipe discovery.
- Pagination: Introduce pagination to handle a large number of recipes more effectively.
- Grid/List view toggle: Allow users to switch between grid and list views for better screen readability.
- Login system: Create a login system to manage user accounts.
- Recipe editing: Enable users to edit recipes, depending on the login system implementation.
- Unit conversion: Display converted units in the recipe (e.g., °C to °F) when users hover over ingredients.
- Storybook integration: Incorporate Storybook for easier component development and testing.
- End-to-end testing: Develop end-to-end testing scripts to automate the testing process for the entire application.
