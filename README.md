# SeedSpy

> **⚠️ This project is no longer actively maintained.** It was an exploratory side project and has been archived. The code is available as-is for reference or inspiration.

Minecraft seed analysis tool built with React 19, TypeScript and Tailwind CSS, powered by [Cubiomes](https://github.com/Cubitect/cubiomes) for seed computation.

## What it does

SeedSpy lets you analyze Minecraft world seeds — visualize biome layouts, locate key structures, and explore generation data without launching the game.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styles**: Tailwind CSS
- **Seed computation**: Cubiomes (via WebAssembly)

## Project Structure

```
seedspy/
├── src/
│   ├── components/     # UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Cubiomes WASM bindings & utilities
│   └── types/          # TypeScript types
├── public/
└── index.html
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Status

This project reached a proof-of-concept stage and was put on hold. Core seed parsing and basic biome rendering were functional. Features such as structure search, slime chunk overlay, and seed comparison were planned but never completed.

If you're building something similar, feel free to use this as a reference.

## Author

**Julien Larzul** · [julienlarzul.com](https://www.larzuljulien.com) · [LinkedIn](https://linkedin.com/in/julien-larzul)
