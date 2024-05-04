import express from 'express'
import {createPlaylists} from '../Controllers/playlistController.js'
const playlistRoute = express.Router()

playlistRoute.post('/:residentId', createPlaylists)


export default playlistRoute