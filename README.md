# Gate Pass - 庞加莱邀请函管理系统

如视海外 2025 年庞加莱线上内购会邀请函管理系统。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **数据库**: PostgreSQL (本地 Docker / 生产 Vercel Postgres)
- **ORM**: Prisma 7
- **样式**: Tailwind CSS
- **国际化**: i18next (16 种语言)

## 本地开发

### 前置要求

- Node.js 18+
- Docker Desktop

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`，确保 `DATABASE_URL` 配置正确：

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gate_pass"
```

### 3. 一键启动（推荐）

```bash
npm run dev:full
```

这会自动完成：启动 Docker 数据库 → 运行迁移 → 填充种子数据 → 启动开发服务器。

访问 [http://localhost:9898](http://localhost:9898) 查看应用。

### 3. 分步启动（可选）

如果数据库已经初始化过，只需：

```bash
npm run db:start  # 启动数据库
npm run dev       # 启动开发服务器
```

### 默认账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 超管 | admin | 123456 |
| 销售 | S001 | 123456 |
| 销售 | S002 | 123456 |

## 开发命令

```bash
npm run dev:full    # 一键启动：数据库 + 迁移 + 种子数据 + 开发服务器
npm run dev:init    # 初始化：启动数据库 + 迁移 + 种子数据
npm run dev         # 仅启动开发服务器（数据库需已运行）
```

## 数据库命令

```bash
npm run db:start    # 启动 PostgreSQL 容器
npm run db:stop     # 停止 PostgreSQL 容器
npm run db:migrate  # 运行数据库迁移
npm run db:seed     # 填充种子数据
npm run db:reset    # 重置数据库（删除所有数据并重新迁移）
```

## 生产部署

项目配置为部署到 Vercel，使用 Vercel Postgres (Neon) 作为数据库。

1. 在 Vercel 创建 Postgres 数据库
2. 设置环境变量 `POSTGRES_PRISMA_URL`
3. 部署到 Vercel

## 文档

- [用户手册](docs/USER_MANUAL.md) - 系统使用说明
- [OpenSpec](openspec/) - 项目规范和变更提案
