// backend/controllers/locationsController.js
import crypto from "node:crypto";
import Location from "../models/Location.js";

const isManagerOrAbove = (user) => ["manager", "admin"].includes(user.role?.toLowerCase());

const locationsController = {
    // GET /api/locations -> everyone (any authenticated user) sees the shared list
    async getAll(req, res) {
        try {
            res.json(await Location.findAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to load locations." });
        }
    },

    // POST /api/locations -> manager/admin only
    async create(req, res) {
        if (!isManagerOrAbove(req.user)) {
            return res.status(403).json({ message: "Only managers or admins can add locations." });
        }

        const { name, latitude, longitude, timezone } = req.body;

        if (!name || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: "Name, latitude, and longitude are required." });
        }

        try {
            const id = crypto.randomUUID();
            await Location.create({
                id,
                userId: req.user.id, // audit trail: who added it, not an owner
                name,
                latitude,
                longitude,
                timezone,
                builtIn: false,
            });

            res.status(201).json(await Location.findById(id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to create location." });
        }
    },

    // PATCH /api/locations/:id -> manager/admin only
    async update(req, res) {
        if (!isManagerOrAbove(req.user)) {
            return res.status(403).json({ message: "Only managers or admins can edit locations." });
        }

        try {
            const existing = await Location.findById(req.params.id);
            if (!existing) {
                return res.status(404).json({ message: "Location not found." });
            }

            await Location.update(req.params.id, req.body);
            res.json(await Location.findById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update location." });
        }
    },

    // DELETE /api/locations/:id -> manager/admin only, built-in locations are protected
    async remove(req, res) {
        if (!isManagerOrAbove(req.user)) {
            return res
                .status(403)
                .json({ message: "Only managers or admins can delete locations." });
        }

        try {
            const existing = await Location.findById(req.params.id);
            if (!existing) {
                return res.status(404).json({ message: "Location not found." });
            }
            if (existing.builtIn) {
                return res.status(403).json({ message: "Built-in locations can't be deleted." });
            }

            await Location.deleteById(req.params.id);
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete location." });
        }
    },
};

export default locationsController;
