# MCP Color Converter

This document outlines the implementation plan for a simple MCP server that converts colors between a variety of formats using the colorizr npm package.

## Plan

1.  **Initialize the project:** Create a `package.json` file and install the necessary dependencies (`@modelcontextprotocol/sdk`, `colorizr`, `zod`).
2.  **Create the server:** Create an `index.js` file that will contain the MCP server code.
3.  **Implement the `convert` command:** The server will expose a `convert` command that takes a color string and a target format as input and returns the converted color.
4.  **Implement specific conversion tools:** Add tools like `hex_to_oklch`, `rgb_to_oklch`, `hsl_to_oklch`, and `oklch_to_hex` for more granular control.
5.  **Add error handling:** The server will handle invalid color strings and target formats.
6.  **Configure as npx package:** Add a `bin` entry to `package.json` and a shebang to `index.js`.
7.  **Create `README.md`:** Document the server, its tools, and usage instructions.