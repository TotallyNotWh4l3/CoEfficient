// backend/services/dashboardSyncService.js
//
// Unlike announcementSyncService (broadcasts to everyone), this MUST be
// scoped per-user — the whole point of a per-user dashboard is that other
// users don't see it, so a global broadcast would leak changes across
// accounts. Each user's own devices/tabs share one bucket in this map.

const clientsByUser = new Map(); // userId -> Set<res>

export function subscribe(userId, res) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.write("retry: 5000\n\n");

    if (!clientsByUser.has(userId)) {
        clientsByUser.set(userId, new Set());
    }
    clientsByUser.get(userId).add(res);

    res.on("close", () => {
        const bucket = clientsByUser.get(userId);
        if (!bucket) return;
        bucket.delete(res);
        if (bucket.size === 0) clientsByUser.delete(userId);
    });
}

/**
 * @param {number} userId - only this user's connected devices get the event
 * @param {'module-added'|'module-updated'|'module-removed'|'layout-updated'} type
 * @param {object} payload
 */
export function broadcast(userId, type, payload) {
    const bucket = clientsByUser.get(userId);
    if (!bucket) return;

    const message = `event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`;
    for (const res of bucket) {
        res.write(message);
    }
}
