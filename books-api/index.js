// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// import our node modules
import express from "express";
import fs from "fs/promises";

// declare app variable - creating a new instance of express for us to use
const app = express();

// define our port number
const port = 3000;

// tell our server what kind of data it will be recieving and responding - JSON
app.use(express.json());

// Turn on our sever so it can listen and respond at port #
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()
// make a helper function that will get the name and descrition of all books
async function getAllBooks() {
  // read the data from books-data.json
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks;
}

// 2. getOneBook(index)
async function getOneBook(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks[index];
}

// 3. getOneBookTitle(index)
async function getOneBookTitle(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);

  const book = parsedBooks[index];

  // if the index does not exist, return null
  if (!book) return null;

  // return ONLY the title
  return book.title;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books
app.get("/get-all-books", async (req, res) => {
  const books = await getAllBooks();
  // res.send() sends text data
  // res.json() sends JSON data
  res.json(books);
});

// 2. GET /get-one-book/:index
app.get("/get-one-book/:index", async (req, res) => {
  // get the value of the dynamic parameter
  const index = req.params.index;
  // call the helper function
  const book = await getOneBook(index);

  // optional: basic not-found handling
  if (!book) {
    return res.status(404).json({ error: "No book found at that index." });
  }

  // send the book as JSON in the response
  res.json(book);
});

// 3. GET /get-one-book-title/:index
app.get("/get-one-book-title/:index", async (req, res) => {
  // get the value of the dynamic parameter
  const index = req.params.index;

  // call the helper function
  const title = await getOneBookTitle(index);

  // if no book found at that index
  if (!title) {
    return res.status(404).json({ error: "No book found at that index." });
  }

  // send ONLY the title
  res.json({ title: title });
});