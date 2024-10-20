import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";


const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "comics",
    password: "Jack@1234",
    port: 5432
  });
  db.connect();
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //initial page where you get all the comic
  app.get("/", async(req,res)=>{
    try{
    const result =await db.query("select * from comics");
    res.json(result.rows);
    }catch(error){
        console.error("Query error:", error.stack);
        res.status(500).send("Failed to fetch comics.");
    }
  });
  // get things filter and sorting 
  app.get("/comics", async (req, res) => {
    const {
      page = 1,
      limit = 10, 
      sortBy = "id", 
      order = "asc", 
      author, year, price, condition 
    } = req.query;
  
    try {
      const filters = [];
      const values = [];
  
      if (author) {
        filters.push(`author_name ILIKE $${filters.length + 1}`);
        values.push(`%${author}%`);
      }
      if (year) {
        filters.push(`year_of_publication = $${filters.length + 1}`);
        values.push(parseInt(year));
      }
      if (price) {
        filters.push(`price <= $${filters.length + 1}`);
        values.push(parseFloat(price));
      }
      if (condition) {
        filters.push(`condition ILIKE $${filters.length + 1}`);
        values.push(`%${condition}%`);
      }
  
      const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
      const offset = (page - 1) * limit;
  
      const query = `
        SELECT * FROM comics
        ${whereClause}
        ORDER BY ${sortBy} ${order.toUpperCase()}
        LIMIT $${values.length + 1} OFFSET $${values.length + 2};
      `;
  
      const result = await db.query(query, [...values, limit, offset]);
  
      res.status(200).json({
        comics: result.rows,
        page: parseInt(page),
        limit: parseInt(limit),
        total: result.rows.length
      });
    } catch (error) {
      console.error("Query error:", error.stack);
      res.status(500).send("Failed to fetch comics.");
    }
  });

  // get comic by id
  app.get("/comic/:id", async(req,res)=>{
  try {
    const result = await db.query("SELECT * FROM comics WHERE id = $1", [parseInt(req.params.id)]);

    if (result.rows.length === 0) {
      return res.status(404).send("Comic not found");
    }

    console.log(result.rows);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Query error:", error.stack);
    res.status(500).send("Database query failed");
  }
  });

  //post your comic book
  app.post("/comics", async (req, res) => {
    const { bookName, authorName, yearOfPublication, price, discount, pages, condition, description } = req.body;
    console.log(req.body);
  
    try {
      const query = `
        insert into comics (book_name, author_name, year_of_publication, price, discount, pages, condition, description)
        values ($1, $2, $3, $4, $5, $6, $7, $8)  returning *;
      `;
      const values = [bookName, authorName, yearOfPublication, price, discount, pages, condition, description];
  
      const result = await db.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Insert error:", error.stack);
      res.status(500).send("Failed to add comic.");
    }
  });
  //for updating a values
  app.patch("/comic/:id", async (req, res) => {
    const { id } = req.params; 
    const updates = req.body; 
  
    try {
      const fields = Object.keys(updates);
      const values = Object.values(updates);
  
      if (fields.length === 0) {
        return res.status(400).send("No fields to update.");
      }
  
      const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
      const query = `update comics set ${setClause} where id = $${fields.length + 1}  returning *;`;
  
      const result = await db.query(query, [...values, id]);
  
      if (result.rows.length === 0) {
        return res.status(404).send("comic not found.");
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Update error:", error.stack);
      res.status(500).send("Failed to update comic.");
    }
  });
// for deletion of data
  app.delete("/comic/:id", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM comics WHERE id = $1", [parseInt(req.params.id)]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Comic not found" });
      }
  
      await db.query("DELETE FROM comics WHERE id = $1", [parseInt(req.params.id)]);
  
      res.status(200).json({ message: "Comic deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error.stack);
      res.status(500).json({ message: "Failed to delete comic" });
    }
  });

  app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
