// backend/services/locationSyncService.js
// SSE pub/sub for real-time location updates — mirrors scheduleSyncService.js.

const clients = new Set();

export function subscribe(res) {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.flushHeaders();

    clients.add(res);

    res.req?.on("close", () => {
        clients.delete(res);
    });
}

export function broadcast(event, data) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const client of clients) {
        client.write(payload);
    }
}
