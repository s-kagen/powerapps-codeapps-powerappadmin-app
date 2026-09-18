# Power Apps 管理アプリ (PowerApps Admin Dashboard)

Power Apps Code Apps と **Power Apps for Admin** コネクターを利用して開発した、Power Platform 環境内のアプリ資産を確認するための管理者向けダッシュボードアプリです。

Power Platform 環境に登録されている Power Apps の一覧を取得し、所有者・作成者・共有状況・接続参照（コネクター利用状況）を横断的に確認できます。

---

## 📖 概要

| 項目 | 内容 |
|---|---|
| アプリ名 | Power Apps 管理アプリ |
| 開発フレームワーク | Power Apps Code Apps |
| 利用コネクター | Power Apps for Admin |
| フロントエンド | React + TypeScript (Vite) |
| 開発環境 | GitHub Codespaces |
| 用途 | Power Platform 環境内のアプリ棚卸し・ガバナンス確認 |

Power Apps for Admin コネクターは、通常のキャンバスアプリではあまり利用されない管理者向けコネクターです。本アプリでは、その中でも読み取り系の操作を中心に利用し、環境管理者やCoE運用担当者が業務で使える形にまとめています。

---

## ✨ 主な機能

- 🔍 **環境ID指定によるアプリ一覧取得**
  対象の Power Platform 環境IDを指定し、その環境に登録されている Power Apps を取得します。

- 🔎 **検索・絞り込み**
  アプリ名、所有者、作成者によるキーワード検索、所有者別フィルターに対応しています。

- ↕️ **並び替え**
  更新日時順、作成日時順、アプリ名順での並び替えに対応しています。

- 📊 **サマリー表示**
  環境内のアプリ総数、所有者数、共有設定のあるアプリ数、カスタムコネクターを利用しているアプリ数を集計表示します。

- 📋 **アプリ詳細確認**
  選択したアプリの所有者・作成者・作成日時・最終更新日時・バージョン・共有ユーザー数・共有グループ数・接続参照（利用コネクター一覧）を確認できます。

- 🔗 **アプリを開く / IDコピー**
  一覧からアプリを直接開いたり、アプリIDをクリップボードにコピーしたりできます。

> ⚠️ 本バージョンは読み取り専用です。アプリの削除・所有者変更・隔離状態の変更などの操作は実装していません。

---

## 🖼 画面構成

```text
┌─────────────────────────────────────────────┐
│  ヘッダー（環境接続状態 / 最終取得日時）       │
├─────────────────────────────────────────────┤
│  環境ID入力欄 ・ 取得ボタン                   │
├─────────────────────────────────────────────┤
│  サマリーカード（アプリ数・所有者数・共有数等） │
├─────────────────────────────────────────────┤
│  検索 / 所有者フィルター / 並び替え            │
├───────────────────┬─────────────────────────┤
│  アプリ一覧        │  選択アプリの詳細情報     │
│ (検索・スクロール) │ (所有者・共有・接続参照等) │
└───────────────────┴─────────────────────────┘
```

---

## 🛠 利用技術

- [Power Apps Code Apps](https://learn.microsoft.com/power-apps/developer/code-apps/overview)
- Power Apps for Admin コネクター
- React 18 / TypeScript
- Vite
- GitHub Codespaces

---

## 🔌 利用しているコネクター操作

生成されたサービス (`PowerAppsforAdminsService.ts`) のうち、本アプリで利用している操作は以下の通りです。

| 操作名 | 内容 |
|---|---|
| `Get_AdminApps` | 指定した環境に含まれる Power Apps の一覧を取得します |

サービスには他にも以下の管理操作が生成されていますが、誤操作防止のため本アプリでは未使用としています。

- `Get_AdminApp` / `Remove_AdminApp`
- `Set_AdminAppOwner` / `Set_AppQuarantineState`
- `Get_AdminAppRoleAssignment` / `Edit_AdminAppRoleAssignment`
- `Get_AdminConnections` / `Remove_AdminConnection`
- `Get_AdminConnectors` / `Edit_AdminConnectorRoleAssignment`

---

## 🚀 セットアップ手順（GitHub Codespaces）

### 1. リポジトリを Codespaces で開く

GitHub リポジトリの `Code` メニューから Codespaces を起動します。

### 2. Power Apps Code Apps プロジェクトの初期化

```bash
pac code init
```

### 3. パッケージのインストール

```bash
npm install
```

### 4. Power Apps for Admin コネクターの追加

Power Apps Code Apps の管理画面（VS Code拡張機能）から、`Power Apps for Admin` コネクターを追加し、接続を作成します。

接続が完了すると `power.config.json` に `connectionReferences` として登録されます。

### 5. サービス・モデルの生成

Code Apps の拡張機能から Service / Model の生成を実行します。生成後、以下のファイルが作成されます。

```text
src/generated/
 ├─ models/
 │   └─ PowerAppsforAdminsModel.ts
 └─ services/
     └─ PowerAppsforAdminsService.ts
```

### 6. 環境変数の設定（任意）

対象の Power Platform 環境IDを毎回入力せずに利用したい場合は、プロジェクトルートに `.env.local` を作成します。

```env
VITE_POWER_PLATFORM_ENVIRONMENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

> `.env.local` は `.gitignore` に追加し、リポジトリにコミットしないことを推奨します。

### 7. ビルド

```bash
npm run build
```

### 8. ローカル起動

```bash
npm run dev
```

ブラウザで表示されたURL（例: `http://localhost:3000`）にアクセスし、環境IDを入力して「アプリを取得」を選択します。

---

## 📂 主要ファイル構成

```text
.
├─ src/
│  ├─ generated/
│  │  ├─ models/
│  │  │  └─ PowerAppsforAdminsModel.ts   # 自動生成モデル（編集不可）
│  │  └─ services/
│  │     └─ PowerAppsforAdminsService.ts # 自動生成サービス（編集不可）
│  ├─ App.tsx                            # メイン画面ロジック
│  ├─ App.css                            # スタイル定義（青ベースのデザイン）
│  └─ index.css                          # ルート要素の基本スタイル
├─ power.config.json                     # Power Apps Code Apps 接続設定
└─ README.md
```

---

## ⚠️ 既知の注意点

- `Get_AdminApps` のレスポンスには `nextLink` が含まれており、環境内のアプリ数が多い場合、1回の取得では全件を取得できない可能性があります。現状は `$top` に `250` を指定して取得しています。
- 接続アカウントに、対象環境の管理者権限（環境管理者 または Power Platform 管理者）がない場合、一覧が空になる、またはエラーになることがあります。
- 生成された `App.tsx` 内の `console.log` は、取得結果の構造確認用です。動作確認後は削除しても問題ありません。

---

## 📝 ライセンス・利用について

本プロジェクトは学習・検証目的のサンプルです。管理者権限を伴うコネクターを利用しているため、本番の Power Platform 環境で利用する場合は、対象環境と実行アカウントの権限範囲を十分に確認した上でご利用ください。
