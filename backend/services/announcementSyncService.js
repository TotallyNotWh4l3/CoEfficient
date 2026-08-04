// backend/services/announcementSyncService.js
//
// Lightweight Server-Sent-Events (SSE) hub so Sub-Devices get pushed
// create/edit/delete/archive/restore events instead of having to poll.

const clients = new Set();

export function subscribe(res) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.write("retry: 5000\n\n");

    clients.add(res);
    res.on("close", () => clients.delete(res));
}

/**
 * @param {'created'|'updated'|'deleted'|'archived'|'restored'} type
 * @param {object} announcement - the parsed announcement row (post-change)
 */
export function broadcast(type, announcement) {
    const payload = `event: ${type}\ndata: ${JSON.stringify(announcement)}\n\n`;
    for (const res of clients) {
        res.write(payload);
    }
}
