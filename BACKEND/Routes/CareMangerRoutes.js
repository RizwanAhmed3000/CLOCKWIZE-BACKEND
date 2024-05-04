import express from 'express'
import {searchCareManager} from '../Controllers/careManagerController.js'
// import { verifyToken } from '../Utils/verifyToken.js'



const careManagerRoute = express.Router()

// CREATE CARE 
careManagerRoute.get('/careManager', searchCareManager)

export default careManagerRoute