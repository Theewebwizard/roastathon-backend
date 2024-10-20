const express = require('express');
const router = express.Router();

let pets = [
  { id: 1, name: 'Buddy', type: 'dog', breed: 'Golden Retriever', age: '3 years', info: 'Friendly and energetic', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONYzUJxzKuAwEmaZa_Mfm4-HHrhCyWqpf6g&s', password: 'password123' },
  { id: 2, name: 'Whiskers', type: 'cat', breed: 'Siamese', age: '2 years', info: 'Calm and cuddly', image: 'https://example.com/whiskers.jpg', password: 'password456' }
];

router.get('/pets', (req, res) => {
  res.json(pets.map(({ password, ...pet }) => pet));
});

router.post('/pets', (req, res) => {
    const newPet = {
      id: Date.now(), // Unique ID based on timestamp
      ...req.body
    };
    pets.push(newPet);
    res.status(201).json({ message: 'Pet added successfully', id: newPet.id });
  });
  
router.delete('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pets.findIndex(pet => pet.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Pet not found' });
    }
  
    console.log('Stored password:', pets[index].password); // Log the stored password
    console.log('Provided password:', req.body.password); // Log the provided password
  
    if (pets[index].password.toLowerCase() !== req.body.password.toLowerCase()) {
        return res.status(401).json({ message: 'Incorrect password' });
      }      
  
    pets.splice(index, 1);
    res.json({ message: 'Pet deleted successfully' });
  });
  
module.exports = router;