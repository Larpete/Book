const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialisation de l'application Express
const app = express();
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://admin:admin@db:27017/library?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));  

// Schéma du document "Book"
const bookSchema = new mongoose.Schema({
  title: String,
  pages: Number,
  publicationDate: Date,
  author: String,
  category: [String]
});

const Book = mongoose.model('Book', bookSchema);

// Création du service BookService
class BookService {
  // Récupérer tous les livres
  static async getAllBooks() {
    return await Book.find();
  }

  // Récupérer un livre par ID
  static async getBookById(id) {
    return await Book.findById(id);
  }

  // Ajouter un livre
  static async addBook(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }

  // Mettre à jour un livre
  static async updateBook(id, updateData) {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Supprimer un livre
  static async deleteBook(id) {
    return await Book.findByIdAndDelete(id);
  }
}

// Routes pour l'API
app.get('/books', async (req, res) => {
  const books = await BookService.getAllBooks();
  res.json(books);
});

app.get('/books/:id', async (req, res) => {
  const book = await BookService.getBookById(req.params.id);
  res.json(book);
});

app.post('/books', async (req, res) => {
  const newBook = await BookService.addBook(req.body);
  res.json(newBook);
});

app.put('/books/:id', async (req, res) => {
  const updatedBook = await BookService.updateBook(req.params.id, req.body);
  res.json(updatedBook);
});

app.delete('/books/:id', async (req, res) => {
  await BookService.deleteBook(req.params.id);
  res.status(204).send();
});

// Démarrer l'application
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
