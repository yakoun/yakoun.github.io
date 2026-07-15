-- Nouvelles tables pour le portfolio CV complet
BEGIN;

-- 1. PROFILES_INFO (une seule ligne avec les infos perso)
CREATE TABLE IF NOT EXISTS profile_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  summary TEXT DEFAULT '',
  address TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  birth_date DATE,
  photo_url TEXT DEFAULT '',
  github TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  website TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profile_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read profile_info" ON profile_info FOR SELECT USING (true);
CREATE POLICY "Admin write profile_info" ON profile_info FOR ALL USING (auth.role() = 'authenticated');

-- 2. LANGUAGES
CREATE TABLE IF NOT EXISTS languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level INT CHECK (level BETWEEN 1 AND 5),
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read languages" ON languages FOR SELECT USING (true);
CREATE POLICY "Admin write languages" ON languages FOR ALL USING (auth.role() = 'authenticated');

-- 3. HOBBIES
CREATE TABLE IF NOT EXISTS hobbies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT DEFAULT '',
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hobbies" ON hobbies FOR SELECT USING (true);
CREATE POLICY "Admin write hobbies" ON hobbies FOR ALL USING (auth.role() = 'authenticated');

-- 4. SOFTWARE_TOOLS
CREATE TABLE IF NOT EXISTS software_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Autre' CHECK (category IN ('Logiciel','Langage programmation','Framework','Outil','Autre')),
  level INT CHECK (level BETWEEN 1 AND 5),
  icon TEXT DEFAULT '',
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE software_tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read software_tools" ON software_tools FOR SELECT USING (true);
CREATE POLICY "Admin write software_tools" ON software_tools FOR ALL USING (auth.role() = 'authenticated');

-- Trigger updated_at pour profile_info
CREATE TRIGGER profile_info_updated_at BEFORE UPDATE ON profile_info FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMIT;
