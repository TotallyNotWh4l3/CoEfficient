// backend/services/scheduleSyncService.js
// SSE pub/sub for real-time schedule updates — mirrors announcementSyncService.js.
// ⚠️ Placeholder shape — verify against the real announcementSyncService.js before testing.

const clients = new Set();

export function subscribe(res) {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.flushHeaders();

    clients.add(res);

    req_cleanup: {
        res.req?.on("close", () => {
            clients.delete(res);
        });
    }
}

export function broadcast(event, data) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const client of clients) {
        client.write(payload);
    }
}
