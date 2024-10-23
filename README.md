Comics-API
A backend API built with Node.js and Express.js, using PostgreSQL for data storage. This API provides CRUD operations for managing comics, including sorting, filtering, and pagination features, suitable for integration with e-commerce applications.

Features
CRUD Operations: Manage comic book entries (create, read, update, delete).
Filtering & Sorting: Filter by author, year, price, and condition, with sorting and pagination.
PostgreSQL Database: Persistent data storage with SQL queries.
Authentication-ready: JWT support can be easily integrated for secure access.
Technologies Used
Node.js and Express.js: Server-side framework and routing.
PostgreSQL: Database for storing comics information.
Axios: For potential external API calls.
Body-Parser: Parsing incoming request bodies.
Installation and Setup
Clone the repository:

bash
Copy code
git clone https://github.com/Shreshth-gupta/comics-API.git
cd comics-API
Install dependencies:

bash
Copy code
npm install
Set up PostgreSQL and create a database:

sql
Copy code
CREATE DATABASE comics;
Add database credentials to a .env file:

makefile
Copy code
DB_USER=postgres
DB_HOST=localhost
DB_NAME=comics
DB_PASSWORD=Jack@1234
DB_PORT=5432
Run the server:

bash
Copy code
node index.js
The backend will be accessible at http://localhost:3000.

API Endpoints
Get All Comics
sql
Copy code
GET /
Fetches all comics.

Filtered Comics with Pagination
sql
Copy code
GET /comics?page=1&limit=10&author=John&sortBy=price&order=asc
Fetches comics based on filters like author, year, price, and condition.

Get Comic by ID
bash
Copy code
GET /comic/:id
Fetches a single comic by ID.

Add a Comic
bash
Copy code
POST /comics
Payload example:

json
Copy code
{
  "bookName": "Spider-Man",
  "authorName": "Stan Lee",
  "yearOfPublication": 1962,
  "price": 19.99,
  "discount": 5,
  "pages": 100,
  "condition": "New",
  "description": "Classic Marvel Comic"
}
Update Comic Details
bash
Copy code
PATCH /comic/:id
Updates a comic’s information.

Delete a Comic
bash
Copy code
DELETE /comic/:id
Deletes a comic entry by ID.

Future Improvements
Add JWT authentication for secure API access.
Implement a frontend using React.
Enhance error handling and input validation.