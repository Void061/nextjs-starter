
# Next.js starter

Starter project for next.js, ready for development.

This starter is designed to work closely with this back-end in NestJS [NestJS Starter](https://github.com/Void061/nestjs-starter)


## Features

- ✨ Next.js (15)
- ✨ Tailwind
- ✨ ShadcnUI
- ✨ internationalization (next-intl, with settings on DB per account and locally for guests)
- ✨ Dark Mode (With settings on DB per account and locally for guests)
- ✨ React-query
- ✨ Zunstand (TBD)
- ✨ Supabase auth (Sign-in / up with credentials)
- ✨ Protected routes with middleware
- ✨ Proxy (Hide real server-api source TBD)
- ✨ Dev-friendly CLI (TBD)
- ✨ Husky
- ✨ Eslint
- ✨ Prettier
- ✨ LF characters

## Concepts
- 🤝 Screaming Architecture
- 📄 Layered Architecture
- ⚡ Reactive data-modeling
- 🌱 Structured react-query

## Supabase init
This starter uses supabase only for authentication; you will need to initialize a project on supabase and pick up the PUBLIC URL and ANON KEY.

Go inside your project on supabase > settings > api > Project url (PUBLIC_URL)

Go inside your project on supabase > settings > api > Project api keys > anon public (ANON KEY)

## Supabase setup

- Need to disable sign-up confirm e-mail (go to: Authentication > Providers > Mail)
If you enable emailing with the default supabase provider, some speed-limiting errors may occur, the advice is to use a gmail provider for free projects.
- Currently the supabase token automatically updates.

## Architecture
The architecture remains true to the old paradigm, according to which the responsibility for “actions” lies with the client, so this repo does not follow the new conventions with component-server and action-server.

The project follows a layered architecture, taking advantage of react-query, it will never manipulate the actual data on the api calls, but will call entity handlers, which will have the real api calls inside them; note that even the real 'requesters' do not call the api directly, there is a basic handler that does it for them.

Form management is completely based on the solution proposed by ShadCN, which uses react-form and zod for validation.

Within the project we try to use Screaming Architecture as much as possible, highlighting the names of individual directories and, where possible, individual files.

## Fast Onboarding

#### Husky
- /.husky (Simple husky with pre-commit)

#### Public
- /public (Common public folder)

#### Src
- /src (Real app source)

#### App folder
- /app (Routing)

#### Actions
- /actions (Server-side actions)

#### Common folder
- /common (Global types and constants)

#### Components folder
- /components (All components)
- /components/ui (ShadcnUI components)
- /components/custom (Custom components)
- /components/providers (Data providers)

#### Core folder
- /core (Core api)
- /core/common (Types and constants)
- /core/client/useCoreApi.ts (Api calls for client-side with fetch)
- /core/server/serverCoreApi.ts (Api calls for server-side with fetch)
- /core/CoreApiError.ts (Api error normalization)

#### Entities folder
- /entities (All data-entities)
- /entities/common (Types and constants)
- /entities/[entity]/common (Types and constants)
- /entities/[entity]/common/validation/ (Validation schemas with Zod)
- /entities/[entity]/common/validation/[action]Validation.ts (Single validation schema with scream-name)
- /entities/[entity]/[entityApi].ts (Entity api based on coreApi)
- /entities/[useEntityQueries].ts (React-query queries for entity)
- /entities/[useEntityMutations].ts (React-query mutations for entity)

#### Hooks folder
- /hooks (Shadcn Hooks and custom)

#### I18n folder
- /i18n (All translations features)
- /i18n/common (Types and constants)
- /i18n/request.ts (Server-side locale detector)

#### Lib folder
- /lib (General utility)

#### Messages folder
- /messages (All translations)
- /messages/[lang].json (Translations by page)

#### Middlewares folder
- /supabase-middleware.ts (Auth protection)

#### Routes folder
- /routes (All app-routes)

#### Styles folder
- /styles (Global style)

#### Middleware file
Load your middlewares here (Basic: Supabase middleware)

## Dev-friendly cli
TBD
