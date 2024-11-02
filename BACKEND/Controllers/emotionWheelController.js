import EmotionWheelModel from "../Models/EmotionWheelModel.js";

export const createEmotion = async (req, res, next) => {
    const residentId = req.params.residentId; // Get the resident ID from request parameters
    // console.log(req)
    const newLog = new EmotionWheelModel({ ...req.body, residentId: residentId }); //createdBy: req.user.user._id
    try {
        const saveLog = await newLog.save();
        // console.log(saveLog)
        const { _id } = saveLog;

        res.status(200).send({
            status: "Successful",
            message: "New log Added Successfully",
            data: saveLog,
        });
    } catch (error) {
        next(error);
    }
};


export const getResidentsEmotion = async (req, res, next) => {
    try {
        const { residentId } = req.params;
        const { date } = req.query; // Get date from query parameters

        // Convert date string to a JavaScript Date object
        const queryDate = new Date(date);

        // Set the time to cover the entire day (from midnight to 11:59:59 PM)
        const startDate = new Date(queryDate);
        startDate.setUTCHours(0, 0, 0, 0); // Set time to start of day
        const endDate = new Date(queryDate);
        endDate.setUTCHours(23, 59, 59, 999); // Set time to end of day

        // Query logs for the specified residentId and createdAt date range
        const logs = await EmotionWheelModel.find({
            residentId: residentId,
            createdAt: {
                $gte: startDate, // Greater than or equal to start of day
                $lte: endDate, // Less than or equal to end of day
            },
        });

        if (!logs || logs.length === 0) {
            return res.status(404).send({
                status: "Failed",
                message: "Resident logs not found for the specified date",
            });
        }

        res.status(200).send({
            status: "Success",
            message: "Resident logs found",
            data: logs,
        });
    } catch (error) {
        next(error);
    }
};
