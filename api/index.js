const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Enable CORS and body parsing
server.use(middlewares);
server.use(jsonServer.bodyParser);

// In-memory database
let db = {
  users: [
    {
      id: "1",
      name: "yasser",
      message: "hello iam yasser salem"
    },
    {
      id: "2",
      name: "merna",
      message: "hello iam merna alaa"
    }
  ]
};

// Custom routes
server.get('/users', (req, res) => {
  res.jsonp(db.users);
});

server.post('/users', (req, res) => {
  const newUser = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.users.push(newUser);
  res.status(201).json(newUser);
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
  });
}

// For Vercel deployment
module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Pass to server
  return server(req, res);
};