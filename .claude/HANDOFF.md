# 🔄 HANDOFF

> 2026-03-10 22:10

## 📌 CURRENT REQUEST

Tạo folder learning dùng để dịch bài viết kỹ thuật tiếng Anh sang tiếng Việt, deploy lên Vercel để chia sẻ.

## 📋 PLAN

- [x] Init Astro 6 project ✅
- [x] Setup pnpm, Node 22 (.nvmrc) ✅
- [x] Tạo layout system (BaseLayout + ArticleLayout, dark theme) ✅
- [x] Auto-discover MDX → auto route ✅
- [x] Fetch + dịch bài #1 Quadtrees bằng Gemini CLI ✅
- [x] Vercel routing config (vercel.json) ✅
- [x] Chuyển JSON → MDX ✅
- [x] Tạo script `pnpm translate <url>` ✅
- [x] README tracking ✅
- [ ] Deploy lên Vercel ⏳ (user tự deploy)

## 🏗️ ARCHITECTURE

```
learning/
├── scripts/
│   └── translate.mjs           # pnpm translate <url> → Gemini dịch → MDX
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Layout chung, dark theme
│   │   └── ArticleLayout.astro # Layout bài viết
│   ├── pages/
│   │   ├── index.astro         # Trang chủ, auto-discover MDX
│   │   └── articles/[slug].astro # Dynamic route từ MDX filename
│   └── content/articles/
│       └── nhap-mon-quadtree.mdx  # Bài #1 (Gemini dịch)
├── vercel.json                 # cleanUrls + rewrite fallback
├── .nvmrc                      # Node 22
└── package.json                # pnpm, Astro 6 + MDX
```

## 🔑 KEY DECISIONS

- **Astro 6 + MDX** — content site, static, 0KB JS, rich formatting
- **pnpm** — package manager
- **Auto-discover:** `import.meta.glob('*.mdx')` → drop MDX = có route
- **Slug tiếng Việt:** filename = slug = route (vd: `nhap-mon-quadtree`)
- **Interactive demos:** link về bài gốc (blockquote trong MDX)
- **Gemini CLI** dịch bài → output MDX trực tiếp
- **Script:** `pnpm translate <url>` = 1 lệnh dịch + tạo file

## 📝 WORKFLOW

```bash
pnpm translate https://example.com/blog/article
# → Gemini fetch + dịch → save MDX → deploy Vercel
```

## ⚠️ NOTES

- Node 22 bắt buộc (Astro 6)
- Gemini CLI cần có sẵn trong PATH
- MDX frontmatter: title_en, title_vi, description_en, description_vi, author, published, source_url, tags
