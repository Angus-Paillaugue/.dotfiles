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

To get started, you can go to [the docs](/docs).

# TODO
 - [x] Backend
   - [x] Add log filtering for receiving logs (in `shared/backend.config.ts`)
   - [x] Add max DB size at witch the oldest logs get deleted
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
 - [ ] Add a way to select logs and analyze them with a SQL like query and a visual thing like PhpMyAdmin
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
