# HealthMate AI - 智能健康管理系统

一个集成了前后端的智能健康管理系统，使用React前端 + Express后端 + Supabase数据库。

## 功能特性

- ✅ 用户认证（手机号+密码/短信验证码）
- ✅ 健康档案管理（体征数据、医疗报告）
- ✅ 用药提醒和打卡
- ✅ 营养摄入追踪
- ✅ 待办事项管理
- ✅ 社区功能（发帖、评论、点赞）
- ✅ AI健康助手（Gemini集成）
- ✅ 实时通知系统

## 技术栈

### 前端
- React 19
- TypeScript
- Vite
- React Router
- Supabase Client

### 后端
- Node.js 18+
- Express
- TypeScript
- Supabase (PostgreSQL + Auth)

## 快速开始

### 1. 配置Supabase

1. 在 [supabase.com](https://supabase.com) 创建新项目
2. 在SQL编辑器中运行 `supabase/migrations/001_init_schema.sql`
3. 在Settings > API中获取项目URL和密钥

### 2. 后端设置

```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 复制环境变量模板
copy .env.example .env

# 编辑.env文件，填入Supabase配置
# SUPABASE_URL=你的项目URL
# SUPABASE_ANON_KEY=你的anon key
# SUPABASE_SERVICE_ROLE_KEY=你的service role key

# 启动开发服务器
npm run dev
```

后端服务将运行在 `http://localhost:3000`

### 3. 前端设置

```bash
# 在项目根目录
npm install

# 复制环境变量模板
copy .env.example .env.local

# 编辑.env.local文件
# VITE_SUPABASE_URL=你的项目URL
# VITE_SUPABASE_ANON_KEY=你的anon key
# VITE_API_URL=http://localhost:3000

# 启动开发服务器
npm run dev
```

前端应用将运行在 `http://localhost:5173`

## API文档

### 认证端点

- `POST /auth/signup` - 注册新用户
- `POST /auth/login` - 密码登录
- `POST /auth/send-otp` - 发送短信验证码
- `POST /auth/verify-otp` - 验证码登录
- `POST /auth/refresh` - 刷新token
- `POST /auth/logout` - 登出

### 用户资料

- `GET /api/profiles/:id` - 获取用户资料
- `PUT /api/profiles/:id` - 更新用户资料

### 健康数据

- `GET /api/health/vital-signs` - 获取体征数据
- `POST /api/health/vital-signs` - 添加体征数据
- `GET /api/health/reports` - 获取医疗报告
- `POST /api/health/reports` - 添加医疗报告
- `GET /api/health/medications` - 获取用药列表
- `POST /api/health/medications/:id/log` - 用药打卡

### 社区功能

- `GET /api/community/posts` - 获取帖子列表
- `POST /api/community/posts` - 发布帖子
- `POST /api/community/posts/:id/like` - 点赞
- `GET /api/community/posts/:id/comments` - 获取评论
- `POST /api/community/posts/:id/comments` - 发布评论
- `GET /api/community/search` - 搜索内容

### 其他

- `GET /api/dashboard` - 获取仪表板数据
- `GET /api/chat/history` - 获取聊天历史
- `GET /api/notifications` - 获取通知列表

## 数据库架构

系统使用15个表来管理数据：

- `profiles` - 用户资料
- `vital_signs` - 体征数据
- `medical_reports` - 医疗报告
- `medications` - 用药信息
- `medication_logs` - 用药记录
- `nutrition_logs` - 营养记录
- `todos` - 待办事项
- `community_posts` - 社区帖子
- `post_comments` - 评论
- `post_likes` - 点赞
- `notifications` - 通知
- `family_members` - 家人管理
- `data_authorizations` - 数据授权
- `chat_messages` - 聊天记录
- `health_records` - 通用健康记录

## 数据安全

- ✅ 所有表启用了Row Level Security (RLS)
- ✅ 用户只能访问自己的医疗数据
- ✅ JWT token认证
- ✅ 密码加密存储
- ✅ HTTPS传输加密

## 开发注意事项

1. **短信验证码**: Supabase的短信功能需要配置短信提供商（如Twilio）
2. **文件上传**: 医疗报告上传使用Supabase Storage
3. **实时功能**: 可以使用Supabase Realtime订阅数据变化
4. **API限流**: 生产环境建议添加限流中间件

## 生产部署

### 后端部署

推荐使用：
- Railway
- Render
- Vercel (Serverless Functions)
- Heroku

### 前端部署

推荐使用：
- Vercel
- Netlify
- Cloudflare Pages

### 环境变量配置

确保在生产环境中正确配置：
- Supabase URL和密钥
- CORS origins
- Gemini API密钥

## 许可证

MIT
