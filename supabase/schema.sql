create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  avatar_url text,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  company text not null,
  role text not null,
  experience_level text not null check (experience_level in ('Intern', 'FTE')),
  result text not null check (result in ('Selected', 'Rejected')),
  rounds jsonb not null default '[]'::jsonb,
  tips text not null,
  created_at timestamptz not null default now()
);

create index if not exists posts_company_idx on public.posts (company);
create index if not exists posts_role_idx on public.posts (role);
create index if not exists posts_created_at_idx on public.posts (created_at desc);
