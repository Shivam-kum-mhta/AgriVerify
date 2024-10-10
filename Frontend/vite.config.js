import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Buffer } from 'buffer'; // Correct import for Buffer
import { EventEmitter } from 'events'; // Correct import for EventEmitter
import dotenv from 'dotenv'
// https://vitejs.dev/config/
dotenv.config(); // Load environment variables from .env


export default defineConfig({
  plugins: [react()],
  define: {
    'global': {}, // Add global definitions if necessary
    'process.env': {}, // Allow access to process.env in your code
    Buffer: Buffer, // Correctly provide Buffer for browser compatibility
    EventEmitter: EventEmitter, // Provide EventEmitter for browser compatibility
  },
  resolve: {
    alias: {
      'buffer': 'buffer/',
      'events': 'events/',
    },
  },
});
