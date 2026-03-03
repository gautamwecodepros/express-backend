export const filterRoomUpdate = async (req, res, next) => {
    const payload = req.body;

    const allowedUpdates = [
        "title",
        "rent",
        "listingType",
        "description",
        "images",
        "contactInfo",
        "totalCapacity",
        "currentOccupants",
        "preferredGender",
        "preferredOccupation",
        "location",
    ];

    const locationFields = ["street", "city", "state", "country", "zip"];

    const updates = {};

    for (let key in payload) {
        if (!allowedUpdates.includes(key)) continue;

        if (key === "location" && typeof payload.location === "object") {
            updates.location = {};
            for (let lockey in payload.location) {
                if (
                    locationFields.includes(lockey) &&
                    payload.location[lockey] !== undefined
                ) {
                    updates.location[lockey] = payload.location[lockey];
                }
            }
        } else if (payload[key] !== undefined) {
            updates[key] = payload[key];
        }
    }

    if (Object.keys(updates).length === 0) {
        res.status(400).json({
            success: false,
            message: "Can't find any updatable fields to update",
        });
    }

    req.filteredUpdates = updates;
    next();
};
