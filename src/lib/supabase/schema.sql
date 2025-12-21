-- Users Table (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user', -- 'user' or 'admin'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric not null,
  stock integer default 0,
  category text,
  images text[],
  features text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Events Table
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  date timestamp with time zone not null,
  location text not null,
  price numeric default 0,
  spots_total integer,
  spots_booked integer default 0,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Wallet/Points Table
create table public.wallets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  balance integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Points History
create table public.points_history (
  id uuid default uuid_generate_v4() primary key,
  wallet_id uuid references public.wallets(id) not null,
  amount integer not null,
  action text not null, -- 'earn' or 'spend'
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog Posts
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  author_id uuid references public.profiles(id),
  image text,
  category text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
