import {
  Activity,
  AlertTriangle,
  BarChart3,
  CalendarDays,
  Database,
  FileText,
  Gauge,
  Languages,
  Radio,
  Search,
} from "lucide-react";
import Link from "next/link";
import { AssetMixChart } from "@/components/asset-mix-chart";
import { getDashboardData, latestPriceMap, type Asset, type DashboardReport } from "@/lib/market-data";

export const dynamic = "force-dynamic";

type Lang = "en" | "ko";

const copy = {
  en: {
    subtitle: "Public market intelligence",
    assets: "Assets",
    priced: "Priced",
    reports: "Reports",
    risks: "Risks",
    connected: "Supabase public read connected",
    fallback: "Using local fallback universe",
    readOnly: "Read-only dashboard. No brokerage, account, or order controls.",
    popularAssets: "Popular Assets",
    asset: "Asset",
    market: "Market",
    price: "Price",
    change: "Change",
    pending: "Pending",
    assetMix: "Asset Mix",
    researchReports: "Research Reports",
    noReports: "No published dashboard reports yet",
    noReportsDetail: "Morning briefs, weekly reviews, and public-safe research summaries will appear here.",
    fullReport: "Full report available in the dashboard archive.",
    riskNotes: "Risk Notes",
    noRisks: "No active public risk notes",
    noRisksDetail: "Macro, event, and volatility alerts will appear when Meridian publishes them.",
    dataFeeds: "Data Feeds",
    crypto: "Crypto",
    koreaStocks: "Korea stocks",
    usStocks: "US stocks",
    reportsFeed: "Reports",
    kisPrimary: "KIS primary",
    kisFinnhub: "KIS, Finnhub fallback",
    meridianTradingClaw: "Meridian / TradingClaw",
    language: "Language",
  },
  ko: {
    subtitle: "공개 시장 인텔리전스",
    assets: "자산",
    priced: "가격",
    reports: "리포트",
    risks: "리스크",
    connected: "Supabase 공개 읽기 연결됨",
    fallback: "로컬 기본 자산 사용 중",
    readOnly: "읽기 전용 대시보드. 계좌, 주문, 매매 기능 없음.",
    popularAssets: "인기 자산",
    asset: "자산",
    market: "시장",
    price: "가격",
    change: "등락",
    pending: "대기",
    assetMix: "자산 구성",
    researchReports: "리서치 리포트",
    noReports: "게시된 대시보드 리포트 없음",
    noReportsDetail: "장전 브리핑, 주간 리뷰, 공개용 리서치 요약이 여기에 표시됩니다.",
    fullReport: "전체 리포트는 대시보드 아카이브에서 확인 가능합니다.",
    riskNotes: "리스크 노트",
    noRisks: "활성 공개 리스크 노트 없음",
    noRisksDetail: "거시, 이벤트, 변동성 알림이 발행되면 여기에 표시됩니다.",
    dataFeeds: "데이터 소스",
    crypto: "코인",
    koreaStocks: "국내주식",
    usStocks: "미국주식",
    reportsFeed: "리포트",
    kisPrimary: "KIS 우선",
    kisFinnhub: "KIS, Finnhub 대체",
    meridianTradingClaw: "Meridian / TradingClaw",
    language: "언어",
  },
} satisfies Record<Lang, Record<string, string>>;

