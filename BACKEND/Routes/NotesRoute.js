import express from "express";

import {
  createNote,
  updateNote,
  deleteNote,
  getResidentsNotes,
} from "../Controllers/NotesController.js";
import { verifyToken } from "../Utils/verifyToken.js";

const notesRoute = express.Router();

// Create NOTES
// http://localhost:8800/api/note/:residentId
notesRoute.post("/:residentId", createNote);

// UPDATE NOTES
// http://localhost:8800/api/notes/:noteId
notesRoute.put("/:noteId", updateNote);

// DELETE NOTES
// http://localhost:8800/api/notes/:noteId
notesRoute.delete("/:noteId", deleteNote);


// GET RESIDENTS NOTES
// http://localhost:8800/api/notes/find/:residentId
notesRoute.get("/find/:residentId", getResidentsNotes);


export default notesRoute;
