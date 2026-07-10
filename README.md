# MarketLens Dashboard

Read-only market intelligence dashboard for Meridian.

## Scope

- Public market overview
- Popular Korean stocks, US stocks, and Upbit crypto assets
- Public-safe report archive
- Public risk notes
- No brokerage controls
- No account data
- No order placement or trading features

## Environment

Create the deployment environment from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Only the Supabase anon key belongs in the frontend. Do not add service-role keys,
broker credentials, account numbers, or TradingClaw private env values to this
repository or to public deployment variables.

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deployment

Vercel is the preferred production target. Configure only:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Supabase RLS must keep `research_reports`, `trade_orders`, brokerage data, and
raw operational logs private. The public app should read only the dashboard
tables created for MarketLens.
