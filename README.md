# Learning Hub

Tổng hợp các bài viết kỹ thuật hay, dịch sang tiếng Việt để học tập và chia sẻ.

## Stack

- **Framework:** Astro 6
- **Deploy:** Vercel
- **Content:** MDX (src/content/articles/)

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
| `pnpm translate <url>` | Dịch bài viết từ URL (Gemini CLI) |

## Thêm bài viết mới

```bash
pnpm translate https://example.com/blog/article
```

Gemini CLI sẽ fetch + dịch + tạo file MDX tự động. Astro auto detect route từ filename. Deploy Vercel là xong.
