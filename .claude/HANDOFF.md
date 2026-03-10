# 🔄 HANDOFF

> 2026-03-10 21:50

## 📌 CURRENT REQUEST

Tạo folder learning dùng để dịch bài viết kỹ thuật tiếng Anh sang tiếng Việt, deploy lên Vercel để chia sẻ.

## 📋 PLAN

- [x] Init Astro 6 project ✅
- [x] Setup pnpm, Node 22 (.nvmrc) ✅
- [x] Tạo layout system (BaseLayout + ArticleLayout, dark theme) ✅
- [x] Auto-discover JSON → auto route (không cần sửa code khi thêm bài) ✅
- [x] Fetch + dịch bài #1 Quadtrees bằng Gemini CLI ✅
- [x] Vercel routing config (vercel.json) ✅
- [x] README tracking danh sách bài viết ✅
- [x] Build thành công ✅
- [ ] Deploy lên Vercel ⏳ (user tự deploy)
- [ ] Thêm bài viết tiếp theo ⏳

## ✅ COMPLETED

Dự án đã setup xong, build OK, sẵn sàng deploy.

## 🏗️ ARCHITECTURE

```
learning/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Layout chung, dark theme, nav, footer
│   │   └── ArticleLayout.astro     # Layout bài viết, header/meta/tags
│   ├── pages/
│   │   ├── index.astro             # Trang chủ, auto-discover JSON files
│   │   └── articles/[slug].astro   # Dynamic route, auto từ filename JSON
│   └── content/articles/
│       └── nhap-mon-quadtree.json  # Bài #1 - Quadtree (Gemini dịch)
├── vercel.json                     # cleanUrls + rewrite fallback
├── .nvmrc                          # Node 22
├── package.json                    # pnpm, Astro 6
└── README.md                       # Tracking bài viết
```

## 🔑 KEY DECISIONS

- **Astro 6** thay vì React/Next — content site, static by default, 0KB JS
- **pnpm** — package manager
- **Auto-discover:** `import.meta.glob('../content/articles/*.json')` → drop JSON = có route
- **Slug tiếng Việt:** filename = slug = route (vd: `nhap-mon-quadtree`)
- **Interactive demos:** Không kéo được (custom Canvas/JS) → link về bài gốc
- **Gemini CLI** dịch bài — output JSON trực tiếp
- **Tags** nằm trong JSON file (không cần registry riêng)

## 📂 FILES

- `src/layouts/BaseLayout.astro` - done
- `src/layouts/ArticleLayout.astro` - done
- `src/pages/index.astro` - done (auto-discover)
- `src/pages/articles/[slug].astro` - done (auto-discover)
- `src/content/articles/nhap-mon-quadtree.json` - done (Gemini dịch)
- `vercel.json` - done
- `README.md` - done

## 📝 WORKFLOW THÊM BÀI MỚI

1. User gửi link bài EN
2. WebFetch lấy nội dung
3. Gemini CLI dịch → output JSON
4. Save vào `src/content/articles/<slug-viet>.json`
5. Update README table
6. Deploy Vercel — xong

## ⚠️ NOTES

- Node 22 bắt buộc (Astro 6 yêu cầu >= 22.12)
- `pnpm approve-builds` nếu cần build esbuild/sharp
- JSON format: `title_en`, `title_vi`, `description_en`, `description_vi`, `author`, `published`, `source_url`, `tags`, `sections[]`
- Mỗi section: `heading_en`, `heading_vi`, `content_vi` (HTML), `has_interactive_demo`, `demo_description`

## ▶️ NEXT

1. User deploy lên Vercel (connect GitHub repo)
2. Gửi thêm link bài viết EN để dịch tiếp
