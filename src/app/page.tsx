import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  Database,
  FileText,
  Gauge,
  Bot,
  LineChart,
  Search,
  Signal,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getDashboardData, latestPriceMap, type Asset, type DashboardReport } from "@/lib/market-data";

export const dynamic = "force-dynamic";

type Lang = "en" | "ko";

const copy = {
  en: {
    subtitle: "Market Intelligence",
    reports: "Reports",
    risks: "Risks",
    connected: "Live data layer connected",
    fallback: "Reference asset universe loaded",
    readOnly: "Public information dashboard for market monitoring.",
    popularAssets: "Popular Assets",
    asset: "Asset",
    market: "Market",
    price: "Price",
    change: "Change",
    pending: "Pending",
    researchReports: "Research Reports",
    noReports: "No published dashboard reports yet",
    noReportsDetail: "Market briefs, weekly reviews, and research summaries will appear here.",
    fullReport: "Full report available in the dashboard archive.",
    riskNotes: "Risk Notes",
    noRisks: "No active public risk notes",
    noRisksDetail: "Macro, event, and volatility alerts will appear when published.",
    dataFeeds: "Data Feeds",
    crypto: "Crypto",
    koreaStocks: "Korea stocks",
    usStocks: "US stocks",
    reportsFeed: "Reports",
    kisPrimary: "KIS primary",
    kisFinnhub: "KIS, Finnhub fallback",
    reportsProvider: "MarketLens Research",
    language: "Language",
    marketThemes: "Core Themes",
    physicalAi: "Physical AI",
    physicalAiDesc: "Robotics, humanoids, automation, and listed market proxies.",
    aiWorkspace: "AI Research Terminal",
    stockPicker: "Idea Queue",
    signalStack: "Signal Stack",
    smartMoney: "Smart Money Watch",
    marketBrief: "Market Brief",
  },
  ko: {
    subtitle: "마켓 인텔리전스",
    reports: "리포트",
    risks: "리스크",
    connected: "실시간 데이터 레이어 연결됨",
    fallback: "기본 자산 유니버스 로드됨",
    readOnly: "시장 모니터링용 공개 정보 대시보드.",
    popularAssets: "인기 자산",
    asset: "자산",
    market: "시장",
    price: "가격",
    change: "등락",
    pending: "대기",
    researchReports: "리서치 리포트",
    noReports: "게시된 대시보드 리포트 없음",
    noReportsDetail: "시장 브리핑, 주간 리뷰, 리서치 요약이 여기에 표시됩니다.",
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
    reportsProvider: "MarketLens Research",
    language: "언어",
    marketThemes: "핵심 테마",
    physicalAi: "피지컬 AI",
    physicalAiDesc: "로봇·휴머노이드·자동화 테마.",
    aiWorkspace: "AI 리서치 터미널",
    stockPicker: "아이디어 큐",
    signalStack: "시그널 스택",
    smartMoney: "스마트머니 관찰",
    marketBrief: "마켓 브리프",
  },
} satisfies Record<Lang, Record<string, string>>;

const aiModules = {
  en: [
    {
      title: "Ask Meridian",
      body: "Plain-language research prompts for stocks, sectors, themes, and portfolio questions.",
      status: "Ready",
    },
    {
      title: "AI Stock Picker",
      body: "Ranked idea queue using price action, fundamentals, news, and theme exposure.",
      status: "Live shell",
    },
    {
      title: "Smart Signals",
      body: "Momentum, valuation, event, and risk flags collected into one signal stack.",
      status: "Building",
    },
    {
      title: "Smart Money",
      body: "Insider, institutional, congress, and whale-flow tracking slot. Data source pending.",
      status: "Next",
    },
  ],
  ko: [
    {
      title: "Ask Meridian",
      body: "종목·섹터·테마 질문용 리서치 창.",
      status: "준비",
    },
    {
      title: "AI Stock Picker",
      body: "가격, 실적, 뉴스, 테마 노출 기반 아이디어 큐.",
      status: "셸 적용",
    },
    {
      title: "Smart Signals",
      body: "모멘텀, 밸류, 이벤트, 리스크 플래그 묶음.",
      status: "구축 중",
    },
    {
      title: "Smart Money",
      body: "내부자, 기관, 의회, 큰손 흐름 추적 슬롯.",
      status: "다음",
    },
  ],
} satisfies Record<Lang, Array<{ title: string; body: string; status: string }>>;

const ideaQueue = {
  en: [
    { name: "NVIDIA", ticker: "NVDA", score: "88", tag: "AI platform", note: "Quality leader. Valuation still the check." },
    { name: "Hyundai Motor", ticker: "005380.KS", score: "81", tag: "Boston Dynamics", note: "Direct proxy. Auto cycle noise." },
    { name: "Teradyne", ticker: "TER", score: "76", tag: "Automation picks", note: "Strong move. Watch momentum break." },
    { name: "Doosan Robotics", ticker: "454910.KS", score: "62", tag: "High beta", note: "Theme clean. Profitability weak." },
  ],
  ko: [
    { name: "엔비디아", ticker: "NVDA", score: "88", tag: "AI 플랫폼", note: "퀄리티 리더. 밸류 체크 필요." },
    { name: "현대차", ticker: "005380.KS", score: "81", tag: "Boston Dynamics", note: "직접 프록시. 자동차 업황 노이즈." },
    { name: "테라다인", ticker: "TER", score: "76", tag: "자동화 장비", note: "상승 강함. 모멘텀 훼손 체크." },
    { name: "두산로보틱스", ticker: "454910.KS", score: "62", tag: "고베타", note: "테마 깔끔. 수익성 약함." },
  ],
} satisfies Record<Lang, Array<{ name: string; ticker: string; score: string; tag: string; note: string }>>;

