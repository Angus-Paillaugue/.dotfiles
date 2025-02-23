# Logify

To run the project, just run `./run.sh`.

# TODO
 - [x] Docker
   - [x] Containerize the backend
   - [x] Containerize the database
   - [x] Containerize the frontend
 - [x] Make the UI more pleasant (always WIP)
 - [x] Add log filters
 - [ ] Logs details
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
   - [ ] Write a privacy policy
   - [ ] Write terms of services
   - [x] Make graphs of received logs
   - [ ] Homepage
     - [x] Add hero
     - [ ] Add bento
     - [ ] Add footer
     - [x] Add a navbar
 - [ ] Others
   - [ ] Add comments to code
 - [ ] Make better log details modal tables
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
 - [ ] Analytics dashboard
   - [ ] Make different graphs presets
   - [ ] Add ability for users (Admins/Owner) to create their dashboards :
     - [ ] Custom queries
     - [ ] Custom graphs types
     - [ ] Drag and drop graphs around the dashboard
