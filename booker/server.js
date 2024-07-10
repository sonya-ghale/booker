// // server.js

// const express = require('express');
// const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// app.use(cors());

// app.use(
//   '/api/reservations',
//   createProxyMiddleware({
//     target: 'https://checkout.stripe.com',
//     changeOrigin: true,
//     // headers: {
//     //   Authorization: 'sk_test_51Op9hvLN0v7UmgaT3Gb5RRaWYD9Kj7siv8CBCc7KXfVLLzDTHpQgC2rG08D8SzdewfJilz1iqp1RoQ3NS4r3XM4k00GGRzPcLj',
//     // },
   
//   })
// );

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.use(
  '/api/reservations',
  createProxyMiddleware({
    target: 'https://checkout.stripe.com',
    changeOrigin: true,
  })
);

// Default route handler for other URLs
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

