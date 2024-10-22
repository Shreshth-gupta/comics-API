
Comics API

This is the backend API for a React-based e-commerce store to manage comic books as inventory items. The API supports basic CRUD operations, user authentication, and provides a seamless experience for managing comic data.

Features
CRUD Operations: Create, Read, Update, and Delete comics in the inventory.
Authentication: User login and signup using JSON Web Tokens (JWT).
Search & Filtering: Find comics by title, author, genre, or publication year.
Pagination: Efficiently handle large inventories using paginated responses.
RESTful Design: Follows REST principles for easy integration with the frontend.
Installation
Follow these steps to set up the project locally:

Clone the repository:

bash
Copy code
git clone https://github.com/Shreshth-gupta/comics-API.git
cd comics-API
Install dependencies:

bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and add the following:

plaintext
Copy code
PORT=5000
DATABASE_URL=mongodb://localhost:27017/comicsDB
JWT_SECRET=your-secret-key
Run the development server:

bash
Copy code
npm start
The server should now be running on http://localhost:5000.

API Endpoints
Authentication
POST /api/auth/signup – Create a new user account
POST /api/auth/login – Log in and receive a JWT token
Comics Inventory
GET /api/comics – Get a list of comics (supports filtering and pagination)
POST /api/comics – Add a new comic (requires authentication)
GET /api/comics/
– Get details of a specific comic
PUT /api/comics/
– Update comic information (requires authentication)
DELETE /api/comics/
– Delete a comic (requires authentication)
Usage
Login and Authentication:

Use the /api/auth/login endpoint to get a JWT token.
Include the token in the Authorization header (Bearer <token>) for all protected routes.
Example Request (Adding a New Comic):

bash
Copy code
curl -X POST http://localhost:5000/api/comics \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-token>" \
-d '{
  "title": "Spider-Man: No Way Home",
  "author": "Marvel",
  "genre": "Superhero",
  "year": 2021,
  "price": 19.99
}'
Technologies Used
Node.js with Express – Backend framework
MongoDB – NoSQL database for storing comic data
JWT – Authentication using JSON Web Tokens
Mongoose – ORM for MongoDB
Future Enhancements
Add review and rating functionality for comics
Implement order management and checkout process
Integrate with payment gateways
Add image uploads for comic covers
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -m "Add new feature").
Push to the branch (git push origin feature-name).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
If you have any questions or suggestions, feel free to reach out:
Shreshtha Gupta – GitHub