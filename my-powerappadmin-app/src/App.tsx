import { useCallback, useMemo, useState } from "react";
import "./App.css";

import { PowerAppsforAdminsService } from
  "./generated/services/PowerAppsforAdminsService";

import type {
  PowerApp,
  ResourceArray_PowerApp,
} from "./generated/models/PowerAppsforAdminsModel";

type SortOption =
  | "lastModifiedDesc"
  | "lastModifiedAsc"
  | "displayNameAsc"
  | "createdDesc";

type OperationResult = {
  data?: ResourceArray_PowerApp;
  value?: PowerApp[];
  success?: boolean;
  error?: unknown;
};

const DEFAULT_ENVIRONMENT_ID =
  import.meta.env.VITE_POWER_PLATFORM_ENVIRONMENT_ID ?? "";

function extractApps(result: unknown): PowerApp[] {
  if (!result || typeof result !== "object") {
    return [];
  }

  const operationResult = result as OperationResult;

  if (Array.isArray(operationResult.data?.value)) {
    return operationResult.data.value;
  }

  if (Array.isArray(operationResult.value)) {
    return operationResult.value;
  }

  return [];
}

function formatDateTime(value?: string): string {
  if (!value) {
    return "未設定";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getDaysSince(value?: string): number | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const difference = Date.now() - date.getTime();

  return Math.max(
    0,
    Math.floor(difference / (1000 * 60 * 60 * 24)),
  );
}

function getAppDisplayName(app: PowerApp): string {
  return app.properties?.displayName?.trim() || app.name || "名称未設定";
}

function getOwnerName(app: PowerApp): string {
  return (
    app.properties?.owner?.displayName ||
    app.properties?.owner?.email ||
    "所有者未設定"
  );
}

function getCreatorName(app: PowerApp): string {
  return (
    app.properties?.createdBy?.displayName ||
    app.properties?.createdBy?.email ||
    "作成者未設定"
  );
}

function getInitials(value?: string): string {
  const text = value?.trim();

  if (!text) {
    return "PA";
  }

  const words = text.split(/[\s　]+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return text.slice(0, 2).toUpperCase();
}

function getAppKey(app: PowerApp, index: number): string {
  return app.id || app.name || `powerapp-${index}`;
}

function getModifiedLabel(value?: string): string {
  const days = getDaysSince(value);

  if (days === null) {
    return "更新日不明";
  }

  if (days === 0) {
    return "本日更新";
  }

  if (days === 1) {
    return "1日前に更新";
  }

  return `${days}日前に更新`;
}

function App() {
  const [environmentId, setEnvironmentId] = useState(
    DEFAULT_ENVIRONMENT_ID,
  );
  const [loadedEnvironmentId, setLoadedEnvironmentId] = useState("");

  const [apps, setApps] = useState<PowerApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<PowerApp | null>(null);

  const [searchText, setSearchText] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");
  const [sortOption, setSortOption] =
    useState<SortOption>("lastModifiedDesc");

  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [lastRetrievedAt, setLastRetrievedAt] =
    useState<Date | null>(null);

  const loadApps = useCallback(async () => {
    const normalizedEnvironmentId = environmentId.trim();

    if (!normalizedEnvironmentId) {
      setErrorMessage("Power Platform の環境IDを入力してください。");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setCopyMessage("");

    try {
      const result =
        await PowerAppsforAdminsService.Get_AdminApps(
          normalizedEnvironmentId,
          undefined,
          250,
          undefined,
        );

      console.log("Power Apps for Admins result:", result);

      const loadedApps = extractApps(result);

      setApps(loadedApps);
      setLoadedEnvironmentId(normalizedEnvironmentId);
      setLastRetrievedAt(new Date());
      setHasLoaded(true);

      setSelectedApp((currentApp) => {
        if (loadedApps.length === 0) {
          return null;
        }

        if (!currentApp?.id) {
          return loadedApps[0];
        }

        return (
          loadedApps.find((app) => app.id === currentApp.id) ||
          loadedApps[0]
        );
      });
    } catch (error) {
      console.error("Power Apps の取得に失敗しました。", error);

      const message =
        error instanceof Error
          ? error.message
          : "Power Apps for Admins コネクターからデータを取得できませんでした。";

      setErrorMessage(message);
      setApps([]);
      setSelectedApp(null);
      setHasLoaded(true);
    } finally {
      setIsLoading(false);
    }
  }, [environmentId]);

  const owners = useMemo(() => {
    const uniqueOwners = new Set(
      apps
        .map((app) => getOwnerName(app))
        .filter((owner) => owner !== "所有者未設定"),
    );

    return Array.from(uniqueOwners).sort((a, b) =>
      a.localeCompare(b, "ja"),
    );
  }, [apps]);

  const summary = useMemo(() => {
    const ownerIds = new Set<string>();
    let sharedApps = 0;
    let customConnectorApps = 0;

    apps.forEach((app) => {
      const owner =
        app.properties?.owner?.id ||
        app.properties?.owner?.email ||
        app.properties?.owner?.displayName;

      if (owner) {
        ownerIds.add(owner);
      }

      const sharedCount =
        (app.properties?.sharedUsersCount ?? 0) +
        (app.properties?.sharedGroupsCount ?? 0);

      if (sharedCount > 0) {
        sharedApps += 1;
      }

      const usesCustomConnector =
        app.properties?.connectionReferences?.some(
          (connection) => connection.isCustomApiConnection === true,
        );

      if (usesCustomConnector) {
        customConnectorApps += 1;
      }
    });

    return {
      totalApps: apps.length,
      ownerCount: ownerIds.size,
      sharedApps,
      customConnectorApps,
    };
  }, [apps]);

  const filteredApps = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    const result = apps.filter((app) => {
      const searchableText = [
        getAppDisplayName(app),
        app.properties?.description,
        getOwnerName(app),
        getCreatorName(app),
        app.id,
        app.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !keyword || searchableText.includes(keyword);

      const matchesOwner =
        ownerFilter === "all" ||
        getOwnerName(app) === ownerFilter;

      return matchesSearch && matchesOwner;
    });

    return [...result].sort((a, b) => {
      switch (sortOption) {
        case "displayNameAsc":
          return getAppDisplayName(a).localeCompare(
            getAppDisplayName(b),
            "ja",
          );

        case "lastModifiedAsc":
          return (
            new Date(
              a.properties?.lastModifiedTime ?? 0,
            ).getTime() -
            new Date(
              b.properties?.lastModifiedTime ?? 0,
            ).getTime()
          );

        case "createdDesc":
          return (
            new Date(
              b.properties?.createdTime ?? 0,
            ).getTime() -
            new Date(
              a.properties?.createdTime ?? 0,
            ).getTime()
          );

        case "lastModifiedDesc":
        default:
          return (
            new Date(
              b.properties?.lastModifiedTime ?? 0,
            ).getTime() -
            new Date(
              a.properties?.lastModifiedTime ?? 0,
            ).getTime()
          );
      }
    });
  }, [apps, ownerFilter, searchText, sortOption]);

  const selectedConnections =
    selectedApp?.properties?.connectionReferences ?? [];

  const selectedSharedTotal =
    (selectedApp?.properties?.sharedUsersCount ?? 0) +
    (selectedApp?.properties?.sharedGroupsCount ?? 0);

  async function copyAppId() {
    const appId = selectedApp?.id || selectedApp?.name;

    if (!appId) {
      return;
    }

    try {
      await navigator.clipboard.writeText(appId);
      setCopyMessage("アプリIDをコピーしました。");
    } catch {
      setCopyMessage("アプリIDをコピーできませんでした。");
    }
  }

  function openSelectedApp() {
    const appUrl =
      selectedApp?.properties?.appOpenUri ||
      selectedApp?.properties?.appOpenProtocolUri;

    if (appUrl) {
      window.open(appUrl, "_blank", "noopener,noreferrer");
    }
  }

  function clearFilters() {
    setSearchText("");
    setOwnerFilter("all");
    setSortOption("lastModifiedDesc");
  }

  return (
    <div className="page-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="brand-group">
            <div className="brand-icon" aria-hidden="true">
              PA
            </div>

            <div>
              <p className="eyebrow eyebrow--light">
                POWER APPS FOR ADMINS
              </p>
              <h1>Power Apps 管理アプリ</h1>
              <p className="header-description">
                環境内のアプリ、所有者、共有状況、接続情報を確認します
              </p>
            </div>
          </div>

          <div className="header-status">
            <span>最終取得</span>
            <strong>
              {lastRetrievedAt
                ? formatDateTime(lastRetrievedAt.toISOString())
                : "未取得"}
            </strong>
          </div>
        </header>

        <main className="app-main">
          <section className="environment-panel">
            <div className="environment-field">
              <label htmlFor="environment-id">
                Power Platform 環境ID
              </label>

              <div className="environment-input-row">
                <input
                  id="environment-id"
                  type="text"
                  value={environmentId}
                  onChange={(event) =>
                    setEnvironmentId(event.target.value)
                  }
                  placeholder="例: 00000000-0000-0000-0000-000000000000"
                />

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => void loadApps()}
                  disabled={isLoading}
                >
                  <span
                    className={
                      isLoading
                        ? "refresh-symbol rotating"
                        : "refresh-symbol"
                    }
                    aria-hidden="true"
                  >
                    ↻
                  </span>
                  {isLoading ? "取得中" : "アプリを取得"}
                </button>
              </div>
            </div>

            {loadedEnvironmentId && (
              <div className="loaded-environment">
                <span className="status-dot" />
                <div>
                  <small>取得中の環境</small>
                  <strong>{loadedEnvironmentId}</strong>
                </div>
              </div>
            )}
          </section>

          {errorMessage && (
            <section className="message-panel message-panel--error">
              <div>
                <strong>データを取得できませんでした</strong>
                <p>{errorMessage}</p>
              </div>
            </section>
          )}

          <section className="summary-grid">
            <article className="summary-card summary-card--blue">
              <span className="summary-icon">A</span>
              <div>
                <small>登録アプリ</small>
                <strong>{summary.totalApps}</strong>
                <span>環境内のアプリ数</span>
              </div>
            </article>

            <article className="summary-card">
              <span className="summary-icon summary-icon--soft">O</span>
              <div>
                <small>所有者</small>
                <strong>{summary.ownerCount}</strong>
                <span>一意の所有者数</span>
              </div>
            </article>

            <article className="summary-card">
              <span className="summary-icon summary-icon--soft">S</span>
              <div>
                <small>共有アプリ</small>
                <strong>{summary.sharedApps}</strong>
                <span>共有設定があるアプリ</span>
              </div>
            </article>

            <article className="summary-card">
              <span className="summary-icon summary-icon--soft">C</span>
              <div>
                <small>カスタム接続</small>
                <strong>{summary.customConnectorApps}</strong>
                <span>カスタムコネクター利用</span>
              </div>
            </article>
          </section>

          <section className="filter-panel">
            <div className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
                placeholder="アプリ名、所有者、作成者を検索"
              />
            </div>

            <label className="select-field">
              <span>所有者</span>
              <select
                value={ownerFilter}
                onChange={(event) =>
                  setOwnerFilter(event.target.value)
                }
              >
                <option value="all">すべての所有者</option>
                {owners.map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-field">
              <span>並び順</span>
              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value as SortOption)
                }
              >
                <option value="lastModifiedDesc">
                  更新日の新しい順
                </option>
                <option value="lastModifiedAsc">
                  更新日の古い順
                </option>
                <option value="createdDesc">
                  作成日の新しい順
                </option>
                <option value="displayNameAsc">
                  アプリ名順
                </option>
              </select>
            </label>

            <button
              type="button"
              className="text-button"
              onClick={clearFilters}
            >
              条件をクリア
            </button>
          </section>

          <section className="content-grid">
            <div className="app-list-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">APPLICATION INVENTORY</p>
                  <h2>アプリ一覧</h2>
                </div>

                <span className="count-badge">
                  {filteredApps.length} 件
                </span>
              </div>

              {isLoading && apps.length === 0 ? (
                <div className="empty-state">
                  <div className="loading-spinner" />
                  <h3>アプリを取得しています</h3>
                  <p>Power Apps for Admins に接続しています。</p>
                </div>
              ) : !hasLoaded ? (
                <div className="empty-state">
                  <div className="empty-icon">PA</div>
                  <h3>環境IDを指定してください</h3>
                  <p>
                    対象環境のIDを入力して「アプリを取得」を選択します。
                  </p>
                </div>
              ) : filteredApps.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">0</div>
                  <h3>表示できるアプリがありません</h3>
                  <p>
                    検索条件、環境ID、接続アカウントの管理権限を確認してください。
                  </p>
                </div>
              ) : (
                <div className="app-list">
                  {filteredApps.map((app, index) => {
                    const selected =
                      selectedApp?.id === app.id && Boolean(app.id);

                    const sharedTotal =
                      (app.properties?.sharedUsersCount ?? 0) +
                      (app.properties?.sharedGroupsCount ?? 0);

                    return (
                      <button
                        type="button"
                        key={getAppKey(app, index)}
                        className={`app-row ${
                          selected ? "app-row--selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedApp(app);
                          setCopyMessage("");
                        }}
                      >
                        <div className="app-avatar">
                          {getInitials(getAppDisplayName(app))}
                        </div>

                        <div className="app-row__content">
                          <div className="app-row__heading">
                            <h3>{getAppDisplayName(app)}</h3>

                            {app.properties?.isFeaturedApp && (
                              <span className="featured-badge">
                                注目
                              </span>
                            )}
                          </div>

                          <p>
                            所有者: {getOwnerName(app)}
                          </p>

                          <div className="app-row__metadata">
                            <span>
                              {getModifiedLabel(
                                app.properties?.lastModifiedTime,
                              )}
                            </span>
                            <span>共有: {sharedTotal}</span>
                            <span>
                              接続:{" "}
                              {app.properties?.connectionReferences
                                ?.length ?? 0}
                            </span>
                          </div>
                        </div>

                        <span className="row-arrow">›</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <aside className="detail-panel">
              {selectedApp ? (
                <>
                  <div className="detail-hero">
                    <div className="detail-hero__circle" />

                    <div className="detail-avatar">
                      {getInitials(getAppDisplayName(selectedApp))}
                    </div>

                    <p className="eyebrow eyebrow--light">
                      POWER APP DETAIL
                    </p>

                    <h2>{getAppDisplayName(selectedApp)}</h2>

                    <span className="detail-owner">
                      {getOwnerName(selectedApp)}
                    </span>
                  </div>

                  <div className="detail-body">
                    <section className="detail-section">
                      <h3>基本情報</h3>

                      <dl className="detail-list">
                        <div>
                          <dt>所有者</dt>
                          <dd>{getOwnerName(selectedApp)}</dd>
                        </div>

                        <div>
                          <dt>作成者</dt>
                          <dd>{getCreatorName(selectedApp)}</dd>
                        </div>

                        <div>
                          <dt>作成日時</dt>
                          <dd>
                            {formatDateTime(
                              selectedApp.properties?.createdTime,
                            )}
                          </dd>
                        </div>

                        <div>
                          <dt>最終更新日時</dt>
                          <dd>
                            {formatDateTime(
                              selectedApp.properties
                                ?.lastModifiedTime,
                            )}
                          </dd>
                        </div>

                        <div>
                          <dt>アプリバージョン</dt>
                          <dd>
                            {selectedApp.properties?.appVersion ||
                              "未設定"}
                          </dd>
                        </div>

                        <div>
                          <dt>環境</dt>
                          <dd>
                            {selectedApp.properties?.environment
                              ?.name ||
                              selectedApp.properties?.environment
                                ?.id ||
                              loadedEnvironmentId ||
                              "未設定"}
                          </dd>
                        </div>

                        <div>
                          <dt>アプリID</dt>
                          <dd className="technical-value">
                            {selectedApp.id ||
                              selectedApp.name ||
                              "未設定"}
                          </dd>
                        </div>
                      </dl>
                    </section>

                    <section className="sharing-grid">
                      <article>
                        <span>共有ユーザー</span>
                        <strong>
                          {selectedApp.properties
                            ?.sharedUsersCount ?? 0}
                        </strong>
                      </article>

                      <article>
                        <span>共有グループ</span>
                        <strong>
                          {selectedApp.properties
                            ?.sharedGroupsCount ?? 0}
                        </strong>
                      </article>

                      <article>
                        <span>共有合計</span>
                        <strong>{selectedSharedTotal}</strong>
                      </article>
                    </section>

                    <section className="detail-section">
                      <h3>接続参照</h3>

                      {selectedConnections.length === 0 ? (
                        <p className="muted-message">
                          接続参照は取得されていません。
                        </p>
                      ) : (
                        <div className="connection-list">
                          {selectedConnections.map(
                            (connection, index) => (
                              <article
                                key={
                                  connection.id ||
                                  `connection-${index}`
                                }
                                className="connection-card"
                              >
                                <div>
                                  <strong>
                                    {connection.displayName ||
                                      connection.id ||
                                      "名称未設定"}
                                  </strong>

                                  <span>
                                    {connection.apiTier ||
                                      "区分未設定"}
                                  </span>
                                </div>

                                <div className="connection-tags">
                                  {connection.isCustomApiConnection && (
                                    <span>カスタム</span>
                                  )}
                                  {connection.isOnPremiseConnection && (
                                    <span>オンプレミス</span>
                                  )}
                                </div>
                              </article>
                            ),
                          )}
                        </div>
                      )}
                    </section>

                    {selectedApp.properties?.description && (
                      <section className="detail-section">
                        <h3>説明</h3>
                        <p className="description-text">
                          {selectedApp.properties.description}
                        </p>
                      </section>
                    )}

                    <section className="detail-actions">
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => void copyAppId()}
                      >
                        アプリIDをコピー
                      </button>

                      <button
                        type="button"
                        className="primary-button"
                        onClick={openSelectedApp}
                        disabled={
                          !selectedApp.properties?.appOpenUri &&
                          !selectedApp.properties
                            ?.appOpenProtocolUri
                        }
                      >
                        アプリを開く
                      </button>
                    </section>

                    {copyMessage && (
                      <p className="copy-message" role="status">
                        {copyMessage}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="empty-state empty-state--detail">
                  <div className="empty-icon">i</div>
                  <h3>アプリを選択してください</h3>
                  <p>
                    左側の一覧からアプリを選択すると詳細を表示します。
                  </p>
                </div>
              )}
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;