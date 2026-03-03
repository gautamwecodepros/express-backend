export const filterUserUpdate = (req, res, next) => {
    const payload = req.body;
    const allowedUpdates = ["fullName", "email", "phone"];

    const updates = Object.keys(payload)
        .filter((key) => allowedUpdates.includes(key))
        .reduce((obj, key) => {
            if (payload[key] !== undefined) {
                obj[key] = payload[key];
            }
            return obj;
        }, {});

    if (Object.keys(updates).length === 0) {
        res.status(400).json({
            success: false,
            message: "Can't find any updatable fields to update",
        });
    }

    req.filteredUpdates = updates;

    next();
};
