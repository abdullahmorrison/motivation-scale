<h1><img width=400 src="https://github.com/abdullahmorrison/motivation-scale/assets/49528805/1963ecbb-16de-44f8-bd7c-1a81ddd29770" /></h1>

<p>A mindfulness tool that helps users visualize a mental framework for how their motivation affects their emotions (and vice versa).</p>

Track a goal, place it on the scale between *chasing success* and *avoiding failure*, and watch how that position lines up with how you actually feel. Available on the web and as an Android app, sharing one GraphQL backend.

**[Read the guide to the framework →](./guide.md)**

## What problem does this solve?

***This tool prevents your emotions from getting in the way of your goals through self-awareness. Here's an example:***
<p>
  In University, I was procrastinating studying for a test I had the following day. When I could not put it off any longer and started to study, I realized that I vastly underestimated how much studying I needed to do.
</p>
<p>
  That put me into the following anxiety death-spiral:
</p>
<br/>
<div align="center">
  <img width=600 src="https://github.com/user-attachments/assets/d57e411d-e229-4fe0-af85-3c5d58401b1f" />
</div>
<br/>
<p>
  This went on for hours without any studying being accomplished until I just gave up, decided to go to sleep, and accept whatever grade I got. That caused me to evaluate all the ways my emotions can affect the way I pursue my goals, which led me to create a framework for understanding this so that scenario never happens again. That framework is called the Motivation Scale!
</p>
<p>
  The framework was helpful, but it was difficult to keep track of all my goals and their correlation to my mood, so I created this tool to do that.
</p>

## Tech Stack

| Surface | Stack |
| ------- | ----- |
| **Website** | Next.js 13 (App Router) · React 18 · Apollo Client · SCSS · TypeScript |
| **Mobile** | React Native 0.86 · Expo SDK 57 · Apollo Client · React Navigation · EAS Build |
| **Server** | Node · TypeScript · Apollo Server · Nexus (code-first schema) · Mongoose · JWT · Jest |
| **Data** | MongoDB 6 |
| **Infra** | Docker Compose · Tailscale |

## Architecture

<p align="center">
  <img src="architecture.svg" width="880" alt="The mobile app and a browser reach a Mac machine over Tailscale, which fronts the GraphQL server, MongoDB, and the Next.js server" />
</p>

The outlined box is a single Mac machine running Ubuntu, reachable over Tailscale at `abdullah-morrison-macbook-pro.tail4e587b.ts.net`. The GraphQL server and MongoDB run there as containers via `compose.yaml`; the Next.js server runs alongside them.

The browser sits outside that box — it's the visitor's own machine. It downloads pages from the Next.js server, then calls the GraphQL API from JavaScript, exactly as the mobile app does. Both clients therefore talk to the same GraphQL endpoint: the server signs a JWT on login/signup, every subsequent request carries it in the `Authorization` header, and the server verifies it in the Apollo context before any resolver runs.

Only the GraphQL API is fronted by `tailscale serve` with TLS on :443. The Next.js server is reached directly on :3000 over the tailnet.

**Data model** — `User` (id, email, hashed password) · `Scale` (id, userId, goal, slider value, chasing-success + avoiding-failure descriptions) · `ScaleOrder` (userId, scaleIds[])

## Repository layout

```
server/     GraphQL API — Nexus schema in src/graphql, Mongoose models in src/models
website/    Next.js app — App Router pages in src/app, queries in src/queries
mobile/     Expo app — screens in screens/, shared queries + context in utils/
compose.yaml  Server + MongoDB for local development
```

# Local Setup

Clone the repo:

```
git clone https://github.com/abdullahmorrison/motivation-scale.git
```

**Prerequisites:** [Docker](https://docs.docker.com/desktop/) and Node.js. For mobile, also [Android Studio](https://developer.android.com/studio/install) and a [React Native / Expo environment](https://reactnative.dev/docs/set-up-your-environment).

### Environment variables

| File | Variable | Purpose |
| ---- | -------- | ------- |
| `.env` | `JWT_SECRET` | Signs and verifies auth tokens. Docker Compose reads this file for `${JWT_SECRET}` substitution, so it must exist even though `.env.local` is committed. |
| `website/.env.local` | `NEXT_PUBLIC_SERVER_URL` | GraphQL endpoint the website calls |
| `mobile/.env.local` | `EXPO_PUBLIC_SERVER_URL` | GraphQL endpoint the app calls when run locally |
| `mobile/eas.json` | `EXPO_PUBLIC_SERVER_URL` | Same, but per EAS build profile — this is what shipped builds use |

`DB_NAME` and `DB_CONNECTION` are set for you in `compose.yaml`.

## Server & DB

Copy the committed defaults into the file Compose reads, then start both containers:

```
cp .env.local .env
docker compose up
```

The GraphQL server comes up on **:3001** and MongoDB on **:27017**, with data persisted in the `db_data` volume. Open <http://localhost:3001> for the GraphQL Playground.

Run the test suite from `/server` with `npm test`.

> [!NOTE]
> You can view the data using [MongoDB Compass](https://www.mongodb.com/docs/compass/current/install/).

## Website

From `/website`:

```
npm install
npm run dev
```

Runs on **:3000** and points at `NEXT_PUBLIC_SERVER_URL`.

## Mobile

From `/mobile`:

```
npm install
npm start
```

> [!IMPORTANT]
> `npm start` launches with `--dev-client`, so it needs a development build installed on the device — Expo Go won't work. Build one with `eas build --profile development`, or run `npm run android` to build and install locally.

Note that `localhost` in `mobile/.env.local` refers to the phone itself, not your computer. Point it at a hostname the device can actually reach.

# Self-hosting

The stack runs on a single machine and is published to the tailnet with Tailscale, so no ports are exposed to the public internet.

```
docker compose up -d                        # server :3001 + mongo :27017
cd website && npm run build && npm start    # website :3000
sudo tailscale serve --bg --https=443 3001  # TLS in front of the GraphQL API
```

`tailscale serve --https` requires HTTPS certificates to be enabled for the tailnet, under [DNS in the admin console](https://login.tailscale.com/admin/dns). To reach the stack from outside the tailnet, swap `serve` for `funnel`.

Clients then use the machine's MagicDNS name. `EXPO_PUBLIC_*` values are inlined at bundle time, so changing the URL in `mobile/eas.json` requires a new build:

```
eas build --profile production --platform android
```
