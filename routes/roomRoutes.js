const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/auth'); // Sửa đường dẫn nếu cần

router.get('/', authMiddleware.verifyToken, roomController.getAllRooms);
router.get('/:id', authMiddleware.verifyToken, roomController.getRoomById);
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, roomController.createRoom);
router.put('/:id', authMiddleware.verifyToken, roomController.updateRoom);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, roomController.deleteRoom);
router.put('/status/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, roomController.updateRoomStatus);
router.get('/search', authMiddleware.verifyToken, roomController.searchRooms);


module.exports = router;
