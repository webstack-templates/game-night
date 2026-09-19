# Game night

The games on our shelf and a log of every time we play one: who played, who
won, and anything worth remembering.

Built with Next.js and Postgres on Neon, using the Neon serverless driver.

## Running it

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to the connection
string from the Neon console, then:

```bash
npm install
npm run db:setup   # creates the tables from db/schema.sql
npm run dev
```

Then open http://localhost:3000.

## Layout

- `app/page.tsx` — the shelf, most recently played first
- `app/games/new` — add a game
- `app/games/[id]` — one game, its plays, and the form to log a play
- `app/actions.ts` — server actions for writes
- `lib/db.ts` — the `sql` client and row types
- `db/schema.sql` — the two tables (`games`, `plays`)
