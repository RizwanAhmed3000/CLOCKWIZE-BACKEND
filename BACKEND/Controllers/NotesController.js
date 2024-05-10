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




// GET Queries 
// http://localhost:8000/api/notes/query?RAGRating=red
export const searchNotesTypesAndRatings = async (req, res, next) => {
  const { type, RAGRating } = req.query;
  const queryObject = {};

  if (type !== undefined) {
    queryObject.type = { $regex: `^${type}`, $options: "i" }; // Match if the string starts with 'type'
  }
  if (RAGRating !== undefined) {
    // Use RAGRatingRegex to match RAGRating values
    const RAGRatingRegex = /^(amber|green|red)$/i;
    queryObject.RAGRating = RAGRatingRegex; // Match if the string starts with 'amber', 'green', or 'red'
  }

  console.log("Query Object:", queryObject); // Log the query object before executing the query

  try {
    if (Object.keys(queryObject).length === 0) {
      // If queryObject is empty, no search parameters were provided
      return res.status(400).json({
        message: "No search parameters provided",
        status: "failed",
      });
    }

    const searchRes = await Notes.find(queryObject).limit(40); // Use queryObject to filter the search

    console.log("Search result:", searchRes);

    if (searchRes.length > 0) {
      res.status(200).json({
        message: "Notes found",
        data: searchRes,
      });
    } else {
      res.status(404).json({
        message: "Notes not found",
        status: "failed",
      });
    }
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


