-- ============================================================
-- Schéma Supabase - ElectroDev Portfolio
-- Migration initiale : tables, RLS, policies
-- ============================================================

-- 1. PROFILES (admin unique)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access" ON profiles USING (auth.role() = 'authenticated');

-- 2. PROJECTS
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('electricite','reseaux','wifi','paraboles','dev-web','apps-mobiles','automatisation')),
  images TEXT[] DEFAULT '{}',
  technologies TEXT,
  date DATE,
  featured BOOLEAN DEFAULT false,
  github_repo TEXT,
  github_description TEXT,
  live_url TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (featured = true OR auth.role() = 'authenticated');
CREATE POLICY "Admin write projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- 3. SKILLS
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level INT CHECK (level BETWEEN 1 AND 5),
  category TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin write skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- 4. SERVICES
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Admin write services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- 5. MESSAGES
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read messages" ON messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete messages" ON messages FOR DELETE USING (auth.role() = 'authenticated');

-- 6. GALLERY
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT false,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admin write gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- 7. EXPERIENCE
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT,
  technologies TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Admin write experience" ON experience FOR ALL USING (auth.role() = 'authenticated');

-- 8. EDUCATION
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read education" ON education FOR SELECT USING (true);
CREATE POLICY "Admin write education" ON education FOR ALL USING (auth.role() = 'authenticated');

-- 9. SETTINGS
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Admin write settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_date ON projects(date DESC);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_gallery_category ON gallery(category);

-- Triggers pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();