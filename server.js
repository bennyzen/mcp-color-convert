import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import colorizr from 'colorizr';
import { z } from 'zod';

const server = new McpServer({
  name: 'color-converter',
  version: '0.0.1',
  description: 'A simple MCP server that converts colors between a variety of formats.',
});

server.registerTool(
  'convert',
  {
    title: 'Color Converter',
    description: 'Converts a color from one format to another.',
    inputSchema: z.object({
      color: z.string(),
      format: z.string(),
    }),
    outputSchema: z.object({
      color: z.string(),
    }),
  },
  async (args) => {
    const { color, format } = args;
    try {
      const convertedColor = new colorizr(color).to(format);
      return {
        content: [{ type: 'text', text: JSON.stringify({ color: convertedColor }) }],
        structuredContent: { color: convertedColor },
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or format: ${error.message}`);
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
