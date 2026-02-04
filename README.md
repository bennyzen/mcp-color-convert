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


## Installation & Configuration

### MCP Client Configuration

This is the recommended way to use the MCP server. Add it to your MCP client configuration:

#### Claude Desktop or Gemini CLI
Add this server to your agent config file:

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

#### Custom MCP Client Configuration
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

The `npx -y mcp-color-convert@latest` command ensures:
- Automatic installation if not present
- Always uses the latest version
- No global dependencies required
- Works across different environments

Consult your MCP client's documentation for specific configuration details.

## Supported Color Formats

This MCP server supports conversion between the following color formats:

**Input Formats (any accepted):**
- **HEX**: `#FF0000`, `#ff0000`
- **RGB**: `rgb(255, 0, 0)`, `rgb(255,0,0)`
- **RGBA**: `rgba(255, 0, 0, 0.5)`, `rgba(255,0,0,0.5)` (with alpha/transparency)
- **HSL**: `hsl(0, 100%, 50%)`, `hsl(0,100%,50%)`
- **HSLA**: `hsla(0, 100%, 50%, 0.5)`, `hsla(0,100%,50%,0.5)` (with alpha/transparency)
- **OkLCH**: `oklch(63.269% 0.25404 19.90218)` (modern perceptual color space)
- **OkLCH with alpha**: `oklch(63.269% 0.25404 19.90218 / 0.5)` (alpha uses slash syntax)
- **OkLab**: `oklab(0.62796 0.22486 0.12585)` (perceptual color space)
- **OkLab with alpha**: `oklab(0.62796 0.22486 0.12585 / 0.5)` (alpha uses slash syntax)
- **Named Colors**: `red`, `blue`, `green`, `purple`, etc.

**Alpha/Transparency Support:**
All major color formats support alpha values (0-1 scale):
- RGBA/HSLA use comma syntax: `rgba(255, 0, 0, 0.5)`
- OkLCH/OkLab use slash syntax: `oklch(63.269% 0.25404 19.90218 / 0.5)`
- Alpha is preserved when converting between alpha-supporting formats
- Alpha is removed when converting to formats that don't support it (like hex)

**Output Formats (for convert tool):**
- `hex` - Returns: `#FF0000`
- `rgb` - Returns: `rgb(255 0 68)`
- `hsl` - Returns: `hsl(344 100% 50%)`
- `oklch` - Returns: `oklch(63.269% 0.25404 19.90218)`
- `oklab` - Returns: `oklab(0.62796 0.22486 0.12585)`

## Available Tools

### Color Conversion
- **`convert`** - Universal converter between any supported formats. Accepts any valid color input (hex, rgb, rgba, hsl, hsla, oklch, oklab, or named colors like 'red', 'blue') including alpha/transparency values and converts to hex, rgb, hsl, oklch, or oklab format. Alpha is preserved when converting between alpha-supporting formats, removed when converting to non-alpha formats. Uses colorizr's built-in convert function for optimal format handling.

### Color Manipulation
- **`lighten`** - Increase color lightness by percentage amount
- **`darken`** - Decrease color lightness by percentage amount
- **`saturate`** - Increase color saturation/intensity by percentage amount
- **`desaturate`** - Decrease color saturation/intensity by percentage amount
- **`invert`** - Create exact opposite/complementary color (180° hue rotation)
- **`grayscale`** - Convert color to grayscale using perceptual OkLCH
- **`rotate`** - Rotate hue by degrees around color wheel

### Color Analysis
- **`luminance`** - Get WCAG relative brightness (0-1 scale)
- **`chroma`** - Get color intensity/purity (0-1 scale)
- **`opacity`** - Extract alpha/opacity value (0-1 scale) from any color format that supports transparency
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

Convert any color format to another:
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

Convert named color to HSL:
```json
{
  "tool": "convert",
  "arguments": {
    "color": "blue",
    "format": "hsl"
  }
}
// Returns: "hsl(240 100% 50%)"
```

Convert RGBA to hex (alpha removed):
```json
{
  "tool": "convert",
  "arguments": {
    "color": "rgba(255, 0, 0, 0.5)",
    "format": "hex"
  }
}
// Returns: "#ff0000"
```

Convert RGBA to OkLCH (alpha preserved):
```json
{
  "tool": "convert",
  "arguments": {
    "color": "rgba(255, 0, 0, 0.5)",
    "format": "oklch"
  }
}
// Returns: "oklch(62.796% 0.25768 29.23494 / 0.5)"
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
// Returns: {"50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", ..., "950": "#172554"}
```


## Publishing & Deployment

### NPM Publishing

This package is published to NPM and can be used with `npx`:

```bash
npx -y mcp-color-convert@latest
```

**To publish a new version:**

1. Update version in `package.json`
2. Commit all changes
3. Run `npm publish` (this will automatically build before publishing)

**Build process:**
- TypeScript compiles to `dist/` directory
- Only `dist/`, `src/`, `README.md`, and `LICENSE` are included in the NPM package

## Development

### Setting Up Development Environment

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/bennyzen/mcp-color-convert.git
   cd mcp-color-convert
   npm install
   ```

2. **Test the MCP server locally:**
   ```bash
   # Test the server dry BEFORE trying to use it with an MCP client to catch obvious errors
   npx -y .
   ```

3. **Using with your agent (MCP client) locally:**
   - Update your MCP client configuration to point to the local installation (e.g., `npx -y /path/to/mcp-color-convert`)
   ```json
    {
      "mcpServers": {
        "color-converter": {
          "command": "npx",
          "args": [
            "-y",
            "/path/to/mcp-color-convert"
          ]
        }
      }
    }
   ```
   Important: Restart your MCP client after making configuration changes!


4. **Testing:**
    Use your MCP client to call the server and test various tools. You can enter phrases like:
    - "List all your color conversion tools"
    - "Convert #FF5733 to HSL"
    - "Lighten rgb(100, 150, 200) by 15%"
    - "Create a palette of red in oklch"


### Adding New Tools

To add new color tools:

1. Write the tool function following existing examples
2. Register the tool using `server.registerTool()`
3. Follow the existing pattern for input validation with Zod schemas
4. Handle errors with `McpError` for consistent error reporting

### Library Dependencies

- `@modelcontextprotocol/sdk` - MCP server framework
- `colorizr` - Color manipulation library (verify exports before use)
- `zod` - Input validation schemas

## Troubleshooting

### Server won't start
- Ensure Node.js 18+ is installed: `node --version`
- Try clearing npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### NPX execution issues
- Use the `-y` flag to auto-install: `npx -y mcp-color-convert@latest`
- Check NPM registry access: `npm ping`
- Verify package exists: `npm view mcp-color-convert`

### Build failures
- Ensure TypeScript is installed: `npm install`
- Clean build: `rm -rf dist/ .smithery/ && npm run build`
- Check for TypeScript errors: `npm run build:tsc`

### MCP Client connection issues
- Restart your MCP client after configuration changes
- Verify the server starts: `node dist/index.js` (should hang waiting for input - this is correct)
- Check logs in your MCP client for connection errors
- Ensure the path in your client config is correct

### Color conversion errors
- Verify color format matches supported types (hex, rgb, hsl, oklch, oklab)
- Check alpha values use correct syntax (comma for rgba/hsla, slash for oklch/oklab)
- Named colors must be valid CSS color names

## License
MIT License. See `LICENSE` file for details.
