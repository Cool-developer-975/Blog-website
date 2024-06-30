# Blog Web Application

## Overview

This project is a full-featured blog web application built with Node.js and Express. It allows users to sign up, log in, create, edit, and delete blog posts. Users can also view all their blogs on a dashboard. The application uses MongoDB for data storage and EJS as the templating engine.

## Features

- **User Authentication:** Secure user sign-up and login functionality.
- **Blog Management:** Users can create, edit, and delete their blog posts.
- **User Dashboard:** A personalized dashboard where users can view all their blogs.
- **File Uploads:** Users can upload images for their blog posts.
- **Middleware for Authentication and Error Handling:** Ensures secure and smooth operation of the application.

## Prerequisites

- **Node.js:** Version 14 or higher.
- **npm:** Version 6 or higher.
- **MongoDB:** Ensure MongoDB is installed and running on your local machine or accessible via a URI.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017
    DBNAME=your-database-name
    ACCESS_TOKEN_SECRET=your-secret-key
    ```

4. **Start the application:**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

## Project Structure

- `src/index.js`: Entry point of the application. Connects to the database and starts the server.
- `src/app.js`: Sets up the Express application, middleware, and routes.
- `src/db/db.js`: Contains the database connection logic.
- `src/routes/user.routes.js`: Defines routes for user-related operations.
- `src/middlewares/authenticate.js`: Middleware for user authentication.

## Usage

1. **Access the application:**

    Open your web browser and navigate to `http://localhost:3000`.

2. **User Authentication:**

    - Sign up or log in to access the user dashboard.

3. **Blog Management:**

    - Create, edit, and delete blogs from the user dashboard.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Express.js
- MongoDB
- EJS
- JWT