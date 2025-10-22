#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpError } from "@modelcontextprotocol/sdk/types.js";
import colorizr from "colorizr";
import { z } from "zod";

// NOTE: MCP server tools require Zod schemas for inputSchema, not JSON Schema format.
// The registerTool method expects: (name, {title, description, inputSchema}, handler)
// where inputSchema uses Zod objects like: { field: z.string().describe("description") }

const server = new McpServer({
  name: "color-converter",
  version: "0.0.1",
  description: "A simple MCP server that converts colors between a variety of formats.",
});

server.registerTool(
  "convert",
  {
    title: "Color Converter",
    description: "Converts a color from one format to another.",
    inputSchema: {
      color: z.string().describe("The color string to convert (e.g., '#FF0000', 'rgb(255,0,0)')."),
      format: z.string().describe("The target color format (e.g., 'hex', 'rgb', 'hsl', 'oklch')."),
    },
  },
  async (args) => {
    const { color, format } = args;
    try {
      const c = new colorizr(color);
      let convertedColor;
      
      switch (format.toLowerCase()) {
        case 'hex':
          convertedColor = c.hex;
          break;
        case 'rgb':
          convertedColor = `rgb(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})`;
          break;
        case 'hsl':
          convertedColor = `hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)`;
          break;
        case 'oklch':
          convertedColor = `oklch(${(c.oklch.l * 100).toFixed(1)}% ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(3)})`;
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
      return {
        content: [{ type: "text", text: JSON.stringify({ color: convertedColor }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or format: ${error.message}`);
    }
  }
);

server.registerTool(
  "hex_to_oklch",
  {
    title: "Hex to OkLCH Converter",
    description: "Converts a hex color string to OkLCH format.",
    inputSchema: {
      hex: z.string().describe("The hex color string (e.g., '#FF0000')."),
    },
  },
  async (args) => {
    const { hex } = args;
    try {
      const c = new colorizr(hex);
      const oklchColor = `oklch(${(c.oklch.l * 100).toFixed(1)}% ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(3)})`;
      return {
        content: [{ type: "text", text: JSON.stringify({ oklch: oklchColor }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid hex color: ${error.message}`);
    }
  }
);

server.registerTool(
  "rgb_to_oklch",
  {
    title: "RGB to OkLCH Converter",
    description: "Converts an RGB color string to OkLCH format.",
    inputSchema: {
      rgb: z.string().describe("The RGB color string (e.g., 'rgb(255,0,0)')."),
    },
  },
  async (args) => {
    const { rgb } = args;
    try {
      const c = new colorizr(rgb);
      const oklchColor = `oklch(${(c.oklch.l * 100).toFixed(1)}% ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(3)})`;
      return {
        content: [{ type: "text", text: JSON.stringify({ oklch: oklchColor }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid RGB color: ${error.message}`);
    }
  }
);

server.registerTool(
  "hsl_to_oklch",
  {
    title: "HSL to OkLCH Converter",
    description: "Converts an HSL color string to OkLCH format.",
    inputSchema: {
      hsl: z.string().describe("The HSL color string (e.g., 'hsl(0,100%,50%)')."),
    },
  },
  async ({ hsl }) => {
    try {
      const c = new colorizr(hsl);
      const oklchColor = `oklch(${(c.oklch.l * 100).toFixed(1)}% ${c.oklch.c.toFixed(3)} ${c.oklch.h.toFixed(3)})`;
      return {
        content: [{ type: "text", text: JSON.stringify({ oklch: oklchColor }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid HSL color: ${error.message}`);
    }
  }
);

server.registerTool(
  "oklch_to_hex",
  {
    title: "OkLCH to Hex Converter",
    description: "Converts an OkLCH color string to hex format.",
    inputSchema: {
      oklch: z.string().describe("The OkLCH color string (e.g., 'oklch(63.269% 0.25404 19.90218)')."),
    },
  },
  async ({ oklch }) => {
    try {
      const c = new colorizr(oklch);
      const hexColor = c.hex;
      return {
        content: [{ type: "text", text: JSON.stringify({ hex: hexColor }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid OkLCH color: ${error.message}`);
    }
  }
);

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const transport = new StdioServerTransport();
await server.connect(transport);
