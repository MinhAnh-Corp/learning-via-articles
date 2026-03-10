# Learning Hub

Tổng hợp các bài viết kỹ thuật hay, dịch sang tiếng Việt để học tập và chia sẻ.

## Stack

- **Framework:** Astro 6
- **Deploy:** Vercel
- **Content:** JSON (src/content/articles/)

## Danh sách bài viết

| # | Title (EN) | Title (VI) | Description (EN) | Description (VI) | Source |
|---|-----------|-----------|-------------------|-------------------|--------|
| 1 | An interactive intro to quadtrees | Nhập môn Quadtree qua các ví dụ trực quan | A visual, interactive guide to understanding quadtrees - from spatial search to collision detection and image compression | Hướng dẫn trực quan và sinh động về Quadtree - từ tìm kiếm không gian đến phát hiện va chạm và nén hình ảnh | [Link](https://growingswe.com/blog/quadtrees) |

## Commands

| Command | Action |
|:--------|:-------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start dev server (localhost:4321) |
| `pnpm build` | Build production |
| `pnpm preview` | Preview build |

## Thêm bài viết mới

1. Tạo file JSON trong `src/content/articles/<slug-tieng-viet>.json`
2. JSON cần có: `title_en`, `title_vi`, `description_en`, `description_vi`, `author`, `published`, `source_url`, `tags`, `sections`
3. Deploy — Astro auto detect route từ filename
4. Update bảng danh sách ở trên
