# AGENTS.md

## 项目概览

两个独立代码库，**不是** monorepo：

- **后端:** Django REST API，位于 `myblog-backend/`
- **前端:** Vue 3 + Vite SPA，位于 `myblogfront/myblog/`

## 启动方式

以下命令从仓库根目录执行：

### 前端

```powershell
cd myblogfront\myblog
npm run dev
```

### 后端

```powershell
cd myblog-backend
.\myblog_env\Scripts\activate
python manage.py runserver
```

## 常用命令

### 前端（在 `myblogfront/myblog/` 目录下执行）

| 命令 | 说明 |
|---|---|
| `npm run dev` | Vite 开发服务器（端口 5173），不做类型检查 |
| `npm run build` | 并行执行 `type-check` + `vite build` |
| `npm run type-check` | 仅 `vue-tsc --build` 类型检查 |
| `npm run lint` | ESLint 检查并 `--fix`（格式化交给 Prettier） |
| `npm run format` | `prettier --write src/` 格式化源码 |

### 后端（在 `myblog-backend/` 目录下执行）

| 命令 | 说明 |
|---|---|
| `python manage.py runserver` | Django 开发服务器（端口 8000） |
| `python manage.py migrate` | 应用数据库迁移 |
| `python manage.py makemigrations` | 创建新迁移文件 |
| `python manage.py createsuperuser` | 创建管理员账号，用于 `/admin` |

## 架构说明

- **有效的 `package.json`** 是 `myblogfront/myblog/package.json`。`myblogfront/` 下还有一个旧的 `package.json`，忽略它。
- `@` 导入别名映射到 `src/`（在 `vite.config.ts` 和 `tsconfig.app.json` 中配置）。
- Tailwind CSS v4 使用 `@tailwindcss/vite` Vite 插件，不需要单独配置文件扫描。
- ESLint 9 flat config (`eslint.config.ts`)，格式化委托给 Prettier。

## 认证系统（JWT）

- 使用 `djangorestframework-simplejwt`（access token 2 小时，refresh token 7 天）。
- `settings.py` 中 `REST_FRAMEWORK` 配置了 `JWTAuthentication`（主要）和 `SessionAuthentication`（Django Admin 兼容）。
- 权限控制由 `blog/permissions.py` 的 `IsAdminUserOrReadOnly` 实现：任何人都可读，**只有 `is_staff=True` 的用户**才能写（增/改/删文章和友链）。

### 前端认证流程

- **登录/注册页:** `src/views/LoginPage.vue`，访问路径 `/login`、`/register`。
- **Auth Store:** `src/stores/auth.ts`（Pinia），管理 `accessToken`、`refreshTokenValue`、`user` 状态。
  - `isLoggedIn` = 是否有 access token。
  - `isAdmin` = `user.is_staff`（需 `fetchUser()` 获取）。
- **Axios 拦截器:** `src/utils/request.ts`
  - 请求拦截：自动从 localStorage 读取 access token 作为 `Bearer` 发送。
  - 响应拦截：401 时自动尝试 refresh token，失败则清除 token 并跳转 `/login`。
- **路由守卫:** `router/index.ts` 的 `beforeEach` —— `/CreateBlog` 需要 `requiresAuth` + `requiresAdmin`。

### 已知问题

- **路由守卫不预取用户信息：** 页面刷新后 `user` 为空，`isAdmin` 永远返回 `false`，可能导致管理员也被踢出 `/CreateBlog`。`fetchUser()` 只在 `authStore.login()` 后调用一次。

### 后端认证接口

| 路径 | 方法 | 说明 |
|---|---|---|
| `auth/login/` | POST | 登录，返回 `{ access, refresh }` |
| `auth/refresh/` | POST | 刷新 token |
| `auth/register/` | POST | 注册新用户 |
| `auth/user/` | GET | 获取当前用户信息（需认证） |

## 环境

- **数据库使用 PostgreSQL**（主机 `localhost`，数据库名 `my_blog`，用户 `postgres`，密码 `123456`）。仓库里的 `db.sqlite3` 是遗留文件，后端运行需要 PostgreSQL 处于运行状态。
- Python 虚拟环境位于 `myblog-backend/myblog_env/`。
- CORS 允许 `localhost:5173`（前端开发服务器）。
- API 基础地址通过 `.env.development` 中的 `VITE_API_BASE_URL` 配置，默认 `http://localhost:8000/blog`。响应 401 时自动尝试刷新 token，失败则清除 token 并跳转 `/login`。

## 注意事项

- **没有任何测试** — 没有配置测试运行器。不要尝试执行 `npm test` 或 `python manage.py test`。
- **没有 CI/CD** — 没有 GitHub Actions、Dockerfile 或部署脚本。
- **写博客需要管理员权限：** 先注册一个账号 → 在 Django Admin 中将该用户的 `is_staff` 勾选 → 前端 `/login` 登录后即可正常发布、修改、删除文章。
- **SECRET_KEY 和数据库密码** 硬编码在 `settings.py` 中 — 仅用于开发，切勿直接部署。
- **分类归属** 由 `Category.is_tech` 布尔字段控制（`True`=技术类，`False`=生活类）。新增分类后需在 Django Admin 中设置该字段，否则不会出现在对应文章列表中。
