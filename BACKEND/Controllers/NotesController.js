import Notes from "../Models/NotesModel.js";

//====================  NEW NOTES =========================//
// http://localhost:8800/api/notes/
export const createNote = async (req, res, next) => {
  // console.log(req)
  const residentId = req.params.residentId;
  const newNotes = new Notes({ ...req.body, residentId: residentId });
  try {
    const saveNote = await newNotes.save();

    const { _id } = saveNote;
    // console.log(_id);
    await Notes.updateOne(
      { _id: req.params.residentId },
      {
        $push: { residentId: _id },
      }
    );
    res.status(200).send({
      status: "Successful",
      message: " Note Added Successfully",
      data: saveNote,
    });
  } catch (error) {
    next(error);
  }
};

// //UPDATE LOG
// http://localhost:8800/api/notes/:noteId
export const updateNote = async (req, res, next) => {
  try {
    const updateNote = await Notes.findByIdAndUpdate(
      req.params.noteId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      status: "Successful",
      message: "Note Updated Successfully",
      data: updateNote,
    });
  } catch (error) {
    next(error);
  }
};

// //DELETE LOG
// http://localhost:8800/api/notes/:noteId

export const deleteNote = async (req, res, next) => {
  try {
    await Notes.findByIdAndDelete(req.params.noteId);
    res.status(200).send({
      status: "Successful",
      message: "Note deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

//GET ALL RESIDENTS NOTES
// http://localhost:8800/api/notes/find/:residentId
// export const getResidentsNotes = async (req, res, next) => {
//   try {
//     const residentId = req.params.residentId
//     const Note = await Notes.find({ residentId: residentId });
//     console.log(Note)
//     !Note &&
//       res.status(404).send({
//         status: "Failed",
//         message: "Resident Notes not found",
//       });
//     res.status(200).send({
//       status: "Successful",
//       message: "Resident Notes Found",
//       data: Note,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const getResidentsNotes = async (req, res, next) => {
  try {
    const residentId = req.params.residentId;
    console.log(residentId);
    const note = await Notes.find({ residentId: residentId });
    // console.log(log)
    !note &&
      res.status(404).send({
        status: "Failed",
        message: "Resident Notes not found",
      });
    res.status(200).send({
      status: "Successful",
      message: "Resident Notes Found",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
