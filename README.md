# MCP Color Converter

A comprehensive Model Context Protocol (MCP) server for color conversion, manipulation, analysis, and accessibility, designed for AI coding agents and assistants. This server provides a complete color toolkit for design systems, web development, and accessibility compliance using the `colorizr` library.

## Use Cases for AI Agents

- **UI/UX Design**: Convert design system colors between formats for different platforms
- **Web Development**: Transform colors for CSS, SVG, and canvas applications
- **Data Visualization**: Convert colors for charts and graphs using perceptually uniform OkLCH
- **Theme Generation**: Create consistent color palettes across different color spaces
- **Accessibility**: Ensure proper color contrast by working in perceptual color spaces
- **Design Systems**: Generate complete swatches and harmonious color schemes
- **Color Manipulation**: Lighten, darken, saturate, and rotate colors for UI states
- **Accessibility Compliance**: WCAG contrast analysis and text color optimization

Once configured, your AI coding agent will be able to discover and use these color conversion tools seamlessly within your development workflow.


## Installation

### Global Installation
```bash
npm install -g mcp-color-convert
```

### Use with npx (Recommended)
```bash
npx mcp-color-convert
```

## Supported Color Formats

This MCP server supports conversion between the following color formats:

- **HEX**: `#FF0000`, `#ff0000`
- **RGB**: `rgb(255, 0, 0)`, `rgb(255,0,0)`
- **HSL**: `hsl(0, 100%, 50%)`, `hsl(0,100%,50%)`
- **OkLCH**: `oklch(63.269% 0.25404 19.90218)` (modern perceptual color space)
- **OkLab**: `oklab(0.62796 0.22486 0.12585)` (perceptual color space)

## Available Tools

### Color Conversion
- **`convert`** - Universal converter between any supported formats (hex, rgb, hsl, oklch, oklab)

### Color Manipulation
- **`lighten`** - Increase color lightness by percentage amount
- **`darken`** - Decrease color lightness by percentage amount  
- **`saturate`** - Increase color saturation/intensity by percentage amount
- **`desaturate`** - Decrease color saturation/intensity by percentage amount
- **`invert`** - Create exact opposite/complementary color
- **`rotate`** - Rotate hue by degrees around color wheel

### Color Analysis
- **`luminance`** - Get WCAG relative brightness (0-1 scale)
- **`chroma`** - Get color intensity/purity (0-1 scale)
- **`opacity`** - Extract alpha/opacity value (0-1 scale)
- **`name`** - Get common color name or hex if unnamed

### Color Generation
- **`palette`** - Generate 6-color harmonious palette from base color
- **`scheme`** - Generate color harmonies (complementary, triadic, tetradic, etc.)
- **`swatch`** - Generate 11-shade design system swatch (50-950)
- **`random`** - Generate random color in specified format

### Accessibility Tools
- **`contrast`** - Calculate WCAG contrast ratio between two colors
- **`compare`** - Full WCAG compliance analysis with recommendations
- **`text_color`** - Get optimal text color (black/white) for background

### Utility Tools
- **`is_valid_color`** - Validate if color string is parseable

### Example Usage

Convert HEX to OkLCH:
```json
{
  "tool": "convert",
  "arguments": {
    "color": "#FF0000",
    "format": "oklch"
  }
}
// Returns: "oklch(63.269% 0.25404 19.90218)"
```

Lighten a color for hover state:
```json
{
  "tool": "lighten",
  "arguments": {
    "color": "#FF0000",
    "amount": 20
  }
}
// Returns: "#ff3333"
```

Check accessibility compliance:
```json
{
  "tool": "compare",
  "arguments": {
    "foreground": "#000000",
    "background": "#FFFFFF"
  }
}
// Returns: {"contrast": 21, "compliant": 1, "normalAA": true, "normalAAA": true, ...}
```

Generate design system swatch:
```json
{
  "tool": "swatch",
  "arguments": {
    "color": "#3B82F6"
  }
}
// Returns: {"50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", ... "950": "#172554"}
```

## MCP Client Configuration

### Claude Desktop or Gemini CLI Configuration example
Add this server to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "color-converter": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-color-convert@latest"
      ]
    }
  }
}
```

### Custom MCP Client Configuration
For any MCP client supporting stdio transport:

```json
{
  "servers": [
    {
      "name": "color-converter",
      "description": "AI-powered color conversion, manipulation, analysis, and accessibility tools for design systems",
      "transport": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "mcp-color-convert@latest"]
      }
    }
  ]
}
```

Consult your MCP client's documentation for specific configuration details.

## License
MIT License. See `LICENSE` file for details.
