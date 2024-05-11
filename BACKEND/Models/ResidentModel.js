import mongoose from "mongoose";
import { Schema } from "mongoose";
import Family from "./FamilyModel.js";

const ResidentSchema = new Schema(
  {
    residentName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    familyMember :{
      type:[String],
    },
    profileImage: {
      type: String,
    },
    age: {
      type: String,
    },
    dob: {
      type: String,
    },
    career: {
      type: String,
    },
    photos: {
      type: [String],
    },
    
    roomNo: {
      type: Number,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Resident", ResidentSchema);

// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import Family from '../Models/FamilyModel';

// const ResidentSchema = new Schema(
//   {
//     residentName: {
//       type: String,
//       required: true,
//     },
//     photos: {
//       type: [String],
//     },
//     age: {
//       type: String,
//     },
//     dob: {
//       type: String,
//     },
//     career: {
//       type: [String],
//     },
//     roomNo: {
//       type: Number,
//     },
//     families: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Family' }]
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Resident", ResidentSchema);
