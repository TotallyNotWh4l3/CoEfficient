// backend/services/themesSyncService.js
// SSE pub/sub for real-time theme updates — mirrors locationsSyncService.js.

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
        try {
            client.write(payload);
        } catch {
            clients.delete(client);
        }
    }
}
