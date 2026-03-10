import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const validateData = (schema) =>
    asyncHandler((req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
        });

        if (!result.success)
            throw new ApiError(400, result.error.issues[0].message);

        req.body = result.data.body;
        req.params = result.data.params;

        next();
    });
