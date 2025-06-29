// routes/user.routes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
// GET route
router.get('/',async (req, res) => {
  try {
    const allusers = await prisma.user.findMany();
    return res.status(200).json({data:allusers});
  } catch (error) {
   return res.status(500).json({messege:"server pblem" , error: error});
  }
 return res.status(200).json({ message: 'All users list' });
});

// POST route
router.post('/', (req, res) => {
  const { name } = req.body;
  res.json({ message: `User ${name} created` });
});
router.post("/test-register", async (req, res) => {
  const { uid, name, email, phone, role, lorry } = req.body;

  if (!uid || !email || !name || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        id: uid,
        name,
        email,
        phone,
        role,
      },
    });

    // If role is DRIVER, add lorry info too
    let newLorry = null;
    if (role === "DRIVER" && lorry) {
      newLorry = await prisma.lorry.create({
        data: {
          plateNumber: lorry.plateNumber,
          type: lorry.type,
          capacity: lorry.capacity,
          color: lorry.color,
          driverId: uid,
        },
      });
    }

    res.status(201).json({
      message: "User registered",
      user,
      lorry: newLorry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
