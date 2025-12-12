#!/usr/bin/env node

/**
 * Helper script to generate URLs for the AgentChatWindow component
 * Usage: node generate-url.js <path-to-json-file>
 * Or pipe JSON: echo '{"messages":[...]}' | node generate-url.js
 */

const fs = require('fs');
const readline = require('readline');

// Base URL - update this when deployed
const BASE_URL = process.env.COMPONENT_URL || 'https://your-deployment-url.com';

function generateUrl(jsonData) {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    // Encode as base64 for URL
    const encoded = Buffer.from(JSON.stringify(data)).toString('base64');
    
    // URL encode the base64 string
    const urlEncoded = encodeURIComponent(encoded);
    
    return `${BASE_URL}?encoded=${urlEncoded}`;
  } catch (error) {
    console.error('Error generating URL:', error.message);
    process.exit(1);
  }
}

// Read from file or stdin
const args = process.argv.slice(2);

if (args.length > 0) {
  // Read from file
  const filePath = args[0];
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const url = generateUrl(jsonData);
  console.log('\n📋 Generated URL:');
  console.log(url);
  console.log('\n💡 Use this URL in your agent to render the chat window with data.\n');
} else {
  // Read from stdin
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let input = '';
  rl.on('line', (line) => {
    input += line + '\n';
  });

  rl.on('close', () => {
    const url = generateUrl(input.trim());
    console.log('\n📋 Generated URL:');
    console.log(url);
    console.log('\n💡 Use this URL in your agent to render the chat window with data.\n');
  });
}
