import { connectToDatabase } from "../src/config/database"
import { hashPassword, ROLE_PERMISSIONS } from "../src/config/auth"

async function createAdminUser() {
  try {
    const db = await connectToDatabase()
    const users = db.collection("users")

    // Check if admin user already exists
    const existingAdmin = await users.findOne({ email: "admin@example.com" })
    if (existingAdmin) {
      console.log("✅ Admin user already exists")
      return
    }

    // Create admin user
    const hashedPassword = await hashPassword("password123")
    const adminUser = {
      email: "admin@example.com",
      password: hashedPassword,
      name: "System Administrator",
      role: "admin",
      permissions: ROLE_PERMISSIONS.admin,
      department: "IT",
      isActive: true,
      createdAt: new Date(),
    }

    const result = await users.insertOne(adminUser)
    console.log("✅ Admin user created successfully:", result.insertedId)
    console.log("📧 Email: admin@example.com")
    console.log("🔑 Password: password123")
  } catch (error) {
    console.error("❌ Error creating admin user:", error)
  }
}

createAdminUser()
