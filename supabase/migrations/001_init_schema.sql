-- 启用UUID扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 用户资料表 (扩展Supabase Auth)
-- =============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  birthday DATE,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('doctor', 'patient')) DEFAULT 'patient',
  medical_id TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 健康相关表
-- =============================================

-- 体征数据表
CREATE TABLE vital_signs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  blood_pressure_systolic INT,
  blood_pressure_diastolic INT,
  blood_sugar DECIMAL,
  heart_rate INT,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 医疗报告表
CREATE TABLE medical_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  report_type TEXT,
  doctor_name TEXT,
  status TEXT CHECK (status IN ('normal', 'abnormal')),
  file_url TEXT,
  report_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 健康记录表 (通用)
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  record_type TEXT NOT NULL,
  data JSONB NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 用药管理表
-- =============================================

-- 药物表
CREATE TABLE medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT,
  frequency TEXT,
  scheduled_time TIME,
  notes TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用药记录表
CREATE TABLE medication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID REFERENCES medications(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  taken_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT CHECK (status IN ('taken', 'missed', 'skipped')) DEFAULT 'taken'
);

-- =============================================
-- 营养记录表
-- =============================================
CREATE TABLE nutrition_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  calories INT NOT NULL,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- =============================================
-- 待办事项表
-- =============================================
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  scheduled_time TIMESTAMPTZ,
  todo_type TEXT CHECK (todo_type IN ('appointment', 'medication', 'other')),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 社区相关表
-- =============================================

-- 帖子表
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT CHECK (post_type IN ('post', 'article', 'topic')) DEFAULT 'post',
  title TEXT,
  image_url TEXT,
  tags TEXT[],
  like_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 评论表
CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 点赞表
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- =============================================
-- 通知表
-- =============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  notification_type TEXT,
  read BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 家人管理表
-- =============================================
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  family_user_id UUID REFERENCES profiles(id),
  relationship TEXT,
  can_view_records BOOLEAN DEFAULT FALSE,
  is_emergency_contact BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 数据授权表
-- =============================================
CREATE TABLE data_authorizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  authorized_entity TEXT NOT NULL,
  scope TEXT[],
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- 聊天记录表
-- =============================================
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('user', 'model')) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 索引优化
-- =============================================
CREATE INDEX idx_vital_signs_user_id ON vital_signs(user_id);
CREATE INDEX idx_vital_signs_recorded_at ON vital_signs(recorded_at DESC);
CREATE INDEX idx_medical_reports_user_id ON medical_reports(user_id);
CREATE INDEX idx_medications_user_id ON medications(user_id);
CREATE INDEX idx_medication_logs_user_id ON medication_logs(user_id);
CREATE INDEX idx_nutrition_logs_user_id ON nutrition_logs(user_id);
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);

-- =============================================
-- Row Level Security (RLS) 策略
-- 医疗数据隐私保护
-- =============================================

-- 启用RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vital_signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_authorizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles策略
CREATE POLICY "用户可以查看自己的资料" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "用户可以更新自己的资料" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "用户可以插入自己的资料" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 健康数据策略 (严格隐私保护)
CREATE POLICY "用户只能查看自己的体征数据" ON vital_signs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能插入自己的体征数据" ON vital_signs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能查看自己的医疗报告" ON medical_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能插入自己的医疗报告" ON medical_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能查看自己的健康记录" ON health_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能插入自己的健康记录" ON health_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用药策略
CREATE POLICY "用户只能查看自己的用药" ON medications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以管理自己的用药" ON medications
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "用户只能查看自己的用药记录" ON medication_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以记录自己的用药" ON medication_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 营养记录策略
CREATE POLICY "用户只能查看自己的营养记录" ON nutrition_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以添加营养记录" ON nutrition_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 待办事项策略
CREATE POLICY "用户只能查看自己的待办" ON todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以管理自己的待办" ON todos
  FOR ALL USING (auth.uid() = user_id);

-- 社区策略 (公开可读，但只能修改自己的)
CREATE POLICY "所有人可以查看社区帖子" ON community_posts
  FOR SELECT USING (true);

CREATE POLICY "用户可以发布帖子" ON community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以更新自己的帖子" ON community_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "用户可以删除自己的帖子" ON community_posts
  FOR DELETE USING (auth.uid() = user_id);

-- 评论策略
CREATE POLICY "所有人可以查看评论" ON post_comments
  FOR SELECT USING (true);

CREATE POLICY "用户可以发布评论" ON post_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以删除自己的评论" ON post_comments
  FOR DELETE USING (auth.uid() = user_id);

-- 点赞策略
CREATE POLICY "用户可以管理自己的点赞" ON post_likes
  FOR ALL USING (auth.uid() = user_id);

-- 通知策略
CREATE POLICY "用户只能查看自己的通知" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以更新自己的通知" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- 家人管理策略
CREATE POLICY "用户可以查看自己的家人列表" ON family_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以管理家人关系" ON family_members
  FOR ALL USING (auth.uid() = user_id);

-- 数据授权策略
CREATE POLICY "用户可以查看自己的授权" ON data_authorizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以管理自己的授权" ON data_authorizations
  FOR ALL USING (auth.uid() = user_id);

-- 聊天记录策略
CREATE POLICY "用户只能查看自己的聊天记录" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户可以添加聊天记录" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- 触发器 - 自动更新时间戳
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON community_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 触发器 - 更新帖子统计
-- =============================================
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_like_count_on_insert
  AFTER INSERT ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_like_count();

CREATE TRIGGER update_like_count_on_delete
  AFTER DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_like_count();

CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_comment_count_on_insert
  AFTER INSERT ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comment_count();

CREATE TRIGGER update_comment_count_on_delete
  AFTER DELETE ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comment_count();
