import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/launch_digital_library_development"
})

class Book {
  constructor({ title, author, pageCount, page_count, description, fiction, id = null }) {
    this.id = id
    this.title = title
    this.author = author
    this.pageCount = pageCount || page_count
    this.description = description
    this.fiction = fiction
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM books")
      const bookData = result.rows
      const books = bookData.map((book) => {
        return new Book(book)
      })
      return books

    } catch (err) {
      console.error(err)
      throw(err)
    }
  }

  static async findById(bookId) {
    try {
      const result = await pool.query(`SELECT * FROM books WHERE id = ${bookId};`)

      const bookData = result.rows[0]
      const book = new Book(bookData)
      return book

    } catch (error) {
      console.log(error)
      throw(error)
    }
  }

  async save() {
    try {
      const queryString = "INSERT INTO books (title, author, page_count, description, fiction) VALUES ($1,$2,$3,$4,$5) RETURNING id;"
      
      const result = await pool.query(queryString, [this.title, this.author, this.pageCount, this.description, this.fiction])
      this.id = result.rows[0].id

      return true
    } catch (err) {
      console.error(error)
      throw (error)
    }
  }
}

export default Book