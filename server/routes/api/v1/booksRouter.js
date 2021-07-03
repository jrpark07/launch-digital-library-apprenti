import express from "express"

import Book from "../../../models/Book.js"

const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  try {
  const bookObject = await Book.findAll()
  res.status(200).json({ books: bookObject })

  } catch (err) {
    console.error(err)
    res.status(500).json({errors: error})
  }
})

booksRouter.get("/:id", async (req, res) => {
  try {
  const bookObject = await Book.findById(req.params.id)
  res.status(200).json({ book: bookObject })
  
  } catch (err) {
    console.error(err)
    res.status(500).json({ errors: error})
  }
})

booksRouter.post("/", async (req, res) => {
  try {
    const newBookObject = new Book(req.body)
    await newBookObject.save()
    res.status(201).json({ book: newBookObject })

  } catch (err) {
    console.error(err)
    res.status(500).json({ errors: error })
  }
})

export default booksRouter