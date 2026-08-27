// ===================================================
// ファイル名: scheduleSyncService.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: スケジュール同期サービス
// ===================================================


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
