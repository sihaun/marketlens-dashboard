<p align="center">
  <img src="./public/marketlens-mark.svg" width="88" alt="MarketLens logo" />
</p>

<h1 align="center">MarketLens Dashboard</h1>

<p align="center">
  A public market dashboard for stocks, crypto, research notes, and risk signals.
</p>

<p align="center">
  <a href="https://marketlens-dashboard-two.vercel.app">Live dashboard</a>
  ·
  <a href="https://marketlens-dashboard-two.vercel.app/?lang=ko">Korean</a>
  ·
  <a href="https://marketlens-dashboard-two.vercel.app/?lang=en">English</a>
</p>

## Overview

MarketLens is a service-ready dashboard for monitoring popular assets across
Korean equities, US equities, and crypto markets. It is designed as a public,
read-only information product: prices, report archives, risk notes, and market
context are visible, while private ingestion and operational systems remain
outside the frontend.

## Features

- English and Korean interface
- Popular asset board for Korean stocks, US stocks, and Upbit KRW pairs
- Live price snapshots from a public-safe Supabase data layer
- Research reports grouped by publication date
- Risk notes and data-source status panels
- Vercel-ready Next.js deployment

## Architecture

```text
Market data jobs
  -> Supabase public dashboard tables
  -> MarketLens Next.js app
  -> Vercel production deployment
```

The frontend uses only public Supabase read access. Private API keys, service
role credentials, trading infrastructure, and account data do not belong in this
repository or in frontend deployment variables.

## Environment

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Deployment

The production deployment target is Vercel. Configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Do not configure private service keys or broker credentials in the web project.
