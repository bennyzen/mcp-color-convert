#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpError } from "@modelcontextprotocol/sdk/types.js";
import { 
  convert,
  lighten,
  darken,
  saturate,
  desaturate,
  rotate,
  luminance,
  chroma,
  opacity,
  name,
  palette,
  scheme,
  swatch,
  random,
  contrast,
  compare,
  textColor,
  isValidColor
} from "colorizr";
import { z } from "zod";

// Optional: Configuration schema for session
export const configSchema = z.object({
  debug: z.boolean().default(false).describe("Enable debug logging"),
});

// NOTE: MCP server tools require Zod schemas for inputSchema, not JSON Schema format.
// The registerTool method expects: (name, {title, description, inputSchema}, handler)
// where inputSchema uses Zod objects like: { field: z.string().describe("description") }

const server = new McpServer({
  name: "color-converter",
  version: "0.0.1",
  description: "Comprehensive color toolkit for conversion, manipulation, analysis, generation, and accessibility testing.",
});

server.registerTool(
  "convert",
  {
    title: "Color Converter",
    description: "Converts a color from one format to another. Supports all major color formats including hex, rgb, rgba, hsl, hsla, oklch, oklab with full alpha/transparency support. Input can be any valid color string (hex, rgb, rgba, hsl, hsla, oklch, oklab, or named colors like 'red', 'blue'). Alpha values are preserved when converting between alpha-supporting formats, removed when converting to non-alpha formats. Available output formats: 'hex' (#FF0000), 'rgb' (rgb(255,0,0)), 'hsl' (hsl(0,100%,50%)), 'oklch' (oklch(63.3% 0.254 19.9)), 'oklab' (oklab(0.633 0.025 0.013)). Example: convert color '#FF0000' to format 'oklch'.",
    inputSchema: {
      color: z.string().describe("The color string to convert - accepts hex (#FF0000), rgb(255,0,0), rgba(255,0,0,0.5), hsl(0,100%,50%), hsla(0,100%,50%,0.5), oklch(63.3% 0.254 19.9), oklch(63.3% 0.254 19.9 / 0.5), oklab(0.633 0.025 0.013), oklab(0.633 0.025 0.013 / 0.5), or named colors ('red', 'blue', 'green'). Alpha values supported in all applicable formats."),
      format: z.string().describe("The target color format: 'hex', 'rgb', 'hsl', 'oklch', or 'oklab'."),
    },
  },
  async (args) => {
    const { color, format } = args;
    try {
      const convertedColor = convert(color, format as any);
      return {
        content: [{ type: "text", text: JSON.stringify({ color: convertedColor }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or format: ${(error as Error).message}`);
    }
  }
);



// Color Manipulation Tools
server.registerTool(
  "lighten",
  {
    title: "Lighten Color",
    description: "Increases the lightness of a color by a specified percentage amount. Perfect for creating lighter variations of colors for hover states, highlights, or design system variations.",
    inputSchema: {
      color: z.string().describe("The color string to lighten (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      amount: z.number().describe("The amount to increase lightness by (0-100). For example, 10 makes the color 10% lighter."),
    },
  },
  async ({ color, amount }) => {
    try {
      const result = lighten(color, amount);
      return {
        content: [{ type: "text", text: JSON.stringify({ lightened: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or amount: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "darken",
  {
    title: "Darken Color",
    description: "Decreases the lightness of a color by a specified percentage amount. Ideal for creating darker variations for active states, shadows, or depth in design systems.",
    inputSchema: {
      color: z.string().describe("The color string to darken (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      amount: z.number().describe("The amount to decrease lightness by (0-100). For example, 10 makes the color 10% darker."),
    },
  },
  async ({ color, amount }) => {
    try {
      const result = darken(color, amount);
      return {
        content: [{ type: "text", text: JSON.stringify({ darkened: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or amount: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "saturate",
  {
    title: "Saturate Color",
    description: "Increases the saturation (intensity/vibrancy) of a color by a specified percentage amount. Use this to make colors more vivid and eye-catching.",
    inputSchema: {
      color: z.string().describe("The color string to saturate (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      amount: z.number().describe("The amount to increase saturation by (0-100). For example, 20 makes the color 20% more saturated."),
    },
  },
  async ({ color, amount }) => {
    try {
      const result = saturate(color, amount);
      return {
        content: [{ type: "text", text: JSON.stringify({ saturated: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or amount: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "desaturate",
  {
    title: "Desaturate Color",
    description: "Decreases the saturation (intensity/vibrancy) of a color by a specified percentage amount. Perfect for creating muted tones, subtle backgrounds, or less prominent UI elements.",
    inputSchema: {
      color: z.string().describe("The color string to desaturate (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      amount: z.number().describe("The amount to decrease saturation by (0-100). For example, 20 makes the color 20% less saturated."),
    },
  },
  async ({ color, amount }) => {
    try {
      const result = desaturate(color, amount);
      return {
        content: [{ type: "text", text: JSON.stringify({ desaturated: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or amount: ${(error as Error).message}`);
    }
  }
);



server.registerTool(
  "rotate",
  {
    title: "Rotate Color Hue",
    description: "Rotates the hue of a color by specified degrees around the color wheel. Perfect for creating color harmonies, analogous colors, or systematic color variations.",
    inputSchema: {
      color: z.string().describe("The color string to rotate (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      degrees: z.number().describe("The number of degrees to rotate the hue (0-360). Positive values rotate clockwise, negative counter-clockwise. For example, 180 creates the complementary color."),
    },
  },
  async ({ color, degrees }) => {
    try {
      const result = rotate(color, degrees);
      return {
        content: [{ type: "text", text: JSON.stringify({ rotated: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or degrees: ${(error as Error).message}`);
    }
  }
);

// Color Analysis Tools
server.registerTool(
  "luminance",
  {
    title: "Get Color Luminance",
    description: "Calculates the WCAG relative brightness of a color (0-1 scale, where 0 is pure black and 1 is pure white). Critical for accessibility compliance and determining if colors are light or dark.",
    inputSchema: {
      color: z.string().describe("The color string to analyze (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
    },
  },
  async ({ color }) => {
    try {
      const result = luminance(color);
      return {
        content: [{ type: "text", text: JSON.stringify({ luminance: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "chroma",
  {
    title: "Get Color Chroma",
    description: "Calculates the chroma (color intensity/purity) of a color (0-1 scale, where 0 is grayscale and 1 is maximum intensity). Useful for understanding color vibrancy and saturation levels.",
    inputSchema: {
      color: z.string().describe("The color string to analyze (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
    },
  },
  async ({ color }) => {
    try {
      const result = chroma(color);
      return {
        content: [{ type: "text", text: JSON.stringify({ chroma: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "opacity",
  {
    title: "Get Color Opacity",
    description: "Extracts the opacity/alpha value from any color format (0-1 scale, where 0 is fully transparent and 1 is fully opaque). Works with rgba, hsla, oklch, oklab, and any format that supports transparency. Essential for working with transparent colors and overlays.",
    inputSchema: {
      color: z.string().describe("The color string to analyze (e.g., '#FF0000', 'rgb(255,0,0)', 'hsl(0,100%,50%)', 'rgba(255,0,0,0.5)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Works with any color format that supports transparency."),
    },
  },
  async ({ color }) => {
    try {
      const result = opacity(color);
      return {
        content: [{ type: "text", text: JSON.stringify({ opacity: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "name",
  {
    title: "Get Color Name",
    description: "Attempts to identify the common name of a color. Returns the color name if recognizable (e.g., 'red', 'blue', 'forestgreen'), otherwise returns the hex code. Useful for user-friendly color identification.",
    inputSchema: {
      color: z.string().describe("The color string to name (e.g., '#FF0000', 'rgb(255,0,0)', 'hsl(0,100%,50%)')."),
    },
  },
  async ({ color }) => {
    try {
      const result = name(color);
      return {
        content: [{ type: "text", text: JSON.stringify({ name: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color: ${(error as Error).message}`);
    }
  }
);

// Color Generation Tools
server.registerTool(
  "palette",
  {
    title: "Generate Color Palette",
    description: "Generates a harmonious color palette from a base color. Creates 6 evenly spaced colors around the color wheel. Perfect for creating color schemes, themes, or design system foundations.",
    inputSchema: {
      color: z.string().describe("The base color to generate palette from (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      type: z.string().optional().describe("Optional palette type: 'default' (rainbow-style) or 'monochromatic' (same hue, varying lightness). Defaults to 'default'."),
    },
  },
  async ({ color, type }) => {
    try {
      const options = type ? { type } as any : {};
      const result = palette(color, options);
      return {
        content: [{ type: "text", text: JSON.stringify({ palette: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or type: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "scheme",
  {
    title: "Generate Color Scheme",
    description: "Generates specific color harmonies from a base color. Supports complementary, triadic, tetradic, and other classic color theory relationships. Essential for creating balanced, professional color combinations.",
    inputSchema: {
      color: z.string().describe("The base color to generate scheme from (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      type: z.string().describe("Scheme type: 'complementary' (2 colors), 'triadic' (3 colors), 'tetradic' (4 colors), 'analogous' (adjacent colors), or 'split-complementary'."),
    },
  },
  async ({ color, type }) => {
    try {
      const result = scheme(color, type as any);
      return {
        content: [{ type: "text", text: JSON.stringify({ scheme: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or scheme type: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "swatch",
  {
    title: "Generate Color Swatch",
    description: "Creates a complete 11-shade swatch from a base color (50, 100, 200...950). This is the industry standard for design systems like Tailwind CSS. Perfect for creating consistent light-to-dark variations.",
    inputSchema: {
      color: z.string().describe("The base color to generate swatch from (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
      lightnessFactor: z.number().optional().describe("Optional multiplier for lightness adjustments (default: 1.0). Higher values create more contrast between shades."),
      maxLightness: z.number().optional().describe("Optional maximum lightness cap (0-1, default: 0.95). Prevents shades from becoming too light."),
      minLightness: z.number().optional().describe("Optional minimum lightness floor (0-1, default: 0.05). Prevents shades from becoming too dark."),
    },
  },
  async ({ color, lightnessFactor, maxLightness, minLightness }) => {
    try {
      const options: any = {};
      if (lightnessFactor !== undefined) options.lightnessFactor = lightnessFactor;
      if (maxLightness !== undefined) options.maxLightness = maxLightness;
      if (minLightness !== undefined) options.minLightness = minLightness;
      
      const result = swatch(color, options);
      return {
        content: [{ type: "text", text: JSON.stringify({ swatch: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid color or options: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "random",
  {
    title: "Generate Random Color",
    description: "Generates a random color in the specified format. Useful for testing, prototyping, or when you need inspiration for new color choices.",
    inputSchema: {
      format: z.string().optional().describe("Optional format for the random color: 'hex', 'rgb', 'hsl', 'oklch', 'oklab'. Defaults to 'hex'."),
    },
  },
  async ({ format }) => {
    try {
      const result = random((format || 'hex') as any);
      return {
        content: [{ type: "text", text: JSON.stringify({ random: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid format: ${(error as Error).message}`);
    }
  }
);

// Accessibility Tools
server.registerTool(
  "contrast",
  {
    title: "Calculate Color Contrast",
    description: "Calculates the WCAG contrast ratio between two colors (1-21 scale, where higher values mean better contrast). Essential for accessibility compliance - AA requires 4.5:1 for normal text, AAA requires 7:1.",
    inputSchema: {
      foreground: z.string().describe("The foreground/text color (e.g., '#000000', 'rgb(0,0,0)', 'rgba(0,0,0,0.8)', 'hsl(0,0%,0%)', 'hsla(0,0%,0%,0.8)', 'oklch(0% 0 0 / 0.8)', 'oklab(0 0 0 / 0.8)'). Supports all formats including alpha variants."),
      background: z.string().describe("The background color (e.g., '#FFFFFF', 'rgb(255,255,255)', 'rgba(255,255,255,0.8)', 'hsl(0,0%,100%)', 'hsla(0,0%,100%,0.8)', 'oklch(100% 0 0 / 0.8)', 'oklab(1 0 0 / 0.8)'). Supports all formats including alpha variants."),
    },
  },
  async ({ foreground, background }) => {
    try {
      const result = contrast(foreground, background);
      return {
        content: [{ type: "text", text: JSON.stringify({ contrast: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid colors: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "compare",
  {
    title: "WCAG Color Compliance Analysis",
    description: "Performs comprehensive WCAG accessibility analysis between two colors. Returns contrast ratio, compliance levels (AA/AAA), and recommendations. Critical for ensuring your color combinations meet accessibility standards.",
    inputSchema: {
      foreground: z.string().describe("The foreground/text color to analyze (e.g., '#000000', 'rgb(0,0,0)', 'rgba(0,0,0,0.8)', 'hsl(0,0%,0%)', 'hsla(0,0%,0%,0.8)', 'oklch(0% 0 0 / 0.8)', 'oklab(0 0 0 / 0.8)'). Supports all formats including alpha variants."),
      background: z.string().describe("The background color to analyze (e.g., '#FFFFFF', 'rgb(255,255,255)', 'rgba(255,255,255,0.8)', 'hsl(0,0%,100%)', 'hsla(0,0%,100%,0.8)', 'oklch(100% 0 0 / 0.8)', 'oklab(1 0 0 / 0.8)'). Supports all formats including alpha variants."),
    },
  },
  async ({ foreground, background }) => {
    try {
      const result = compare(foreground, background);
      return {
        content: [{ type: "text", text: JSON.stringify({ analysis: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid colors: ${(error as Error).message}`);
    }
  }
);

server.registerTool(
  "text_color",
  {
    title: "Get Optimal Text Color",
    description: "Determines the best text color (black or white) for maximum readability on a given background color. Automatically calculates which provides better contrast. Perfect for dynamic UI elements with variable backgrounds.",
    inputSchema: {
      background: z.string().describe("The background color to analyze (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)'). Supports all formats including alpha variants."),
    },
  },
  async ({ background }) => {
    try {
      const result = textColor(background);
      return {
        content: [{ type: "text", text: JSON.stringify({ textColor: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Invalid background color: ${(error as Error).message}`);
    }
  }
);

// Utility Tools
server.registerTool(
  "is_valid_color",
  {
    title: "Validate Color",
    description: "Checks if a color string is valid and parseable. Supports hex, rgb, hsl, oklab, oklch formats, and named colors. Essential for input validation and error handling.",
    inputSchema: {
      color: z.string().describe("The color string to validate (e.g., '#FF0000', 'rgb(255,0,0)', 'rgba(255,0,0,0.5)', 'hsl(0,100%,50%)', 'hsla(0,100%,50%,0.5)', 'oklch(63.3% 0.254 19.9 / 0.5)', 'oklab(0.633 0.025 0.013 / 0.5)', 'red', 'invalidcolor'). Supports all formats including alpha variants."),
    },
  },
  async ({ color }) => {
    try {
      const result = isValidColor(color);
      return {
        content: [{ type: "text", text: JSON.stringify({ valid: result }) }],
      };
    } catch (error) {
      throw new McpError(-32000, `Validation error: ${(error as Error).message}`);
    }
  }
);

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Smithery requires default export function
export default function createServer({ config }: { config?: any }) {
  return server.server;
}

// Auto-connect when run as a standalone server (not when imported by Smithery)
// This handles: node dist/index.js, npx mcp-color-convert, and MCP clients
if (!process.env.SMITHERY) {
  const transport = new StdioServerTransport();
  server.connect(transport);
}
