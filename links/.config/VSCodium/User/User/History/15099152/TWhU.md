# Environment variables

# Docker config

# Backend config

The backend configuration is very straight forward and is done in a single file : `shared/backend.config.ts`.

## Server

### IP filtering

By default, when using the package to post logs to the server, only localhost is allowed. Other ip's are filtered. To allow ip's, add the `allowedIps` in the config. This field represents an array of ip's who are allowed to save logs to the database. When an unauthorized server makes a request, a message detailing the request and the server's ip to make it easier to allow it.

## Database

The database object field in the config is made of 4 different fields :
 - `max_database_size` : This field represents the maximum allowed size that the database can grow up to. If this database exceeds this size, the oldest logs will be pruned.
 - `prune_batch_size` : When pruning
 - `prune_interval` :

## SMTP
