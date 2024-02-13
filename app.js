const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const connectToMongoDB = require('./db')
const User = require('./modals/User') 
const app = express();
 connectToMongoDB()

app.use(cors())
app.use(express.static('public'));
// Connect to your database (e.g., MongoDB)
// Middleware to parse JSON data
app.use(bodyParser.json());



// Start the server
const port =  5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//end point
app.post('/create-user', async(req, res) =>{
  const {email, password} = req.body
  try{
    await User.create({
      email: email,
      password: password
    })

 
   res.status(201).json({message: 'User created.'})

  }
  catch{
    res.status(500).json({message:'Server Error'})
  }
})
//end point
app.post('/add-to-cart', async (req, res) => {
  const { itemName, price } = req.body;
  try {
      const newCartItem = new Cart({
          item: itemName,
          price: price
      });
      await newCartItem.save();
      res.status(201).json({ message: 'Item added to cart.' });
  } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart' });
  }
});


app.get('/open-main-page', (req, res) => {
  // Simply send the main HTML file when this route is accessed
  res.sendFile(__dirname + '/index.html'); // Change the filename if needed
});






