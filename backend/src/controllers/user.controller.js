import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";

const healthCheck = asyncHandler( async (req , res) => {
    res.status(200).json(new ApiResponse(200,"OK"))
} )

export { healthCheck }