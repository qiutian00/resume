# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal resume/CV static website. The resume content is maintained in Markdown (`README.md`) and converted to HTML (`index.html`) via a build script.

## Build Commands

```bash
# Install dependencies
npm install

# Convert README.md to index.html
npm run build
```

The build process uses the `marked` library to convert Markdown to HTML.

## Architecture

- `README.md` - Source of truth for resume content (edit this file)
- `build.js` - Node.js script that reads README.md and generates index.html
- `index.html` - Generated output (do not edit directly)
- `styles.css` - Styling for the resume page
- `netlify.toml` - Netlify deployment configuration with SPA redirect
- `me/` - Contains images, PDF versions of resume, and shared documents

## Deployment

The site is deployed to Netlify. The `netlify.toml` configures all routes to redirect to `index.html`.