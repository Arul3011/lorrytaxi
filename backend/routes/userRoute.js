const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');

//
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    console.log('📋 Fetched users:', allUsers);
  
    
    return res.status(200).json({ 
      data: allUsers,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ GET /users error:", error);
    console.error("❌ Error stack:", error.stack);
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      stack: error.stack
    });
  }
});





router.post('/users', async (req, res) => {
  try {
    const { uid ,name, email, phone, role, lorry } = req.body;
    // console.log(req.body);
    // res.status(201).json("scucess");
    

    // Basic validation
    if (!name || !email || !phone || !uid ) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    // Optional validation for lorry if role is DRIVER
    if (role === 'DRIVER' && !lorry) {
      return res.status(400).json({ message: 'Lorry details are required for DRIVER role' });
    }

    const newUser = await prisma.user.create({
  data: {
    id: uid, // Using Firebase UID as primary key
    name,
    email,
    phone,
    role: role || 'CONSUMER',
    
    // Create lorry only if role is DRIVER
    lorries: role === 'DRIVER'
      ? {
          create: [
            {
              plateNumber: lorry.plateNumber,
              type: lorry.type,
              capacity: parseFloat(lorry.capacity),
              color: lorry.color || null,
            },
          ],
        }
      : undefined,
  },
  include: {
    lorries: true, // So response includes created lorries
  },
});


    res.status(201).json(newUser);  
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email, phone or plate number already exists' });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', detail: error.message });
  }
});

router.post("/userDetails", async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }else{
console.log(uid);

    }

    const user = await prisma.user.findUnique({
      where: {
        id: uid,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user by UID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

})

router.delete('/',async(req,res)=>{
  // const { id } = req.body;
    await prisma.lorry.deleteMany();
   const respon = await prisma.user.deleteMany();
res.json(respon);
})
module.exports = router;