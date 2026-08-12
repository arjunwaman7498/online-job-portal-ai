const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "arjunwaman12@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Arjun@12",
      10
    );

    const admin = await User.create({
      name: "Arjun",
      email: "arjunwaman12@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email: arjunwaman12@gmail.com");
    console.log("Password: Arjun@12");

    process.exit();
  } catch (error) {
    console.error("Create Admin Error:", error);
    process.exit(1);
  }
};

createAdmin();