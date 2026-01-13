-- 测试用户数据
-- 注意：实际使用时应通过Supabase Auth创建用户

-- 模拟用户资料 (需要先在Supabase Auth中创建对应用户)
-- INSERT INTO profiles (id, name, birthday, avatar_url, role, medical_id, phone)
-- VALUES 
--   ('user-uuid-1', 'Sarah Jenkins', '1985-04-12', 'https://picsum.photos/200/200?random=50', 'patient', '883-920-11', '+86 138 0000 0000');

-- 示例社区帖子数据
INSERT INTO community_posts (id, user_id, content, post_type, title, tags, like_count, comment_count)
VALUES 
  (uuid_generate_v4(), (SELECT id FROM profiles LIMIT 1), '有人在换新药方案后感到疲劳吗？尽管指标正常，我最近感觉异常疲惫。', 'post', NULL, ARRAY['糖尿病', '用药'], 12, 4);

-- 可以添加更多测试数据...
