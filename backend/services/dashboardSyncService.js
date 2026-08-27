// ===================================================
// ファイル名: dashboardSyncService.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: ダッシュボード同期サービス
// ===================================================

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
        try {
            res.write(message);
        } catch {
            bucket.delete(res);
        }
    }

    if (bucket.size === 0) clientsByUser.delete(userId);
}
