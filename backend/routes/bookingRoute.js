// routes/user.routes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
// GET route
router.get('/', (req, res) => {
  res.json({ message: 'All users list' });
});

router.post('/accept',(req,res)=>{
const {id} = req.body;
});

router.post('/reject',(req,res)=>{
const {id} = req.body;

});
router.post('/', async (req, res) => {
  try {
    const {
      queryId,
      consumerId,
      driverId,
      lorryId,
      isPaidHaly,
      totalAmt
    } = req.body;
    
    const queryDet = await prisma.query.findUnique({
      where: { id: queryId }
    });

    if (!queryDet) {
      return res.status(404).json({ message: 'Query not found' });
    }

    // Initialize routePath with from/to locations
    const routePath = [
      { lat: queryDet.fromLat, lng: queryDet.fromLng },
      { lat: queryDet.toLat, lng: queryDet.toLng }
    ];

    const booking = await prisma.booking.create({
      data: {
        queryId,
        consumerId,
        driverId,
        lorryId,
        currentLat: queryDet.fromLat,
        currentLng: queryDet.fromLng,
        routePath
      }
    });

    return res.status(201).json({ message: 'Booking created', data: booking });
  } catch (error) {
    console.error('❌ Booking creation failed:', error);
    return res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});


router.post('/update-location', async (req, res) => {
  try {
    const { lat, lon, bookingId } = req.body;

    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId
      },
      data: {
        currentLat: parseFloat(lat),
        currentLng: parseFloat(lon)
      }
    });

    return res.status(200).json({
      message: 'Lorry location updated',
      data: updatedBooking
    });
  } catch (error) {
    console.error('❌ Error updating location:', error);
    return res.status(500).json({ message: 'Failed to update lorry location', error: error.message });
  }
});



module.exports = router;
