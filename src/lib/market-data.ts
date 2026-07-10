import { supabase } from "./supabase";

export type Asset = {
  symbol: string;
  display_symbol: string;
  name: string;
  asset_type: "kr_stock" | "us_stock" | "crypto" | "index" | "fx" | "rate" | "commodity";
  market: string;
  provider: string;
  provider_symbol: string;
  currency: string | null;
  rank_group: string;
  is_active: boolean;
};

export type AssetPrice = {
  symbol: string;
  provider: string;
  price: number | null;
  currency: string | null;
  change: number | null;
  change_percent: number | null;
  volume: number | null;
  as_of: string;
};

export type DashboardReport = {
  id: number;
  report_type: string;
  title: string;
  summary: string | null;
  published_at: string;
};

export type RiskNote = {
  id: number;
  severity: "low" | "medium" | "high";
  title: string;
  body: string;
  starts_at: string;
};

const fallbackAssets: Asset[] = [
  asset("KRX:005930", "005930", "Samsung Electronics", "kr_stock", "KRX", "kis", "KRW"),
  asset("KRX:000660", "000660", "SK hynix", "kr_stock", "KRX", "kis", "KRW"),
  asset("NASDAQ:NVDA", "NVDA", "NVIDIA", "us_stock", "NASDAQ", "kis", "USD"),
  asset("NASDAQ:AAPL", "AAPL", "Apple", "us_stock", "NASDAQ", "kis", "USD"),
  asset("UPBIT:KRW-BTC", "KRW-BTC", "Bitcoin", "crypto", "UPBIT", "upbit", "KRW"),
  asset("UPBIT:KRW-ETH", "KRW-ETH", "Ethereum", "crypto", "UPBIT", "upbit", "KRW"),
];

function asset(
  symbol: string,
  displaySymbol: string,
  name: string,
  assetType: Asset["asset_type"],
  market: string,
  provider: string,
  currency: string,
): Asset {
  return {
    symbol,
    display_symbol: displaySymbol,
    name,
    asset_type: assetType,
    market,
    provider,
    provider_symbol: displaySymbol,
    currency,
    rank_group: "popular",
    is_active: true,
  };
}

export async function getDashboardData() {
  if (!supabase) {
    return {
      assets: fallbackAssets,
      prices: [] as AssetPrice[],
      reports: [] as DashboardReport[],
      risks: [] as RiskNote[],
      connected: false,
    };
  }

  const [assets, prices, reports, risks] = await Promise.all([
    supabase
      .from("asset_universe")
      .select("*")
      .eq("is_active", true)
      .order("asset_type")
      .order("symbol"),
    supabase
      .from("asset_prices")
      .select("symbol, provider, price, currency, change, change_percent, volume, as_of")
      .order("as_of", { ascending: false })
      .limit(80),
    supabase
      .from("dashboard_reports")
      .select("id, report_type, title, summary, published_at")
      .order("published_at", { ascending: false })
      .limit(6),
    supabase
      .from("risk_notes")
      .select("id, severity, title, body, starts_at")
      .order("starts_at", { ascending: false })
      .limit(5),
  ]);

  return {
    assets: (assets.data ?? fallbackAssets) as Asset[],
    prices: (prices.data ?? []) as AssetPrice[],
    reports: (reports.data ?? []) as DashboardReport[],
    risks: (risks.data ?? []) as RiskNote[],
    connected: !assets.error,
  };
}

export function latestPriceMap(prices: AssetPrice[]) {
  const latest = new Map<string, AssetPrice>();
  for (const price of prices) {
    if (!latest.has(price.symbol)) {
      latest.set(price.symbol, price);
    }
  }
  return latest;
}
