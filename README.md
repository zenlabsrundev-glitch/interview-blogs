# Placement Interview Experience Hub

Modern placement-interview experience sharing platform built with Next.js App Router, Tailwind CSS, and Supabase.

## Setup

1. Install packages:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

3. Run SQL from `supabase/schema.sql` in your Supabase SQL editor.

4. Start the app:

```bash
npm run dev
```

## API Endpoints

- `GET /api/posts`
- `POST /api/posts`
- `GET /api/posts/:id`
