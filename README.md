# Remarker

A Markdown parser and renderer built from scratch. It is a drop-in replacement for [marked.js](https://github.com/markedjs/marked): same call shape, same script-tag-or-`require()` usage, but with a handful of extra features built in.

```js
const remarker = require('./remarker.js');
remarker.parse('# Hello **world**');
// '<h1 id="hello-world">Hello <strong>world</strong> ...</h1>\n'
```

No dependencies, no build step. `remarker.js` is the entire library.

## Install

Copy `remarker.js` into your project, or clone this repository:

```sh
git clone https://github.com/<your-username>/remarker.git
```

### Browser

```html
<script src="remarker.js"></script>
<script>
  document.body.innerHTML = remarker.parse('# Hello **world**');
</script>
```

### Node

```js
const remarker = require('./remarker.js');
remarker.parse('# Hello **world**');
```

## Usage

```js
remarker(source, options);              // shorthand for remarker.parse()
remarker.parse(source, options);        // full document -> HTML string
remarker.parseInline(source, options);  // a single line/fragment, no block-level elements
remarker.setOptions(options);           // merge options into the defaults
```

### Options

| Option | Default | Description |
| --- | --- | --- |
| `headerIds` | `true` | Generate an `id` (and a clickable `#` anchor) on every heading. |
| `highlight` | `true` | Enable the built-in syntax highlighter on fenced code blocks. |
| `sanitize` | `false` | Escape raw HTML instead of passing it through unchanged. |

## Migrating from marked.js

Swap the import, nothing else changes:

```js
// before
const html = marked.parse(markdown);

// after
const html = remarker.parse(markdown);
```

Standard Markdown parses the same way it always has. Every extension below only triggers on syntax that plain Markdown doesn't otherwise use, so existing documents are unaffected.

## Features

Everything you'd expect from a Markdown engine (headings, emphasis, lists, links, images, fenced/indented code, blockquotes, GFM tables, horizontal rules, raw HTML passthrough, escaping), plus:

- **Colored and styled spans**: `` [text]{color="tomato" bg="#222" .class} `` renders as a styled `<span>`, no HTML required. `color`/`bg` accept any CSS color (named colors like `red`/`gold`/`steelblue`, hex codes, or `rgb()`/`hsl()`)
- **Highlighting**: `` ==text== `` renders as `<mark>`
- **Callouts**: GitHub-style `> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`/`[!DANGER]`, `[!SUCCESS]`
- **Footnotes**: `[^id]` references and `[^id]: text` definitions
- **Table of contents**: a lone `[TOC]` line becomes a generated list of links to every heading
- **Sized and smart media**: `![alt](url "title" =WIDTHxHEIGHT)`; URLs ending in `.mp4`/`.webm`/`.mov`/`.mp3`/`.wav`, or YouTube/Vimeo links, render as real `<video>`/`<audio>`/embedded players instead of broken `<img>` tags
- **Built-in syntax highlighting**: fenced code blocks get a language label and token highlighting with no `highlight.js`/`Prism` dependency (JS, TS, Python, Bash, JSON, CSS, HTML, Java, C/C++/C#, Go, Rust, PHP, Ruby, SQL, YAML)
- **Spoilers**: `||text||` hides content until it's clicked or focused
- **Sub/superscript**: `H~2~O`, `x^2^`
- **Keyboard keys**: `[[Ctrl]]` renders as `<kbd>Ctrl</kbd>`
- **Color swatches**: a hex/`rgb()`/`hsl()` value inside `` `inline code` `` gets a small live color preview next to it
- **Reference-style links/images**, autolinks, and link-reference definitions

## License

See [LICENSE](LICENSE).
