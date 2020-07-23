const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: 'Burrata',
      level: 'Easy Peasy',
      ingredients: ['tomato', 'buffalo mozzarella'],
      cuisine: 'Italian',
      dishType: 'snack',
      image:
        'https://www.google.com/search?q=burrata&rlz=1C5CHFA_enPT905PT905&sxsrf=ALeKk01O6EopXDcqGEo2s_k33gt28tikxw:1595525272292&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiv4tbo8uPqAhVT6uAKHe1fBkIQ_AUoAXoECBsQAw&biw=1598&bih=883#imgrc=pLyrj3bS6mSShM',
      duration: 15,
      creator: 'Lorenzo Bianchin',
      created: new Date(1900, 9, 7)
    });
  })
  .then(recipe => {
    console.log('Created recipe', recipe.title);
    return Recipe.insertMany(data);
  })
  .then(data => {
    console.log('Created multiple recipes', data);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(data => {
    console.log('Sucess! Updated recipe!', data);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(data => {
    console.log('Deleted recipe!', data);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('disconnected from mongoDB');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
