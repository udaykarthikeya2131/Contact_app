const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let contacts = [
  { "contact_num": "+91 98245 67210", "name": "Charitha", "mail": "Charitha@example.com", "id": "1" },
  { "contact_num": "+91 90123 45876", "name": "Nandahas", "mail": "Nandahas@example.com", "id": "2" },
  { "contact_num": "+91 98765 12340", "name": "uday", "mail": "uday@example.com", "id": "3" },
  { "contact_num": "+91 91234 87654", "name": "Midhun", "mail": "midhun@example.com", "id": "4" },
  { "contact_num": "+91 98123 44321", "name": "Ruchitha", "mail": "ruchitha@example.com", "id": "5" },
  { "contact_num": "+91 95432 66789", "name": "Ajith", "mail": "ajith@example.com", "id": "6" },
  { "contact_num": "+91 96543 78901", "name": "Yaswanth", "mail": "yaswanth@example.com", "id": "7" },
  { "contact_num": "+91 90876 23456", "name": "Sujeethsign", "mail": "Sujeethsign@example.com", "id": "8" },
  { "contact_num": "+91 97654 33221", "name": "Rishitha", "mail": "Rishitha@example.com", "id": "9" },
  { "contact_num": "+91 93210 98765", "name": "pawankalyan" , "mail": "pawankalyan@example.com", "id": "10" }
];

function generateId() {
  return String(Date.now() + Math.floor(Math.random()*1000));
}

app.get('/api/contacts', (req, res) => {
  const q = req.query.search;
  if (q) {
    const qLower = q.toLowerCase().trim();
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(qLower));
    return res.json(filtered);
  }
  res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const c = contacts.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});

app.post('/api/contacts', (req, res) => {
  const { name, mail, contact_num } = req.body;
  if (!name || !mail || !contact_num) {
    return res.status(400).json({ error: 'name, mail and contact_num are required' });
  }
  const exists = contacts.find(c => c.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: 'Contact with this name already exists' });
  }
  const newContact = { id: generateId(), name, mail, contact_num };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
