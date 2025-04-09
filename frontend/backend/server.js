const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Backend Server!');
});

app.get('/api/menu', (req, res) => {
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', description: 'Cheese & tomato', price: 299 },
    { id: 2, name: 'Paneer Butter Masala', description: 'Creamy paneer curry', price: 249 },
    { id: 3, name: 'Veg Biryani', description: 'Spicy biryani rice', price: 199 }
  ];
  res.json(menuItems);
});

app.post('/api/contact', (req, res) => {
  const contactData = req.body;
  const filePath = path.join(__dirname, 'contactData.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let contacts = [];
    if (!err && data) {
      try {
        contacts = JSON.parse(data);
      } catch (e) {
        console.error("Error parsing JSON", e);
      }
    }

    contacts.push(contactData);

    fs.writeFile(filePath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Error saving contact data:', err);
        return res.status(500).json({ message: 'Failed to save data' });
      }
      res.status(200).json({ message: 'Contact data saved successfully!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
