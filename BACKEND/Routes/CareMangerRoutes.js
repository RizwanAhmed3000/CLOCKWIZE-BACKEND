import express from 'express'
import {createCareManger} from '../Controllers/careManagerController.js'
import { verifyToken } from '../Utils/verifyToken.js'



const careManagerRoute = express.Router()

// CREATE CARE 
careManagerRoute.post('/careManager',verifyToken, createCareManger)

export default careManagerRoute