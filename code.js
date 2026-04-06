// NGP AI Assistant — Figma Plugin Sandbox
// Communicates with ui.html via postMessage. All Figma API calls happen here.

figma.showUI(__html__, { width: 420, height: 560, title: 'NGP AI Assistant' });

// Load saved settings and send to UI on launch
async function init() {
  const settings = await figma.clientStorage.getAsync('ngp-settings');
  figma.ui.postMessage({ type: 'init', settings: settings || null });
  sendSelection();
}

init();

figma.on('selectionchange', sendSelection);

function sendSelection() {
  const texts = getSelectedStickyTexts();
  figma.ui.postMessage({ type: 'selection', texts });
}

function getSelectedStickyTexts() {
  return figma.currentPage.selection
    .filter(n => n.type === 'STICKY')
    .map(n => n.text.characters.trim())
    .filter(Boolean);
}

figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'save-settings') {
      await figma.clientStorage.setAsync('ngp-settings', msg.settings);
      figma.ui.postMessage({ type: 'settings-saved' });
    } else if (msg.type === 'create-stickies') {
      await createStickies(msg.items, msg.color);
    } else if (msg.type === 'create-text') {
      await createTextBlock(msg.content);
    } else if (msg.type === 'get-selection') {
      sendSelection();
    }
  } catch (err) {
    figma.ui.postMessage({ type: 'error', message: err.message });
  }
};

async function createStickies(items, colorHex) {
  if (!items || items.length === 0) return;

  const COLS = 4;
  const STICKY_SIZE = 200;
  const GAP = 20;
  const center = figma.viewport.center;
  const totalCols = Math.min(items.length, COLS);
  const totalRows = Math.ceil(items.length / COLS);
  const startX = center.x - (totalCols * (STICKY_SIZE + GAP)) / 2;
  const startY = center.y - (totalRows * (STICKY_SIZE + GAP)) / 2;

  const color = hexToRgb(colorHex || '#FFEB3B');
  const created = [];

  for (let i = 0; i < items.length; i++) {
    const sticky = figma.createSticky();
    sticky.text.characters = items[i];
    sticky.fills = [{ type: 'SOLID', color }];
    sticky.x = startX + (i % COLS) * (STICKY_SIZE + GAP);
    sticky.y = startY + Math.floor(i / COLS) * (STICKY_SIZE + GAP);
    figma.currentPage.appendChild(sticky);
    created.push(sticky);
  }

  figma.currentPage.selection = created;
  figma.viewport.scrollAndZoomIntoView(created);
  figma.ui.postMessage({ type: 'done', count: created.length });
}

async function createTextBlock(content) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const center = figma.viewport.center;
  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Regular' };
  text.characters = content;
  text.fontSize = 16;
  text.textAutoResize = 'HEIGHT';
  text.resize(600, text.height);
  text.x = center.x - 300;
  text.y = center.y;
  figma.currentPage.appendChild(text);
  figma.currentPage.selection = [text];
  figma.viewport.scrollAndZoomIntoView([text]);
  figma.ui.postMessage({ type: 'done', count: 1 });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}
