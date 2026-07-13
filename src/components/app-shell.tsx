import { BarChart3, Bot, Languages, LineChart, Search, Signal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Lang = "en" | "ko";
type ActivePage = "overview" | "physical-ai";

const navCopy = {
  en: {
    overview: "Overview",
    tools: "Tools",
    stockPicker: "AI Stock Picker",
    smartSignals: "Smart Signals",
    smartMoney: "Smart Money",
    themes: "Themes",
    physicalAi: "Physical AI",
    language: "Language",
  },
  ko: {
    overview: "대시보드",
    tools: "도구",
    stockPicker: "AI Stock Picker",
    smartSignals: "Smart Signals",
    smartMoney: "Smart Money",
    themes: "테마",
    physicalAi: "피지컬 AI",
    language: "언어",
  },
} satisfies Record<Lang, Record<string, string>>;

export function AppShell({
  lang,
  active,
  title,
  eyebrow,
  description,
  meta,
  children,
}: {
  lang: Lang;
  active: ActivePage;
  title: string;
  eyebrow?: string;
  description?: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  const t = navCopy[lang];

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-zinc-200 bg-white lg:block">
        <div className="sticky top-0 flex h-screen flex-col px-4 py-5">
          <Link href={`/?lang=${lang}`} className="flex items-center gap-2 px-2">
            <Image src="/marketlens-mark.svg" alt="" width={24} height={24} className="rounded" />
            <span className="text-sm font-semibold text-zinc-950">MarketLens</span>
          </Link>

          <nav className="mt-8 space-y-5">
            <div>
              <div className="px-2 text-xs font-semibold uppercase text-zinc-400">{t.overview}</div>
              <div className="mt-2 space-y-1">
                <NavItem
                  href={`/?lang=${lang}`}
                  active={active === "overview"}
                  icon={<BarChart3 className="h-4 w-4" />}
                  label={t.overview}
                />
              </div>
            </div>

            <div>
              <div className="px-2 text-xs font-semibold uppercase text-zinc-400">{t.tools}</div>
              <div className="mt-2 space-y-1">
                <NavItem
                  href={`/?lang=${lang}#stock-picker`}
                  active={false}
                  icon={<LineChart className="h-4 w-4" />}
                  label={t.stockPicker}
                />
                <NavItem
                  href={`/?lang=${lang}#smart-signals`}
                  active={false}
                  icon={<Signal className="h-4 w-4" />}
                  label={t.smartSignals}
                />
                <NavItem
                  href={`/?lang=${lang}#smart-money`}
                  active={false}
                  icon={<Search className="h-4 w-4" />}
                  label={t.smartMoney}
                />
              </div>
            </div>

            <div>
              <div className="px-2 text-xs font-semibold uppercase text-zinc-400">{t.themes}</div>
              <div className="mt-2 space-y-1">
                <NavItem
                  href={`/physical-ai?lang=${lang}`}
                  active={active === "physical-ai"}
                  icon={<Bot className="h-4 w-4" />}
                  label={t.physicalAi}
                />
              </div>
            </div>
          </nav>

          <div className="mt-auto">
            <LanguageSwitch lang={lang} active={active} label={t.language} />
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="border-b border-zinc-200 bg-white lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href={`/?lang=${lang}`} className="flex items-center gap-2">
              <Image src="/marketlens-mark.svg" alt="" width={22} height={22} className="rounded" />
              <span className="text-sm font-semibold text-zinc-950">MarketLens</span>
            </Link>
            <LanguageSwitch lang={lang} active={active} label={t.language} compact />
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pb-3">
            <NavPill href={`/?lang=${lang}`} active={active === "overview"} label={t.overview} />
            <NavPill href={`/physical-ai?lang=${lang}`} active={active === "physical-ai"} label={t.physicalAi} />
          </div>
        </div>

        <header className="border-b border-zinc-200 bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
            <div>
              {eyebrow ? <div className="text-sm font-semibold text-blue-700">{eyebrow}</div> : null}
              <h1 className="mt-1 text-2xl font-semibold tracking-normal text-zinc-950 sm:text-3xl">{title}</h1>
              {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">{description}</p> : null}
            </div>
            {meta ? <div className="lg:min-w-72">{meta}</div> : null}
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}

function NavItem({ href, active, icon, label }: { href: string; active: boolean; icon: ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "flex h-10 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-semibold text-white"
          : "flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
      }
    >
      {icon}
      {label}
    </Link>
  );
}

function NavPill({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-md bg-zinc-950 px-3 py-2 text-xs font-semibold text-white"
          : "rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600"
      }
    >
      {label}
    </Link>
  );
}

function LanguageSwitch({
  lang,
  active,
  label,
  compact = false,
}: {
  lang: Lang;
  active: ActivePage;
  label: string;
  compact?: boolean;
}) {
  const path = active === "physical-ai" ? "/physical-ai" : "/";

  return (
    <div className="flex items-center gap-2">
      {!compact ? (
        <>
          <Languages className="h-4 w-4 text-zinc-500" />
          <span className="text-xs font-medium text-zinc-500">{label}</span>
        </>
      ) : null}
      <div className="flex overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
        <Link className={lang === "en" ? activeToggleClass : toggleClass} href={`${path}?lang=en`}>
          EN
        </Link>
        <Link className={lang === "ko" ? activeToggleClass : toggleClass} href={`${path}?lang=ko`}>
          KO
        </Link>
      </div>
    </div>
  );
}

const toggleClass = "px-3 py-1.5 text-xs font-semibold text-zinc-600";
const activeToggleClass = "bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white";
