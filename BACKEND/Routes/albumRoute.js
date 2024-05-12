import express from "express";
import {
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbum,
  getAllAlbum
} from "../Controllers/albumController.js";

const albumRoutes = express.Router();

//localhost:8800/api/album/:residentId
albumRoutes.post("/:residentId", createAlbum);

//localhost:8800/api/album/update/:albumId
albumRoutes.put("/update/:albumId", updateAlbum);

//localhost:8800/api/album/delete/:albumId
albumRoutes.delete("/delete/:albumId", deleteAlbum);

//localhost:8800/api/album/find/:albumId
albumRoutes.get("/find/:albumId", getAlbum);

//localhost:8800/api/album/findAll/:albumId
albumRoutes.get("/:residentId", getAllAlbum);
export default albumRoutes;