const assetTypeLabels: Record<Lang, Record<Asset["asset_type"], string>> = {
  en: {
    kr_stock: "Korea",
    us_stock: "US",
    crypto: "Crypto",
    index: "Index",
    fx: "FX",
    rate: "Rates",
    commodity: "Commodities",
  },
  ko: {
    kr_stock: "국내",
    us_stock: "미국",
    crypto: "코인",
    index: "지수",
    fx: "환율",
    rate: "금리",
    commodity: "원자재",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang: Lang = params?.lang === "ko" ? "ko" : "en";
  const t = copy[lang];
  const labels = assetTypeLabels[lang];
  const { assets, prices, reports, risks, connected } = await getDashboardData();
  const priceBySymbol = latestPriceMap(prices);
  const mix = Object.entries(
    assets.reduce<Record<string, number>>((acc, asset) => {
      acc[labels[asset.asset_type]] = (acc[labels[asset.asset_type]] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const pricedCount = assets.filter((asset) => priceBySymbol.has(asset.symbol)).length;
  const reportGroups = groupReportsByDate(reports, lang);

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                <Radio className="h-4 w-4 text-blue-600" />
                MarketLens Dashboard
              </div>
              <h1 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">
                {t.subtitle}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Metric label={t.assets} value={assets.length.toString()} />
              <Metric label={t.priced} value={pricedCount.toString()} />
              <Metric label={t.reports} value={reports.length.toString()} />
              <Metric label={t.risks} value={risks.length.toString()} />
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm text-zinc-600 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-emerald-600" />
                <span>{connected ? t.connected : t.fallback}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-amber-600" />
                <span>{t.readOnly}</span>
              </div>
            </div>
            <LanguageSwitch lang={lang} label={t.language} />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
            <Panel title={t.popularAssets} icon={<BarChart3 className="h-4 w-4" />}>
              <div className="overflow-hidden rounded-md border border-zinc-200">
                <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr] bg-zinc-100 px-3 py-2 text-xs font-semibold uppercase text-zinc-500">
                  <span>{t.asset}</span>
                  <span>{t.market}</span>
                  <span>{t.price}</span>
                  <span>{t.change}</span>
                </div>
                <div className="divide-y divide-zinc-200 bg-white">
                  {assets.map((asset) => {
                    const price = priceBySymbol.get(asset.symbol);
                    return (
                      <div
                        key={asset.symbol}
                        className="grid min-h-14 grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr] items-center px-3 py-2 text-sm"
                      >
                        <div className="min-w-0">
                          <div className="truncate font-medium text-zinc-950">{asset.display_symbol}</div>
                          <div className="truncate text-xs text-zinc-500">{asset.name}</div>
                        </div>
                        <div>
                          <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
                            {labels[asset.asset_type]}
                          </span>
                        </div>
                        <div className="font-mono text-sm">
                          {price?.price == null ? t.pending : formatPrice(price.price, price.currency)}
                        </div>
                        <Change value={price?.change_percent ?? null} pending={t.pending} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>

            <Panel title={t.assetMix} icon={<Activity className="h-4 w-4" />}>
              <AssetMixChart data={mix} />
              <div className="grid grid-cols-2 gap-2">
                {mix.map((slice) => (
                  <div key={slice.name} className="rounded-md border border-zinc-200 bg-white px-3 py-2">
                    <div className="text-xs text-zinc-500">{slice.name}</div>
                    <div className="text-lg font-semibold">{slice.value}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <Panel title={t.researchReports} icon={<FileText className="h-4 w-4" />}>
            {reportGroups.length ? (
              <div className="space-y-4">
                {reportGroups.map((group) => (
                  <section key={group.key}>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700">
                      <CalendarDays className="h-4 w-4 text-blue-600" />
                      {group.label}
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {group.reports.map((report) => (
                        <article key={report.id} className="rounded-md border border-zinc-200 bg-white p-4">
                          <div className="text-xs font-medium uppercase text-blue-700">{report.report_type}</div>
                          <h2 className="mt-1 text-base font-semibold text-zinc-950">{report.title}</h2>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">
                            {report.summary ?? t.fullReport}
                          </p>
                          <time className="mt-3 block text-xs text-zinc-500">
                            {formatDateTime(report.published_at, lang)}
                          </time>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <EmptyState icon={<Search className="h-5 w-5" />} title={t.noReports} detail={t.noReportsDetail} />
            )}
          </Panel>
        </section>

        <aside className="space-y-4">
          <Panel title={t.riskNotes} icon={<AlertTriangle className="h-4 w-4" />}>
            {risks.length ? (
              <div className="space-y-3">
                {risks.map((risk) => (
                  <div key={risk.id} className="rounded-md border border-zinc-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className={severityClass(risk.severity)}>{risk.severity}</span>
                      <time className="text-xs text-zinc-500">{formatDateTime(risk.starts_at, lang)}</time>
                    </div>
                    <div className="mt-2 font-medium text-zinc-950">{risk.title}</div>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{risk.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={<AlertTriangle className="h-5 w-5" />} title={t.noRisks} detail={t.noRisksDetail} />
            )}
          </Panel>

          <Panel title={t.dataFeeds} icon={<Database className="h-4 w-4" />}>
            <div className="space-y-2 text-sm">
              <FeedRow label={t.crypto} value="Upbit" />
              <FeedRow label={t.koreaStocks} value={t.kisPrimary} />
              <FeedRow label={t.usStocks} value={t.kisFinnhub} />
              <FeedRow label={t.reportsFeed} value={t.meridianTradingClaw} />
            </div>
          </Panel>
        </aside>
      </div>
    </main>
  );
}

function LanguageSwitch({ lang, label }: { lang: Lang; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-zinc-500" />
      <span className="text-xs font-medium text-zinc-500">{label}</span>
      <div className="flex overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
        <Link className={lang === "en" ? activeToggleClass : toggleClass} href="/?lang=en">
          EN
        </Link>
        <Link className={lang === "ko" ? activeToggleClass : toggleClass} href="/?lang=ko">
          KO
        </Link>
      </div>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-800">
        <span className="text-zinc-500">{icon}</span>
        {title}
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="font-mono text-lg font-semibold text-zinc-950">{value}</div>
    </div>
  );
}

function FeedRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-100 py-2 last:border-b-0">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right font-medium text-zinc-900">{value}</span>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center rounded-md border border-dashed border-zinc-300 bg-zinc-50 p-5 text-center">
      <div className="text-zinc-400">{icon}</div>
      <div className="mt-2 text-sm font-medium text-zinc-800">{title}</div>
      <div className="mt-1 max-w-sm text-sm leading-6 text-zinc-500">{detail}</div>
    </div>
  );
}

function Change({ value, pending }: { value: number | null; pending: string }) {
  if (value == null) {
    return <span className="text-sm text-zinc-400">{pending}</span>;
  }
  const positive = value >= 0;
  return (
    <span className={positive ? "font-mono text-sm text-emerald-700" : "font-mono text-sm text-red-700"}>
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

function groupReportsByDate(reports: DashboardReport[], lang: Lang) {
  const groups = new Map<string, DashboardReport[]>();
  for (const report of reports) {
    const key = report.published_at.slice(0, 10);
    groups.set(key, [...(groups.get(key) ?? []), report]);
  }
  return [...groups.entries()].map(([key, groupReports]) => ({
    key,
    label: new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(`${key}T00:00:00Z`)),
    reports: groupReports,
  }));
}

function formatPrice(value: number, currency: string | null) {
  const digits = currency === "KRW" ? 0 : 2;
  return `${currency ?? ""} ${value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}`.trim();
}

function formatDateTime(value: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function severityClass(severity: "low" | "medium" | "high") {
  const base = "rounded px-2 py-1 text-xs font-semibold uppercase";
  if (severity === "high") return `${base} bg-red-100 text-red-700`;
  if (severity === "medium") return `${base} bg-amber-100 text-amber-700`;
  return `${base} bg-emerald-100 text-emerald-700`;
}

const toggleClass = "px-3 py-1.5 text-xs font-semibold text-zinc-600";
const activeToggleClass = "bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white";
