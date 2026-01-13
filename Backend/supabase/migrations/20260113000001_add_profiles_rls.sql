-- Drop existing policies if they exist
DROP POLICY IF EXISTS "super_admin_read_profiles" ON profiles;
DROP POLICY IF EXISTS "super_admin_update_profiles" ON profiles;
DROP POLICY IF EXISTS "users_read_own_profile" ON profiles;
DROP POLICY IF EXISTS "users_update_own_profile" ON profiles;

-- Create a security definer function to check if user is super_admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'super_admin'
    FROM profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow super_admin to read all profiles
CREATE POLICY "super_admin_read_profiles" ON profiles
FOR SELECT
USING (is_super_admin() OR auth.uid() = id);

-- Allow super_admin to update all profiles
CREATE POLICY "super_admin_update_profiles" ON profiles
FOR UPDATE
USING (is_super_admin() OR auth.uid() = id);
