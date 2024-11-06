import InterestModel from "../Models/InterestModel.js";

export const addInterest = async (req, res, next) => {
    const residentId = req.params.residentId; // Get the resident ID from request parameters
    // console.log(req)
    const newInterest = new InterestModel({ ...req.body, residentId: residentId }); //createdBy: req.user.user._id
    try {
        const saveInterest = await newInterest.save();
        // console.log(saveLog)
        const { _id } = saveInterest;

        res.status(200).send({
            status: "Successful",
            message: "New Interest Added Successfully",
            data: saveInterest,
        });
    } catch (error) {
        next(error);
    }
};


export const getResidentsInterest = async (req, res, next) => {
    try {
        const { residentId } = req.params;

        // Query logs for the specified residentId and createdAt date range
        const interest = await InterestModel.find({
            residentId: residentId
        });

        if (!interest || interest.length === 0) {
            return res.status(404).send({
                status: "Failed",
                message: "Resident interest not found",
            });
        }

        res.status(200).send({
            status: "Success",
            message: "Resident interests found",
            data: interest,
        });
    } catch (error) {
        next(error);
    }
};
