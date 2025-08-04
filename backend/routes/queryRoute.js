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

//  const newQuery = await prisma.query.create({
//       data: {
//         from,
//         fromc[0],
//         fromc[1],
//         to,
//         toc[0],
//         toLng,
//         weight,
//         clientId,
//       }
//     });


    // return res.status(201).json({ data: {
    // from : fromc,
    // to : toc,
    // route : path
    // }});
    res.status(201).json({from ,to ,path});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create query', error });
  }
});


module.exports = router;
