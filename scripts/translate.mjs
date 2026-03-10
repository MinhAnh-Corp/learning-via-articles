#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.argv[2];
if (!url) {
  console.error('Usage: pnpm translate <url>');
  process.exit(1);
}

const ARTICLES_DIR = resolve(import.meta.dirname, '../src/content/articles');

// Step 1: Fetch article content
console.log(`\n📥 Fetching: ${url}\n`);
const fetchPrompt = `Extract the FULL article content from this page. Return ALL text: title, all headings, all paragraphs, all lists, all code blocks. Note any interactive demos/visualizations. Do NOT summarize - return everything. Format as plain text with markdown headings.`;

let rawContent;
try {
  rawContent = execSync(
    `curl -sL "${url}" | sed 's/<[^>]*>//g' | head -3000`,
    { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
  );
} catch {
  console.error('Failed to fetch URL');
  process.exit(1);
}

// Step 2: Generate slug from Vietnamese title (Gemini will provide it)
console.log('🤖 Translating with Gemini...\n');

const geminiPrompt = `Bạn là dịch giả kỹ thuật chuyên nghiệp. Dịch bài viết sau sang tiếng Việt.

YÊU CẦU:
- Dịch tự nhiên, hay, dễ hiểu — KHÔNG dịch word-by-word
- Giữ nguyên thuật ngữ kỹ thuật quan trọng (ví dụ: quadtree, binary search, O(n), hash map, etc.)
- Output dạng MDX với frontmatter YAML

FORMAT OUTPUT (chính xác như sau):
---
title_en: "..."
title_vi: "..."
description_en: "1 câu mô tả ngắn tiếng Anh"
description_vi: "1 câu mô tả ngắn tiếng Việt"
author: "tên tác giả"
published: "YYYY-MM-DD"
source_url: "${url}"
tags: ["tag1", "tag2"]
slug_vi: "slug-tieng-viet-khong-dau"
---

## Heading tiếng Việt

Nội dung tiếng Việt...

> **Demo tương tác:** Mô tả demo nếu có. [Xem demo tại bài gốc →](${url})

QUAN TRỌNG:
- slug_vi: dùng tiếng Việt KHÔNG DẤU, lowercase, dùng dấu gạch ngang. VD: "nhap-mon-quadtree"
- Mỗi section dùng ## heading
- Interactive demo/visualization → dùng blockquote với link về bài gốc
- KHÔNG bọc output trong code block
- Bắt đầu output bằng --- (frontmatter)`;

let mdxContent;
try {
  // Write content to temp file to avoid shell escaping issues
  const tmpFile = '/tmp/translate-input.txt';
  writeFileSync(tmpFile, rawContent);

  mdxContent = execSync(
    `cat "${tmpFile}" | gemini -p '${geminiPrompt.replace(/'/g, "'\\''")}'`,
    { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024, timeout: 180000 }
  );
} catch (e) {
  console.error('Gemini translation failed:', e.message);
  process.exit(1);
}

// Step 3: Clean up and extract slug
mdxContent = mdxContent.trim();

// Remove markdown code block wrapper if Gemini added it
if (mdxContent.startsWith('```')) {
  mdxContent = mdxContent.replace(/^```\w*\n/, '').replace(/\n```$/, '');
}

// Ensure starts with frontmatter
if (!mdxContent.startsWith('---')) {
  console.error('Invalid output: missing frontmatter');
  console.log(mdxContent.slice(0, 500));
  process.exit(1);
}

// Extract slug from frontmatter
const slugMatch = mdxContent.match(/slug_vi:\s*"([^"]+)"/);
if (!slugMatch) {
  console.error('Could not extract slug_vi from frontmatter');
  process.exit(1);
}
const slug = slugMatch[1];

// Remove slug_vi from frontmatter (not needed in final file)
mdxContent = mdxContent.replace(/\nslug_vi:.*\n/, '\n');

// Step 4: Save file
const outputPath = resolve(ARTICLES_DIR, `${slug}.mdx`);
if (existsSync(outputPath)) {
  console.log(`⚠️  File already exists: ${slug}.mdx — overwriting`);
}

writeFileSync(outputPath, mdxContent + '\n', 'utf-8');

// Extract title for display
const titleMatch = mdxContent.match(/title_vi:\s*"([^"]+)"/);
const title = titleMatch ? titleMatch[1] : slug;

console.log(`✅ Saved: src/content/articles/${slug}.mdx`);
console.log(`📄 Title: ${title}`);
console.log(`🔗 Route: /articles/${slug}`);

// Step 5: Git commit + push
const filePath = `src/content/articles/${slug}.mdx`;
try {
  execSync(`git add "${filePath}"`, { stdio: 'inherit' });
  execSync(`git commit -m "add: ${title}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  console.log('\n🚀 Committed & pushed. Vercel sẽ auto deploy.');
} catch (e) {
  console.error('\n⚠️  Git commit/push failed:', e.message);
  console.log('File đã lưu, bạn có thể commit thủ công.');
}
