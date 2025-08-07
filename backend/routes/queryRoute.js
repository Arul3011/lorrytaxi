// routes/user.routes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// GET route
// router.get('/', (req, res) => {
//   res.json({ message: 'All users list' });
// });

// POST route
const getcod = async (place) => {
  const apires = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json`, {
    headers: {
      'User-Agent': 'arul-dev.vercel.app'
    }
  });
  const jdata = await apires.json();
  if (!jdata.length) return null;
  return [jdata[0].lon, jdata[0].lat];
};


const getroute = async(start,end)=>{
  const apiKey = "5b3ce3597851110001cf6248968c35de8ee54735b042b17dcfcd82f4";
   const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [start, end],
          })
        });
        const jres = await response.json();
        return jres.features[0].geometry.coordinates;
        
   }
router.post('/', async (req, res) => {
  try {
    const { from, to, weight, clientId } = req.body;
    // console.log(from,to);
    

    const fromc = await getcod(from);
    const toc = await getcod(to);

    if (!fromc || !toc) {
      return res.status(400).json({ message: 'Invalid from/to location' });
    }

  
const path = await getroute(fromc,toc);
if(from && to && path){
try {
   const newQuery = await prisma.query.create({
      data: {
        from: fromc,           // Expecting an array of strings [lat, lng]
        to: toc,               // Expecting an array of strings [lat, lng]
        weight: weight,       // Expecting a float
        routePath: path, // Optional: Expecting JSON or null
        client: {
          connect: { id: clientId }, // Connect using clientId (FK to User)
        },
        // status, createdAt, and updatedAt are auto-handled
      }
    });
} catch (error) {
  return res.status(500).json({message : error})
}
}else{
  return res.status(500).json({message :"something went wrong"});
}



    res.status(201).json({message : "querry added scucessfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create query', error });
  }
});


module.exports = router;
