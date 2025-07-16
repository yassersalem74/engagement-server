const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs');

// Use path.join to create cross-platform paths
const dbPath = path.join(__dirname, '../data/db.json');

// Create router and middlewares
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Enable CORS and body parsing
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom POST middleware to handle ID generation
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = Date.now().toString(); // Generate unique ID
    req.body.createdAt = new Date().toISOString(); // Add timestamp
  }
  next();
});

// Add delay to simulate real API (optional)
server.use((req, res, next) => {
  setTimeout(next, 500);
});

// Use router
server.use(router);

// Vercel serverless function handler
module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Pass to JSON Server
  return server(req, res);
};