# NGP AI Assistant — Figma Plugin

A Figma/FigJam plugin that connects to any LLM to generate content directly on your board. Built for design sprint workflows — generate How Might We stickies, summarise notes, turn markdown into stickies, or run any prompt and place the output on the board.

---

## Features

| Tab | What it does |
|---|---|
| **HMW** | Select stickies → generates How Might We statements as new stickies |
| **Summarise** | Select stickies → places a structured summary as a text block on the board |
| **From Markdown** | Paste markdown → splits content into individual stickies |
| **Prompt** | Free-form prompt → output placed as stickies or a text block |

---

## Supported LLM providers

| Provider | Format |
|---|---|
| Anthropic (Claude) | Native |
| OpenAI (GPT) | OpenAI compatible |
| Google Gemini | Native |
| Mistral | OpenAI compatible |
| Groq | OpenAI compatible |
| Ollama (local) | OpenAI compatible |
| Custom / local proxy | Your choice |

---

## Installation

This is a **development plugin** — it runs locally from your machine and is not listed in the Figma Community.

### Requirements

- Figma desktop app (Mac or Windows)
- An API key from any supported LLM provider

### Steps

1. **Download or clone this folder** to your machine

2. **Open Figma or FigJam** (desktop app — the browser version does not support local development plugins)

3. From the menu bar: **Main Menu → Plugins → Development → Import plugin from manifest**

4. Navigate to this folder and select **`manifest.json`**

5. The plugin is now installed. Run it from:
   **Main Menu → Plugins → Development → NGP AI Assistant**

---

## First-time setup

When you run the plugin for the first time, a setup screen will appear.

### 1. Choose a preset

Click your LLM provider to pre-fill the URL and format:

- **Anthropic** → `https://api.anthropic.com`
- **OpenAI** → `https://api.openai.com`
- **Gemini** → `https://generativelanguage.googleapis.com`
- **Mistral** → `https://api.mistral.ai`
- **Groq** → `https://api.groq.com/openai`
- **Ollama** → `http://localhost:11434/v1` (no key required)
- **Custom** → enter your own base URL (e.g. a local proxy)

### 2. Enter your API key

Get your key from your provider's developer console:

| Provider | Where to get your key |
|---|---|
| Anthropic | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| OpenAI | [platform.openai.com](https://platform.openai.com) → API Keys |
| Gemini | [aistudio.google.com](https://aistudio.google.com) → Get API Key |
| Mistral | [console.mistral.ai](https://console.mistral.ai) → API Keys |
| Groq | [console.groq.com](https://console.groq.com) → API Keys |
| Ollama | No key needed — leave the field blank or enter any string |

> **Your key is stored only in your local Figma client** (`figma.clientStorage`). It is never sent anywhere other than directly to your chosen LLM endpoint.

### 3. Confirm the model

Each preset fills in a default model. You can change it to any model your account has access to.

**Examples:**
- `claude-sonnet-latest`, `claude-opus-4-6`
- `gpt-4o`, `gpt-4o-mini`
- `gemini-2.0-flash`, `gemini-1.5-pro`
- `mistral-large-latest`
- `llama-3.3-70b-versatile` (Groq)
- `llama3.2`, `mistral` (Ollama)

### 4. Save and continue

Click **Save and continue**. Settings are remembered — you won't need to re-enter them next time.

To update your settings at any time, click the **gear icon** (⚙) in the top right corner of the plugin.

---

## Using the plugin

### HMW (How Might We)

1. Select one or more stickies on the board containing observations or research notes
2. Choose a sticky colour
3. Click **Generate HMW stickies**
4. 8–10 HMW statements appear as new stickies in a grid at the centre of your viewport

### Summarise

1. Select one or more stickies on the board
2. Click **Generate summary**
3. A structured text block (overview + key themes + open questions) is placed on the board

### From Markdown

1. Paste any markdown into the text area (lists, headers, bullet points)
2. Choose a sticky colour
3. Click **Create stickies from markdown**
4. Each point becomes an individual sticky

### Prompt

1. Type any prompt in the text area
2. Choose output format: **Stickies** (one per line) or **Text block**
3. Click **Generate**

---

## Sharing with your team

Each team member installs the plugin independently using the steps above. They enter their own API key during setup — keys are stored per-person in their local Figma client and are never shared.

For teams using a shared internal proxy (e.g. a local API gateway), set the preset to **Custom**, enter the proxy base URL, and share the proxy credentials through your normal secure channel.

---

## File structure

```
figma-plugin/
  manifest.json   — Figma plugin configuration
  code.js         — Plugin sandbox: reads/writes Figma nodes via the Plugin API
  ui.html         — Plugin UI: settings screen, tabs, LLM API calls
  README.md       — This file
```
