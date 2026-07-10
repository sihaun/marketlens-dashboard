import {
  Activity,
  AlertTriangle,
  BarChart3,
  Database,
  FileText,
  Gauge,
  Radio,
  Search,
} from "lucide-react";
import { AssetMixChart } from "@/components/asset-mix-chart";
import { getDashboardData, latestPriceMap, type Asset } from "@/lib/market-data";

const assetTypeLabels: Record<Asset["asset_type"], string> = {
  kr_stock: "Korea",
  us_stock: "US",
  crypto: "Crypto",
  index: "Index",
  fx: "FX",
  rate: "Rates",
  commodity: "Commodities",
};

export default async function Home() {
  const { assets, prices, reports, risks, connected } = await getDashboardData();
  const priceBySymbol = latestPriceMap(prices);
  const mix = Object.entries(
    assets.reduce<Record<string, number>>((acc, asset) => {
      acc[assetTypeLabels[asset.asset_type]] = (acc[assetTypeLabels[asset.asset_type]] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const pricedCount = assets.filter((asset) => priceBySymbol.has(asset.symbol)).length;

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
                Public market intelligence
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Metric label="Assets" value={assets.length.toString()} />
              <Metric label="Priced" value={pricedCount.toString()} />
              <Metric label="Reports" value={reports.length.toString()} />
              <Metric label="Risks" value={risks.length.toString()} />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-emerald-600" />
              <span>{connected ? "Supabase public read connected" : "Using local fallback universe"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-600" />
              <span>Read-only dashboard. No brokerage, account, or order controls.</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
            <Panel title="Popular Assets" icon={<BarChart3 className="h-4 w-4" />}>
              <div className="overflow-hidden rounded-md border border-zinc-200">
                <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr] bg-zinc-100 px-3 py-2 text-xs font-semibold uppercase text-zinc-500">
                  <span>Asset</span>
                  <span>Market</span>
                  <span>Price</span>
                  <span>Change</span>
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
                            {assetTypeLabels[asset.asset_type]}
                          </span>
                        </div>
                        <div className="font-mono text-sm">
                          {price?.price == null ? "Pending" : formatPrice(price.price, price.currency)}
                        </div>
                        <Change value={price?.change_percent ?? null} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>

            <Panel title="Asset Mix" icon={<Activity className="h-4 w-4" />}>
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

          <Panel title="Research Reports" icon={<FileText className="h-4 w-4" />}>
            {reports.length ? (
              <div className="grid gap-3 md:grid-cols-2">
                {reports.map((report) => (
                  <article key={report.id} className="rounded-md border border-zinc-200 bg-white p-4">
                    <div className="text-xs font-medium uppercase text-blue-700">{report.report_type}</div>
                    <h2 className="mt-1 text-base font-semibold text-zinc-950">{report.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600">
                      {report.summary ?? "Full report available in the dashboard archive."}
                    </p>
                    <time className="mt-3 block text-xs text-zinc-500">{formatDate(report.published_at)}</time>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Search className="h-5 w-5" />}
                title="No published dashboard reports yet"
                detail="Morning briefs, weekly reviews, and public-safe research summaries will appear here."
              />
            )}
          </Panel>
        </section>

        <aside className="space-y-4">
          <Panel title="Risk Notes" icon={<AlertTriangle className="h-4 w-4" />}>
            {risks.length ? (
              <div className="space-y-3">
                {risks.map((risk) => (
                  <div key={risk.id} className="rounded-md border border-zinc-200 bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className={severityClass(risk.severity)}>{risk.severity}</span>
                      <time className="text-xs text-zinc-500">{formatDate(risk.starts_at)}</time>
                    </div>
                    <div className="mt-2 font-medium text-zinc-950">{risk.title}</div>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{risk.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<AlertTriangle className="h-5 w-5" />}
                title="No active public risk notes"
                detail="Macro, event, and volatility alerts will appear when Meridian publishes them."
              />
            )}
          </Panel>

          <Panel title="Data Feeds" icon={<Database className="h-4 w-4" />}>
            <div className="space-y-2 text-sm">
              <FeedRow label="Crypto" value="Upbit" />
              <FeedRow label="Korea stocks" value="KIS primary" />
              <FeedRow label="US stocks" value="KIS, Finnhub fallback" />
              <FeedRow label="Reports" value="Meridian / TradingClaw" />
            </div>
          </Panel>
        </aside>
      </div>
    </main>
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

function Change({ value }: { value: number | null }) {
  if (value == null) {
    return <span className="text-sm text-zinc-400">Pending</span>;
  }
  const positive = value >= 0;
  return (
    <span className={positive ? "font-mono text-sm text-emerald-700" : "font-mono text-sm text-red-700"}>
      {positive ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

function formatPrice(value: number, currency: string | null) {
  const digits = currency === "KRW" ? 0 : 2;
  return `${currency ?? ""} ${value.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}`.trim();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
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
