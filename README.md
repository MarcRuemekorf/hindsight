# Hindsight

A board management application built with a modern full-stack TypeScript setup. Hindsight lets users create and browse boards, grouped by date, behind a secure authentication layer.

## Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| UI | [Chakra UI v3](https://www.chakra-ui.com/) |
| Auth | [Better Auth](https://www.better-auth.com/) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| Database | [Neon](https://neon.tech/) (PostgreSQL serverless) |
| Forms | React Hook Form + Zod |
| Linter / Formatter | OxLint + OxFmt |
| Container | Docker + Docker Compose |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- A [Neon](https://neon.tech/) database (or any PostgreSQL connection string)
- Node.js 24+ (only needed if running outside Docker)

## Getting started

### 1. Configure environment variables

Create a `.env` file in the project root

### 2. Run with Docker (recommended)

The project ships with a [Taskfile](https://github.com/Enrise/Taskfile) helper. First-time setup:

```bash
./Taskfile init
```

Day-to-day development:

```bash
./Taskfile start   # start containers
./Taskfile stop    # stop containers
./Taskfile restart # clear cache and restart
```

The app will be available at **http://localhost:3000**.

### 3. Run without Docker

```bash
npm install
npm run dev
```