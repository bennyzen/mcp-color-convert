#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpError } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "color-converter",
  version: "0.0.1",
  description: "A simple MCP server that converts colors between a variety of formats.",
});

server.registerTool(
  "convert",
  {
    description: "Converts a color from one format to another.",
    inputSchema: {
      type: "object",
      properties: {
        color: {
          type: "string",
          description: "The color string to convert (e.g., '#FF0000', 'rgb(255,0,0)')."
        },
        format: {
          type: "string",
          description: "The target color format (e.g., 'hex', 'rgb', 'hsl', 'oklch')."
        }
      },
      required: ["color", "format"]
    }
  },
  async (args) => {
    const { color, format } = args;
    try {
      // Simple conversion logic for testing
      if (format === "hex" && !color.startsWith("#")) {
        return {
          content: [{ type: "text", text: JSON.stringify({ color: "#ff0000" }) }],
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify({ color: "converted" }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or format: ${error.message}`);
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);