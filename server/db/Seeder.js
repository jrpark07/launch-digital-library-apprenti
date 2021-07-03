import pg from 'pg'
const pool = new pg.Pool({ connectionString: "postgres://postgres:password@localhost:5432/launch_digital_library_development" })

class Seeder {
  static async seed() {
    const book = {
      title: "Lord of the Rings",
      author: "Joe",
      page_count: 12345,
      description: "Its about a kid who has to deliver a ring",
      fiction: true
    }

    const queryString = `INSERT INTO books (title, author, page_count, description, fiction)
     VALUES ('${book.title}', '${book.author}', '${book.page_count}', '${book.description}', '${book.fiction}');`

    //execute our query
    try {
      const result = await pool.query(queryString)

    } catch (error) {
      console.log(`Error: ${error}`)

    }
  }
}

export default Seeder




// class Seeder {
//   static async seed() {
//     try {
//       const result = await pool.query("SELECT * FROM books;")
//       console.log(result.rows)
//       pool.end()
//     } catch (error) {
//       console.log(error)
//       pool.end()
//     }
//   }
// }