-- Users table is handled by Supabase Auth (auth.users)
-- We create a public profiles table to store extra info
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Function to handle new user signup (automatically creates a profile)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

-- Trigger to call the function on new user signup
-- Drop if exists to avoid errors on re-run
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Tests/Quizzes Table
create table if not exists public.tests (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  duration_minutes integer default 60,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Questions Table
create table if not exists public.questions (
  id uuid default uuid_generate_v4() primary key,
  test_id uuid references public.tests(id),
  text text not null,
  explanation text, -- Shown after submission
  category text,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Options Table
create table if not exists public.options (
  id uuid default uuid_generate_v4() primary key,
  question_id uuid references public.questions(id) not null,
  text text not null,
  is_correct boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Attempts Table (Stores the high-level result)
create table if not exists public.attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  test_id uuid references public.tests(id),
  score integer default 0,
  total_questions integer default 0,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  status text check (status in ('in-progress', 'completed')) default 'in-progress'
);

-- User Answers Table (Detailed log for analysis)
create table if not exists public.user_answers (
  id uuid default uuid_generate_v4() primary key,
  attempt_id uuid references public.attempts(id) not null,
  question_id uuid references public.questions(id) not null,
  selected_option_id uuid references public.options(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for Performance
create index if not exists idx_questions_test_id on public.questions(test_id);
create index if not exists idx_options_question_id on public.options(question_id);
create index if not exists idx_attempts_user_id on public.attempts(user_id);
create index if not exists idx_user_answers_attempt_id on public.user_answers(attempt_id);
