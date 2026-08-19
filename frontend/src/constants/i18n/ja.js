// ja.js

export default {
    dateNames: {
        monthsLong: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
        ],
        weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
        weekdaysLong: ["日", "月", "火", "水", "木", "金", "土"],
    },

    dashboard: {
        header: {
            title: "Co:Efficient",
            subTitle: "アップデート",
        },
    },
    settings: {
        title: "設定",
        autoSave: "自動保存済み",
        sidebar: {
            interface: "インターフェース",
            dashboard: "ダッシュボード",
            modules: "モジュール",
            about: "情報",
        },
        interface: {
            title: "インターフェース",
            description: "アプリの外観と言語の設定",
            language: {
                title: "言語",
                description: "アプリの言語選択",
                add: "場所を追加",
            },
            appearance: {
                title: "外観",
                description: "視覚的オプションとUIのスタイリング",
                current: "現在のテーマ",
                themes: {
                    title: "テーマ",
                    description: "組み込みまたはカスタムテーマ",
                    builtIn: "組み込み",
                    custom: "カスタム",
                    apply: "適用",
                    create: "作成",
                    edit: "編集",
                    delete: "削除",
                },
                customization: {
                    title: "カスタマイズ",
                    description: "カラー、タイポグラフィ、ボーダー、エフェクト",
                    colors: "カラー",
                    typography: "タイポグラフィ",
                    borders: "ボーダー",
                    effects: "エフェクト",
                },
                dialog: {
                    titleCreate: "テーマを作成",
                    titleEdit: "テーマを編集",
                    builtInNote:
                        "組み込みテーマは編集できません。カスタマイズするにはコピーを作成してください。",
                    nameLabel: "名前",
                    cancel: "キャンセル",
                    save: "保存",
                    saving: "保存中...",
                    saveFailed: "テーマの保存に失敗しました。もう一度お試しください。",
                    delete: "削除",
                    deleteFailed: "テーマの削除に失敗しました。もう一度お試しください。",
                    groups: {
                        accent: "アクセント",
                        surface: "背景とサーフェス",
                        element: "要素",
                        border: "ボーダー",
                        text: "テキスト",
                        input: "入力",
                        status: "ステータス",
                        shadows: "シャドウ",
                    },
                },
            },
            location: {
                title: "位置情報",
                description: "アプリケーションで使用する位置情報を管理します。",
                current: {
                    title: "デフォルトの位置情報",
                    description: "デフォルトとして使用する位置情報を選択してください。",
                },
                add: "位置情報を追加",
                empty: "保存された位置情報はありません。",
                dialog: {
                    titleAdd: "位置情報を追加",
                    titleEdit: "位置情報を編集",
                    mode: {
                        search: "位置情報を検索",
                        coordinates: "座標",
                    },
                    search: {
                        label: "検索",
                        description:
                            "都市や場所を検索します。結果を選択すると座標が自動入力されます。",
                        placeholder: "東京",
                        button: "検索",
                        searching: "検索中...",
                        noResults: "該当する位置情報が見つかりませんでした。",
                        failed: "検索に失敗しました。もう一度お試しください。",
                    },
                    name: {
                        label: "名前",
                        description: "任意 — 空欄の場合は座標から自動入力されます。",
                        placeholder: "座標から自動入力",
                    },
                    latitude: {
                        label: "緯度",
                        required: "緯度は必須です。",
                        invalidNumber: "緯度は数値で入力してください。",
                        outOfRange: "緯度は -90 から 90 の間で入力してください。",
                    },
                    longitude: {
                        label: "経度",
                        required: "経度は必須です。",
                        invalidNumber: "経度は数値で入力してください。",
                        outOfRange: "経度は -180 から 180 の間で入力してください。",
                    },
                    gps: {
                        button: "現在地を使用",
                        locating: "現在地を取得中...",
                    },
                    footer: {
                        cancel: "キャンセル",
                        save: "保存",
                        saving: "保存中...",
                        saveFailed: "位置情報の保存に失敗しました。もう一度お試しください。",
                    },
                },
            },
        },
        dashboard: {
            title: "ダッシュボード",
            description: "新規ダッシュボードのデフォルトレイアウト",
            layout: {
                title: "レイアウト",
                description: "余白と列の設定",
                columns: "列数",
                gap: "間隔",
                padding: "パディング",
            },
            moduleDefaults: {
                title: "モジュールのデフォルト",
                description:
                    "モジュールがダッシュボードに追加された際に適用されるデフォルト設定です。",
            },
        },
        modules: {
            title: "モジュール",
            description: "モジュールのデフォルト動作設定",
            available: "モジュールを追加",
            availableDescription: "ダッシュボードに追加するモジュールを選択します。",
            current: "現在のモジュール",
            currentDescription: "現在ダッシュボードにあるモジュール。",
            empty: "モジュールがまだ追加されていません — 上から選択して始めましょう。",
            remove: "削除",
            weather: {
                title: "天気",
            },
            schedule: {
                title: "スケジュール",
            },
            announcements: {
                title: "お知らせ",
            },
        },
        about: {
            title: "情報",
            description: "アプリの情報とクレジット",
        },
    },
    modules: {
        weather: {
            current: {
                wmoCode: "WMOコード",
                high: "最高",
                low: "最低",
                humidity: "湿度",
                wind: "風速",
                precipitation: "降水量",
                loading: "天気を読み込んでいます...",
                error: "天気を読み込めませんでした",
                noData: "天気データが受信されませんでした",
                retry: "再試行",
            },
            forecast: {
                title: "予報トレンド",
                updated: "更新:",
                hourly: "時間別",
                daily: "7日間トレンド",
                hourlyHint: "← 上の日付カードをクリックして時間を切り替えます",
                dailyHint: "7日間マルチバリエートトレンドグラフ",
                today: "今日",
                tomorrow: "明日",
                dayFallback: "{n}日目",
            },
            chart: {
                range: "範囲",
                max: "最大",
                min: "最小",
            },
            settings: {
                title: "天気カードの設定",
                back: "戻る",
                layout: {
                    title: "レイアウト表示モード",
                    combined: {
                        title: "統合ビュー",
                        description:
                            "マスターベントブロックにライブおよび完全な7日間の拡張予報の両方をレンダリングします。",
                    },
                    current: {
                        title: "現在の天気のみ",
                        description:
                            "予報テーブルなしで、極めて高密度な現在の気象状況の統計をレンダリングします。",
                    },
                    forecast: {
                        title: "予報トレンドのみ",
                        description:
                            "現在のステータスの雑音を最小限に抑え、完全な7日間の拡張予報とSVGチャートをレンダリングします。",
                    },
                },
                active: "● アクティブ",
                tip: "ヒント: メイン設定の詳細管理者コントロールを使用して、このタイルのレスポンシブな列数を切り替えます。",
            },
            header: {
                selectLocation: "場所を選択",
                moduleSettings: "モジュール設定",
                remove: "ボードから削除",
            },
        },
        schedule: {
            header: {
                title: "スケジュール",
                subtitle: "チームのイベントと重要な日付",
                addEvent: "追加",
                manageTags: "タグを管理",
                removeModule: "モジュールを削除",
            },
            viewToggle: {
                absolute: "絶対",
                relative: "相対",
            },
            layoutToggle: {
                month: "月",
                week: "週",
            },
            calendar: {
                today: "今日",
                weekOf: "週",
                conflictTitle: "タイムスロットが占有されています",
            },
            relative: {
                configureTitle: "ローリングウィンドウを設定",
                settingsTitle: "相対ビューの設定",
                daysBeforeLabel: "今日より前の日数:",
                reset: "リセット",
            },
            dayList: {
                noEvents: "予定されているイベントはありません。",
                addEvent: "イベントを追加",
            },
            detail: {
                title: "イベント詳細",
                editedBy: "追加者",
                lockNote: "作成者または上位の権限を持つユーザーのみがこのイベントを編集できます。",
                edit: "編集",
                delete: "削除",
                close: "閉じる",
                confirmDelete: "このイベントを削除しますか？",
            },
            form: {
                titleAdd: "新しいイベント",
                titleEdit: "イベントを編集",
                titleField: "タイトル *",
                titlePlaceholder: "例: チームスタンドアップ",
                subtitleField: "サブタイトル",
                subtitlePlaceholder: "任意の短いサブタイトル",
                dateField: "日付 *",
                timeField: "時間 *",
                tagsField: "タグ",
                tagPriorityHint: "最初のタグがイベントの色を決定します。",
                descriptionField: "説明",
                descriptionPlaceholder: "任意の内訳…",
                addedBy: "追加者",
                cancel: "キャンセル",
                saveChanges: "変更を保存",
                addEvent: "イベントを追加",
                delete: "削除",
                confirmDelete: "このイベントを削除しますか？",
            },
            tagManager: {
                title: "タグを管理",
                namePlaceholder: "タグ名、例: 会議",
                add: "追加",
                noTags: "タグはまだありません。",
                deleteTitle: "タグを削除",
            },
            tagPicker: {
                noTagsHint: "タグはまだありません。管理者は「タグを管理」からタグを追加できます。",
            },
            footer: {
                liveSync: "ライブ同期",
            },
            status: {
                loading: "スケジュールを読み込んでいます…",
                errorTitle: "スケジュールの読み込みに失敗しました",
                retry: "再試行",
            },
        },
    },
};
