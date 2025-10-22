import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function run() {
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['server.js'],
  });

  const client = new Client({
    name: 'test-client',
    version: '0.0.1',
  });

  await client.connect(transport);

  try {
    const result = await client.callTool({
      name: 'convert',
      arguments: {
        color: '#ff0000',
        format: 'hsl',
      },
    });
    console.log('Conversion result:', result);
  } catch (error) {
    console.error('Error calling tool:', error);
  } finally {
    await client.close();
  }
}

run();
