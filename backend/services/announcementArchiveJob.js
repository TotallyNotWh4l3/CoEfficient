// backend/services/announcementArchiveJob.js
// Call startAnnouncementArchiveJob() once from server.js on boot.

import Announcement from "../models/Announcement.js";
import { broadcast } from "./announcementSyncService.js";

const CHECK_INTERVAL_MS = 60 * 60 * 1000; // hourly

export async function runOnce() {
    const archived = await Announcement.autoArchiveStale();
    archived.forEach((item) => broadcast("archived", item));
    if (archived.length) {
        console.log(`[announcement-archive-job] Auto-archived ${archived.length} announcement(s).`);
    }
}

export function startAnnouncementArchiveJob() {
    runOnce(); // run once on boot
    setInterval(runOnce, CHECK_INTERVAL_MS);
}
