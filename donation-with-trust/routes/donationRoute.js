import express from 'express'
const router = express.Router()
import { addDonation, getDonations } from '../controllers/donationController.js'

router.route('/add').post(addDonation)
router.route('/get').get(getDonations)

export default router
