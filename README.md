# HNI-Fullstack-DevOps-project

## Run the full stack with Docker Compose

From the repository root, run:

```sh
docker compose up --build
```

The frontend is available at <http://localhost:4200>, the backend API at
<http://localhost:8080/api>, and MySQL at `localhost:3307` (mapped to port
3306 inside Docker). The database is
created and seeded from `db_script` when its data volume is initialized. The
MySQL data persists in the `mysql-data` volume between restarts.