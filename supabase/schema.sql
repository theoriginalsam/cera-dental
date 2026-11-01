-- Run once in Supabase → SQL Editor.
-- Bookings are only read/written by the site's server using the secret key,
-- so RLS is enabled with no policies: the public (anon/publishable) key can't touch this table.

create table if not exists public.appointments (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null check (char_length(name) between 2 and 100),
  phone          text not null check (char_length(phone) between 7 and 20),
  preferred_date date,
  preferred_time text,
  treatment      text,
  message        text check (char_length(message) <= 1000),
  status         text not null default 'new'
                 check (status in ('new', 'confirmed', 'completed', 'cancelled'))
);

alter table public.appointments enable row level security;

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

-- Admin password set from /admin/password (stored as a salted scrypt hash).
-- Until a row exists, sign-in uses ADMIN_PASSWORD from the environment.
-- Forgot the password? Delete the 'password_hash' row here and sign in with ADMIN_PASSWORD again.
create table if not exists public.admin_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table public.admin_settings enable row level security;
