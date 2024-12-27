
# Next.js starter

Starter project for next.js, ready for development.

## Features

- ✨ Next.js (15)
- ✨ Tailwind
- ✨ ShadcnUI
- ✨ next-intl
- ✨ React-query
- ✨ Dark Mode
- ✨ Zunstand (TBD)
- ✨ Eslint
- ✨ Prettier
- ✨ Husky
- ✨ Dev-friendly CLI (TBD)
- ✨ Supabase auth (TBD)

## Architecture
The architecture remains true to the old paradigm, according to which the responsibility for “actions” lies with the client, so this repo does not follow the new conventions with component-server and action-server.

Il progetto segue un'architettura a strati, sfruttando react-query, non manipolerà mai i dati reali sulle chiamate api, ma chiamerà gestori di entità, che avranno al loro interno le vere chiamate api; si noti che anche i veri 'richiedenti' non chiamano direttamente l'api, c'è un gestore di base che lo fa per loro.

Form management is completely based on the solution proposed by ShadCN, which uses react-form and zod for validation.

Within the project we try to use Screaming Architecture as much as possible, highlighting the names of individual directories and, where possible, individual files.

## Fast Onboarding
#### App folder
- /app ( Routing )

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
- /core/CoreApi.ts (Api calls with fetch)
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
- /i18n/languages.ts (List of supported languages)
- /i18n/request.ts (Server-side locale detector)

#### Lib folder
- /lib (General utility)

#### Messages folder
- /messages (All translations)
- /messages/[lang].json (Translations by page)

#### Routes folder
- /routes (All app-routes)

#### Styles folder
- /styles (Global style)

## Dev-friendly cli
TBD
