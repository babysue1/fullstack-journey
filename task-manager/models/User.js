// Import database connection and bcrypt for password hashing
const pool = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  // Static method to create a new user (can be called without creating an instance)
  static async create(userData) {
    const { username, email, password } = userData;

    // Hash the password with bcrypt (12 rounds of salting for security)
    const passwordHash = await bcrypt.hash(password, 12);

    // SQL query with parameterized values ($1, $2, $3) to prevent SQL injection
    const query = `
      INSERT INTO users (name, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email, created_at
    `;

    // Execute the query with the values
    const result = await pool.query(query, [username, email, passwordHash]);

    // Return the newly created user (without password)
    return result.rows[0];
  }

  // Find user by email (for login)
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0]; // Returns user object or undefined
  }

  // Find user by ID (for authentication)
  static async findById(id) {
    const query =
      "SELECT id, username, email, created_at FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

// Export the User class so other files can use it
module.exports = User;
