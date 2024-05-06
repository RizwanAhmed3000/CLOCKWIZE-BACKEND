import PerfectDayModel from "../Models/PerfectDayModel.js";

// PERFECT DAY CREATION CONTROLLER
// http://localhost:8000/api/perfectDay/RESIDENTID/LOGINID
export const createPerfectDay = async (req, res, next) => {
  try {
    const residentId = req.params.residentId;
    const loginId = req.params.loginId;

    const perfectDay = new PerfectDayModel({
      ...req.body,
      residentId,
      loginId,
    });

    const savePerfectDays = await perfectDay.save();
    console.log(savePerfectDays);
    res.status(200).json({
      message: "Perfect Day Created Successfully",
      data: savePerfectDays,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PERFECT DAY API CONTROLLER
// http://localhost:8000/api/perfectDay/perfectDayid
export const updatePerfectDay = async (req, res, next) => {
  try {
    const updatePerfectDay = await PerfectDayModel.findByIdAndUpdate(
      req.params.perfectDayId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: "Successful",
      message: "Perfect Day Updated Successfully",
      data: updatePerfectDay,
    });
  } catch (error) {
    next(error);
  }
};

// GET PERFECT DAY
// http://localhost:8000/api/perfectDay/find/6638efdc36a4cfbacfad1a44
export const getPerfectDay = async (req, res, next) => {
  try {
    const getPerfectDay = await PerfectDayModel.findById(
      req.params.perfectDayId
    );
    res.status(200).json({
      status: "successful",
      message: "Perfect Day found Successfully",
      data: getPerfectDay,
    });
  } catch (error) {
    next(error);
  }
};



// DELETE PERFECT DAY
// http://localhost:8000/api/perfectDay/delete/perfectdayId
export const deletePerfectDay = async (req, res, next) => {
    try {
      const deletePerfectDay = await PerfectDayModel.findByIdAndDelete(
        req.params.perfectDayId
      );
      res.status(200).json({
        status: "successful",
        message: "Perfect Day Deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  };