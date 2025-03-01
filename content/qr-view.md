---
title: 'Building QRView with Claude CLI'
date: '2025-03-01'
description: 'How I built a simple QR code generator with Claude CLI in an hour.'
---

# Building QRView with Claude CLI: From Frustration to Solution

When a friend complained about the lack of simple, no-nonsense QR code generators online, I saw the perfect opportunity to test out Anthropic's new Claude CLI tool. Here's how I turned a common frustration into a clean, functional web app in just a few hours.

## The Problem: QR Generators with Too Much Friction

"I just want to generate a QR code without signing up for anything or navigating through ads," my friend vented. Looking at existing options, I understood his point - most free QR generators were bloated with unnecessary features, ads, or required account creation.

The simple task of turning a URL into a scannable code had become unnecessarily complicated. This gave me an idea for a small, focused project that would be perfect for testing Claude CLI.

## Enter Claude CLI: AI Pair Programming at Its Best

I'd been eager to try Anthropic's Claude CLI since its release. Unlike web-based AI coding assistants, the CLI promised deeper integration with my development workflow, working directly in my terminal where I'm most comfortable.

Setting up the project was straightforward:

```bash
claude init
```

After a brief setup process, I described my vision: a clean, simple QR code generator using Nuxt 3, TypeScript, and ShadCN Vue. No sign-ups, no ads, just functionality.

## From Concept to Code: The Development Process

Claude immediately suggested using the `qrcode` npm package as the foundation. From there, we collaborated on building out the features:

1. **Core QR generation** - Converting URLs to QR codes with customizable settings
2. **UI design** - Implementing a clean, accessible interface with ShadCN components
3. **History panel** - Adding local storage to save previously generated codes
4. **Mobile optimizations** - Including native sharing on supported devices
5. **Animations** - Adding subtle loading states and transitions for a polished feel

What impressed me most was Claude's understanding of the entire stack. It didn't just write code snippets - it helped architect the app, suggested performance optimizations, and even caught potential bugs before I ran the code.

## The Result: QRView

The finished product, [QRView](https://qrview.netlify.app/), is exactly what my friend wanted - a clean, fast, and frictionless QR code generator. Enter a URL, customize if desired, and download or share the result.

Key features include:

- No account required
- Instant generation
- Customizable error correction and size
- Local history saving
- PNG and SVG download options
- Native sharing on mobile

## Reflections on Claude CLI

This project confirmed for me that Claude CLI is a significant step forward for AI coding assistants. The ability to work directly in my terminal, with access to my local files and development environment, made the experience feel like having a senior developer looking over my shoulder.

Some highlights of the Claude CLI experience:

- **Context awareness** - Claude understood the project structure and could reference and modify multiple files
- **Technical depth** - Solid understanding of Nuxt 3, TypeScript, and Vue.js architecture
- **Initiative** - Suggested improvements I hadn't thought of, like the history feature
- **Efficiency** - Completed in a few hours what might have taken a day otherwise

## Try It Yourself

If you're tired of complicated QR generators, give [QRView](https://qrview.netlify.app/) a try. It's open source, completely free, and will likely remain the simplest QR generator you've used.

And if you're a developer curious about AI-assisted coding, Claude CLI offers a compelling glimpse into the future of software development - where AI doesn't replace developers but amplifies their capabilities.

The full code is available on [GitHub](https://github.com/peopleoff/qrview), showcasing what's possible when human creativity meets AI assistance.