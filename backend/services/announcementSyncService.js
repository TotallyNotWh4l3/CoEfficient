// ===================================================
// ファイル名: announcementSyncService.js
// 作成日: 2026/08/27
// 作成者: ゴンザガ　ウェイン
// 概要: お知らせ同期サービス
// ===================================================

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
