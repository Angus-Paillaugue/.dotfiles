# Logify

Logify is a powerful platform designed to help you log, analyze, and visualize your data with ease. It offers enterprise-grade features and is completely free and open source. Logify is Docker-powered, making it easy to deploy and manage.

## Features

- **Self-hosted**: Host Logify on your own infrastructure.
- **Real-time logs**: View logs in real-time as they are generated.
- **SQL Editor**: Query your logs using a built-in SQL editor.
- **Server Monitoring**: Monitor server status and receive alerts.
- **User Management**: Manage user accounts and permissions.
- **Dark/Light Mode**: Toggle between dark and light themes.
- **Export Logs**: Export logs to JSON or CSV formats.
- **Dashboard**: Create and manage custom dashboards.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/package-manager) (version 20 or later)
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started)

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/Angus-Paillaugue/Logify
cd Logify
```

### 2. Install Dependencies
Next, install the necessary dependencies by running:

This will install all required packages for the project.

### 3. Run the Setup Script
Once the dependencies are installed, run the setup script to initialize your project:

This script will guide you through the initial configuration of your project.

### 4. Start the Development Server
Now, start the development server to begin editing your documentation:

This command will launch the SvelteKit development server, allowing you to view your documentation locally at localhost:5173.

### 5. Running the Project with Docker
To start your own Logify instance using Docker, first configure it by editing the .env file and the docker-compose.yaml file. Then run the run.sh script:

This script will set environment variables, pass them to the containers, and build the containers.

### Conclusion
That's it! You're now ready to start building your documentation with Logify. As you continue developing, you can take full advantage of the customization options and features provided by this template.

If you encounter any issues or have questions, please refer to the project's documentation or reach out for support.

# TODO
 - [x] Docker
   - [x] Containerize the backend
   - [x] Containerize the database
   - [x] Containerize the frontend
 - [x] Make the UI more pleasant (always WIP)
 - [x] Add log filters
 - [x] Logs details
   - [x] Add log deleting
   - [x] Add log rotation
   - [x] Add log deletion
   - [x] Add realtime toggle
   - [x] Implement log pagination
   - [x] ~~Add log sorting~~
 - [x] Add authentication
 - [x] Backend
   - [x] Add log filtering for receiving logs (in `shared/backend.config.ts`)
   - [x] Add max DB size at witch the oldest logs get deleted
   - [x] Add email alerts
   - [x] Add known server ids cache invalidation on the server
   - [x] Add authentication on the post routes in the backend
 - [ ] Frontend
   - [x] Add skeleton loader
   - [x] Add server statistics
   - [x] Add account settings
   - [x] Make an error page
   - [x] Add dark/light mode toggle in user dropdown
   - [x] Make a logo
   - [x] Make better log details modal tables
   - [ ] Write a privacy policy
   - [ ] Write terms of services
   - [x] Make graphs of received logs
   - [ ] Add export to all tables
   - [x] Homepage
     - [x] Add hero
     - [x] Add bento
     - [x] Add footer
     - [x] Add a navbar
 - [ ] Others
   - [ ] Add comments to code
 - [x] Add guest account management (Listing and deletion)
 - [x] Database querying
   - [x] Make the page
   - [x] Add a text field for user input
   - [x] Add a results table
   - [x] Add a database structure graph
   - [x] ~~Add a warning when fetching a large number of rows~~
   - [x] Make the layout resizeable
   - [x] Add query history in localStorage
   - [x] Add text highlighting like in an IDE to the text input
   - [x] Add pagination if necessary
   - [x] ~~Add error highlighting in the textfield when an error occurs with the query~~
   - [x] Make the page responsive
   - [x] Export
     - [x] Export to JSON
     - [x] Export to CSV
     - [x] Export currently displayed logs
     - [x] Export All logs matching query
 - [ ] Add a way to select logs and analyse them with a SQL like query and a visual thing like PhpMyAdmin
 - [x] Server monitoring
   - [x] Add periodic server check and insert status in a new table to then display analytics
   - [x] Add editing to the server on the frontend
   - [x] Add deletion of a server
   - [x] Make a servers list page
   - [x] Make a single server page
   - [x] Change edit server modal into a Sheet (Side modal)
 - [x] Roles
   - [x] Add permission management
 - [ ] Logs searching
   - [x] Add logs searching
   - [x] Add pagination
   - [ ] Make a more competent searching algorithm
 - [ ] Dashboards
   - [ ] Add dashboard
   - [ ] Edit dashboard
   - [ ] Delete dashboard
   - [x] Add card
   - [x] Edit card
   - [x] Delete card
   - [x] Move cards
   - [x] Table card
   - [ ] Graph card
 - [ ] Packages
   - [x] NPM
   - [ ] (WIP) Python
   - [ ] Java
   - [ ] PHP
