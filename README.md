<!-- ABOUT THE PROJECT -->

## About the Project

# Event Scheduling System with Timezone and Overlap Validation

This project focuses on building an Event Scheduling System that allows users to create
and manage events while handling complexities such as timezone management, overlap
detection, and time-sensitive validations. The system will ensure that events are scheduled
properly without conflicts and that they respect the users' time zones.

### Highlights

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Node.js](https://nodejs.org/docs/latest/api/)
- [Prisma.io](https://prisma.io)
- [Express](https://expressjs.com/en/starter/installing.html)
- [Turborepo](https://turbo.build/repo/docs)
- [PostgreSQL](https://www.postgresql.org/docs/current/)
- [BullMQ](https://docs.bullmq.io/readme-1)
- [ioredis](https://github.com/redis/ioredis)
- [rrule](https://github.com/jkbrzt/rrule)
- [Zod](https://zod.dev/)
- [PNPM](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-started/)
- [Day.js](https://github.com/iamkun/dayjs)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run evently.

- Node.js (Version: >=18.x)
- PostgreSQL (Version: >=13.x)
- pnpm _(recommended)_

## Development

### Setup

1. Clone the repo

   ```sh
   git clone https://github.com/sundarshahi/evently.git
   ```

   > If you are on Windows, run the following command on `gitbash` with admin privileges: <br> > `git clone -c core.symlinks=true https://github.com/sundarshahi/evently.git`

2. Go to the project folder

   ```sh
   cd evently
   ```

3. Install packages with pnpm

   ```sh
   pnpm install
   ```

4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`

5. Setup Node
   If your Node version does not meet the project's requirements as instructed by the docs, "nvm" (Node Version Manager) allows using Node at the version required by the project:

   ```sh
   nvm use
   ```

   You first might need to install the specific version and then use it:

   ```sh
   nvm install && nvm use
   ```

   You can install nvm from [here](https://github.com/nvm-sh/nvm).

#### Quick start with `pnpm dx`

> - **Requires Docker and Docker Compose to be installed**
> - Will start a local Postgres instance, redis instance and run the app

```sh
pnpm dx
```

> - **To Proccess Queued Jobs(i.e create instance of recurring event) start worker in seprate terminal**
> - will start worker and start listening for queued jobs.

```sh
 pnpm worker
```

#### Manual setup

1. Configure environment variables in the `.env` file. Replace `<user>`, `<pass>`, `<db-host>`, and `<db-port>` with their applicable values

   ```
   DATABASE_URL='postgresql://<user>:<pass>@<db-host>:<db-port>'
   ```

   <details>
   <summary>If you don't know how to configure the DATABASE_URL, then follow the steps here to create a quick local DB</summary>

   1. [Download](https://www.postgresql.org/download/) and install postgres in your local (if you don't have it already).

   2. Create your own local db by executing `createDB <DB name>`

   3. Now open your psql shell with the DB you created: `psql -h localhost -U postgres -d <DB name>`

   4. Inside the psql shell execute `\conninfo`. And you will get the following info.  
      ![image](https://user-images.githubusercontent.com/39329182/236612291-51d87f69-6dc1-4a23-bf4d-1ca1754e0a35.png)

   5. Now extract all the info and add it to your DATABASE_URL. The url would look something like this
      `postgresql://postgres:postgres@localhost:5432/Your-DB-Name`. The port is configurable and does not have to be 5432.

   </details>

   If you don't want to create a local DB. Then you can also consider using services like railway.app or render.

   - [Setup postgres DB with railway.app](https://docs.railway.app/guides/postgresql)
   - [Setup postgres DB with render](https://render.com/docs/databases)
   - [Setup postgres DB with neon](https://neon.tech/docs/connect/connect-intro)

1. Copy and paste your `DATABASE_URL` to `.env`.

1. Set up the database using the Prisma schema (found in `packages/db/schema.prisma`)

   In a development environment, run:

   ```sh
    pnpm --filter ./packages/db db-migrate
   ```

   In a production environment, run:

   ```sh
   pnpm db-deploy
   ```

1. Run (in development mode)

   ```sh
   pnpm --filter ./apps/api dev
   ```

### API Documentation / Endpoints

#### Events

- POST /api/events - Create a new event
- GET /api/events - Retrieve a list of events

#### Participants

- POST /api/events/{eventId}/rsvp - RSVP to an event
- GET /api/events/{eventId}/participants - List participants of an event

> - **For full API documentation, visit http://localhost:3000/api/docs**

- [Postman collection](https://www.postman.com/orange-sunset-8931/evently/collection/zfzeldu/event-management-api?action=share&creator=8267746&active-environment=8267746-4be25d39-8531-4362-a185-2914795d70bd)