const signalStack = {
  en: [
    { label: "Physical AI", value: "Active", tone: "bull" },
    { label: "US AI semis", value: "Holding trend", tone: "bull" },
    { label: "Korea robot pure plays", value: "Volatile", tone: "warn" },
    { label: "Watch item", value: "Margin proof", tone: "neutral" },
  ],
  ko: [
    { label: "피지컬 AI", value: "활성", tone: "bull" },
    { label: "미국 AI 반도체", value: "추세 유지", tone: "bull" },
    { label: "국내 로봇 순수주", value: "변동성 큼", tone: "warn" },
    { label: "체크포인트", value: "마진 증명", tone: "neutral" },
  ],
} satisfies Record<Lang, Array<{ label: string; value: string; tone: "bull" | "warn" | "neutral" }>>;

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
  const reportGroups = groupReportsByDate(reports, lang);

  return (
    <AppShell
      lang={lang}
      active="overview"
      title={t.subtitle}
      meta={
        <div className="space-y-2 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-emerald-600" />
            <span>{connected ? t.connected : t.fallback}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-amber-600" />
            <span>{t.readOnly}</span>
          </div>
        </div>
      }
    >
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section className="space-y-4">
          <Panel title={t.aiWorkspace} icon={<Sparkles className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {aiModules[lang].map((item) => (
                <article key={item.title} className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-zinc-950">{item.title}</h2>
                    <span className="rounded bg-white px-2 py-1 text-xs font-semibold text-zinc-500">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.body}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel id="stock-picker" title={t.stockPicker} icon={<LineChart className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-2">
              {ideaQueue[lang].map((item) => (
                <article key={item.ticker} className="rounded-md border border-zinc-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold text-zinc-950">{item.name}</h2>
                        <span className="rounded bg-zinc-100 px-2 py-1 font-mono text-xs font-semibold text-zinc-600">
                          {item.ticker}
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-semibold uppercase text-blue-700">{item.tag}</div>
                    </div>
                    <div className="rounded-md bg-zinc-950 px-3 py-2 text-center text-white">
                      <div className="text-lg font-semibold">{item.score}</div>
                      <div className="text-[10px] font-semibold uppercase text-zinc-300">Score</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{item.note}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title={t.popularAssets} icon={<BarChart3 className="h-4 w-4" />}>
            <div className="overflow-hidden rounded-md border border-zinc-200">
              <div className="grid grid-cols-[1.2fr_0.7fr_0.8fr_0.7fr] bg-zinc-100 px-3 py-2 text-xs font-semibold uppercase text-zinc-500">
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
                      className="grid min-h-14 grid-cols-[1.2fr_0.7fr_0.8fr_0.7fr] items-center px-3 py-2 text-sm"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-medium text-zinc-950">{asset.name}</div>
                        <div className="truncate text-xs text-zinc-500">{asset.display_symbol}</div>
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
          <Panel title={t.marketBrief} icon={<Sparkles className="h-4 w-4" />}>
            <div className="space-y-3 text-sm leading-6 text-zinc-600">
              <p>{lang === "ko" ? "AI 인프라 강세. 로봇주는 촉매 대기." : "AI infrastructure leads. Robotics waits for proof."}</p>
              <p>{lang === "ko" ? "순수주는 가볍게. 플랫폼주는 중심축." : "Keep pure plays light. Platform names stay core."}</p>
            </div>
          </Panel>

          <Panel id="smart-signals" title={t.signalStack} icon={<Signal className="h-4 w-4" />}>
            <div className="space-y-2">
              {signalStack[lang].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 bg-white p-3">
                  <span className="text-sm font-medium text-zinc-700">{item.label}</span>
                  <span className={signalClass(item.tone)}>{item.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel id="smart-money" title={t.smartMoney} icon={<Search className="h-4 w-4" />}>
            <div className="space-y-2 text-sm">
              <FeedRow label={lang === "ko" ? "내부자" : "Insiders"} value={lang === "ko" ? "연동 예정" : "Pending"} />
              <FeedRow label={lang === "ko" ? "기관 수급" : "Institutions"} value={lang === "ko" ? "연동 예정" : "Pending"} />
              <FeedRow label={lang === "ko" ? "큰손 추적" : "Whale flow"} value={lang === "ko" ? "연동 예정" : "Pending"} />
            </div>
          </Panel>

          <Panel title={t.marketThemes} icon={<Bot className="h-4 w-4" />}>
            <Link
              href={`/physical-ai?lang=${lang}`}
              className="block rounded-md border border-zinc-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950">
                <Bot className="h-4 w-4 text-blue-600" />
                {t.physicalAi}
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{t.physicalAiDesc}</p>
            </Link>
          </Panel>

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
              <FeedRow label={t.reportsFeed} value={t.reportsProvider} />
            </div>
          </Panel>
        </aside>
      </div>
    </AppShell>
  );
}

function Panel({
  id,
  title,
  icon,
  children,
}: {
  id?: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-4 rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-800">
        <span className="text-zinc-500">{icon}</span>
        {title}
      </div>
      {children}
    </section>
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

function signalClass(tone: "bull" | "warn" | "neutral") {
  const base = "rounded px-2 py-1 text-xs font-semibold";
  if (tone === "bull") return `${base} bg-emerald-100 text-emerald-700`;
  if (tone === "warn") return `${base} bg-amber-100 text-amber-700`;
  return `${base} bg-zinc-100 text-zinc-700`;
}
