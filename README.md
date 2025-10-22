# MCP Color Converter

A Model Context Protocol (MCP) server that converts colors between various formats, designed for AI coding agents and assistants. This server enables seamless color format conversions within your AI workflows using the `colorizr` library.

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

## Available Tools

### `convert`
Universal color converter between any supported formats.
- **Input**: `color` (string), `format` (string: 'hex', 'rgb', 'hsl', 'oklch')
- **Output**: Converted color string

### `hex_to_oklch`
Converts HEX colors to modern OkLCH format.
- **Input**: `hex` (string, e.g., '#FF0000')
- **Output**: `oklch` (string)

### `rgb_to_oklch`
Converts RGB colors to modern OkLCH format.
- **Input**: `rgb` (string, e.g., 'rgb(255,0,0)')
- **Output**: `oklch` (string)

### `hsl_to_oklch`
Converts HSL colors to modern OkLCH format.
- **Input**: `hsl` (string, e.g., 'hsl(0,100%,50%)')
- **Output**: `oklch` (string)

### `oklch_to_hex`
Converts modern OkLCH colors back to HEX format.
- **Input**: `oklch` (string, e.g., 'oklch(63.269% 0.25404 19.90218)')
- **Output**: `hex` (string)

## MCP Client Configuration

### Claude Desktop Configuration
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

### Continue.dev Configuration
Add to your `config.json`:

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
      "description": "AI-powered color conversion between HEX, RGB, HSL, and OkLCH formats",
      "transport": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "mcp-color-convert@latest"]
      }
    }
  ]
}
```

### Example with Smithery CLI
For use with Smithery's infrastructure:

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

## Use Cases for AI Agents

- **UI/UX Design**: Convert design system colors between formats for different platforms
- **Web Development**: Transform colors for CSS, SVG, and canvas applications
- **Data Visualization**: Convert colors for charts and graphs using perceptually uniform OkLCH
- **Theme Generation**: Create consistent color palettes across different color spaces
- **Accessibility**: Ensure proper color contrast by working in perceptual color spaces

Once configured, your AI coding agent will be able to discover and use these color conversion tools seamlessly within your development workflow.
