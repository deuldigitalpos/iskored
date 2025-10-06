/*
  # Server Admin System Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `full_name` (text)
      - `role` (text, not null) - Values: 'server_admin', 'user'
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `access_level` (text, not null) - Values: 'admin', 'editor', 'viewer'
      - `created_by` (uuid, references profiles)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `business_users`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `subscription_status` (text, not null, default 'active') - Values: 'active', 'inactive'
      - `subscription_plan` (text)
      - `account_status` (text, not null, default 'active') - Values: 'active', 'deactivated'
      - `created_by` (uuid, references profiles)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `admin_activity_log`
      - `id` (uuid, primary key)
      - `admin_id` (uuid, references profiles)
      - `action_type` (text, not null) - Values: 'impersonate', 'subscription_change', 'account_status_change', etc.
      - `target_user_id` (uuid, references profiles)
      - `details` (jsonb)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Server admins can manage all data
    - Regular users can only view/edit their own profile
    - Admin activity is logged for audit purposes

  3. Important Notes
    - Profiles are automatically created via trigger when auth.users are created
    - Admin access levels control dashboard permissions
    - Business users are application users managed by admins
    - All destructive actions are logged for security
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('server_admin', 'user')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  access_level text NOT NULL CHECK (access_level IN ('admin', 'editor', 'viewer')),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(profile_id)
);

-- Create business_users table
CREATE TABLE IF NOT EXISTS business_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  subscription_status text NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive')),
  subscription_plan text,
  account_status text NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'deactivated')),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(profile_id)
);

-- Create admin_activity_log table
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  action_type text NOT NULL,
  target_user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Server admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can update all profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

-- Admin users policies
CREATE POLICY "Server admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can insert admin users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can update admin users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can delete admin users"
  ON admin_users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

-- Business users policies
CREATE POLICY "Server admins can view all business users"
  ON business_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can insert business users"
  ON business_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can update business users"
  ON business_users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can delete business users"
  ON business_users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

-- Admin activity log policies
CREATE POLICY "Server admins can view all activity logs"
  ON admin_activity_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

CREATE POLICY "Server admins can insert activity logs"
  ON admin_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'server_admin'
    )
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'user')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS business_users_updated_at ON business_users;
CREATE TRIGGER business_users_updated_at
  BEFORE UPDATE ON business_users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
