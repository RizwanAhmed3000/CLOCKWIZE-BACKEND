import express from 'express'
import {createPlaylists, getResidentPlaylist} from '../Controllers/playlistController.js'
const playlistRoute = express.Router()

playlistRoute.post('/:residentId', createPlaylists)

playlistRoute.get('/:residentId', getResidentPlaylist)


export default playlistRoute