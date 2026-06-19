// This file exists to automatically start the server on platforms like Render 
// that default to running 'node index.js' instead of 'npm start'

// Register ts-node so Node can understand TypeScript on the fly
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs"
  }
});

// Load the actual server file
require('./src/server.ts');
