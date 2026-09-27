# complaines & Tickets Backend

Node.js + Express + Prisma (PostgreSQL) backend implementing the `complaines` <-> `tickets`
one-to-one relationship from the ER diagram, plus a seed script that loads `iraqi_support_dataset_3000.json`.

## Setup

```bash
npm install
cp .env.example .env    # fill in your real DATABASE_URL
npx prisma migrate dev --name init   # creates tables in Postgres
npm run seed             # loads prisma/data/iraqi_support_dataset_3000.json into the DB
npm run dev               # starts the API on http://localhost:4000
```

## Schema notes (differences from the raw diagram)

- `msgs`: stored as `Json` (not `long_text`) to keep the `{msg_id, seq, text}` array structure
  instead of a flat string.
- `priority`: stored as `String` (not `int`) because the dataset uses `"high" / "medium" / "low"`.
  Switch to an `Int` or a Prisma `enum` if you'd rather encode priority numerically.
- `status`: implemented as a Prisma `enum` (`pending | approved | rejected`) as shown in the diagram.
- The one-to-one relation is enforced with `@unique` on `complaine.ticketId`.

## Endpoints


 GET    | /tickets              List tickets (filters: status, category, priority) 
 GET    | /tickets/:id          Get one ticket (+ its complaine)     
 PATCH  | /tickets/:id          Update status / draftReport / etc.    
 DELETE | /tickets/:id          Delete a ticket                       
 GET    | /complaines           List complaines (+ their ticket)      
 GET    | /complaines/:id       Get one complaine                     
 POST   | /complaines           Create a new complaine (+ initial pending ticket) 
