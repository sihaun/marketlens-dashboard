import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bot,
  Building2,
  Cpu,
  Factory,
  Languages,
  LineChart,
  Link as LinkIcon,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

type Lang = "en" | "ko";

const copy = {
  en: {
    back: "MarketLens",
    language: "Language",
    label: "Core Theme",
    title: "Physical AI: the listed-market map behind the robotics cycle",
    intro:
      "Humanoids and industrial robots are still early, so the investable trade is wider than a single robot maker. The strongest setups combine platform software, factory demand, test automation, and listed proxies with real balance sheets.",
    updated: "Updated",
    note: "Public market research, not a trading instruction.",
    thesis: "Main Takeaway",
    basket: "Listed Exposure Basket",
    outlook: "Price Outlook",
    nextThemes: "What Could Lead Next",
    watchlist: "Watchlist",
    catalysts: "Catalysts",
    risk: "Risk",
    sources: "Sources",
    riskBody: [
      "Humanoid robotics still has a large gap between demo quality and factory ROI. Expensive pure-play names can move hard on order delays, margin pressure, or slower deployment schedules.",
      "Hyundai is the closest Boston Dynamics proxy, but it remains an automaker. FX, EV competition, tariffs, labor issues, and auto margins can matter more than the robotics story in the short run.",
    ],
  },
  ko: {
    back: "MarketLens",
    language: "언어",
    label: "핵심 테마",
    title: "피지컬 AI: 로봇 사이클 지도",
    intro:
      "특정 로봇 회사 하나보다 플랫폼, 공장 수요, 자동화 장비를 같이 봐야 하는 구간.",
    updated: "업데이트",
    note: "공개 시장 리서치. 매매 지시 아님.",
    thesis: "핵심 결론",
    basket: "상장 노출도 바스켓",
    outlook: "주가 변동 전망",
    nextThemes: "다음에 뜰 가능성이 큰 영역",
    watchlist: "Watchlist",
    catalysts: "Catalysts",
    risk: "Risk",
    sources: "Sources",
    riskBody: [
      "데모와 공장 ROI는 다르다. 고밸류 순수주는 수주 지연에 크게 흔들림.",
      "현대차는 가장 가까운 프록시. 다만 단기 주가는 자동차 업황 영향이 더 큼.",
    ],
  },
} satisfies Record<Lang, Record<string, string | string[]>>;

const thesis = {
  en: [
    {
      label: "Cleanest Boston Dynamics proxy",
      value: "Hyundai Motor",
      detail:
        "Boston Dynamics is not separately listed. Hyundai offers the closest public exposure, though the auto cycle still drives most reported earnings.",
    },
    {
      label: "Strongest platform proxy",
      value: "NVIDIA",
      detail:
        "Robot training, simulation, edge inference, and the developer stack all connect through NVIDIA. The trade is high quality, but not undiscovered.",
    },
    {
      label: "Highest beta segment",
      value: "Korea robot pure plays",
      detail:
        "Doosan Robotics and Rainbow Robotics can react sharply to the theme, but expectations are already ahead of near-term earnings.",
    },
  ],
  ko: [
    {
      label: "가장 깔끔한 Boston Dynamics 프록시",
      value: "현대차",
      detail:
        "Boston Dynamics는 비상장. 직접 노출은 현대차. 다만 본업은 자동차.",
    },
    {
      label: "가장 강한 플랫폼 프록시",
      value: "엔비디아",
      detail:
        "로봇 학습, 시뮬레이션, 엣지 추론 노출. 이미 기대가 많이 붙은 고품질주.",
    },
    {
      label: "가장 높은 베타 구간",
      value: "국내 로봇 순수주",
      detail:
        "두산로보틱스와 레인보우로보틱스. 테마 민감도 높음. 실적보다 기대가 앞섬.",
    },
  ],
} satisfies Record<Lang, Array<{ label: string; value: string; detail: string }>>;

const leaders = {
  en: [
    {
      name: "Hyundai Motor",
      ticker: "005380.KS",
      role: "Boston Dynamics exposure",
      signal: "Boston Dynamics is the cleanest catalyst, but the stock still trades as an automaker first.",
      data: "KRW 444,000, 6M +45.3%, 1M -26.9%, forward P/E 9.1x",
      view: "Re-rating potential improves if Atlas deployment, internal factory use, or IPO optionality becomes clearer.",
    },
    {
      name: "NVIDIA",
      ticker: "NVDA",
      role: "Physical AI platform layer",
      signal: "Isaac, Cosmos, simulation, edge compute, and robot foundation models make NVIDIA the infrastructure layer.",
      data: "USD 210.96, 3M +14.8%, 6M +11.7%, forward P/E 16.5x",
      view: "Best quality exposure, but physical AI is only one part of a much larger AI semiconductor story.",
    },
    {
      name: "Teradyne",
      ticker: "TER",
      role: "Test automation and cobot leverage",
      signal: "Semiconductor test demand and Universal Robots exposure connect it to AI hardware and factory automation.",
      data: "USD 359.60, 6M +61.8%, forward P/E 36.6x",
      view: "A useful picks-and-shovels name, though recent strength makes entries more sensitive to momentum breaks.",
    },
    {
      name: "Doosan Robotics",
      ticker: "454910.KS",
      role: "Korea cobot pure play",
      signal: "Cleaner robotics revenue exposure than conglomerates, but profitability is still the issue.",
      data: "KRW 70,100, 1M -36.5%, 6M -13.7%, negative forward P/E",
      view: "Best treated as a high-beta watchlist name until orders, margins, or humanoid roadmap evidence improves.",
    },
    {
      name: "Rainbow Robotics",
      ticker: "277810.KQ",
      role: "Samsung-linked expectation trade",
      signal: "A leveraged Korea robotics theme tied to Samsung's roadmap, with valuation ahead of current earnings.",
      data: "KRW 415,000, 1M -33.5%, forward P/E 349.3x",
      view: "Can move hard on Samsung-related catalysts, but disappointment risk is high.",
    },
    {
      name: "Tesla",
      ticker: "TSLA",
      role: "Humanoid optionality",
      signal: "Optimus can change the narrative, but the stock also carries EV, margin, execution, and governance risk.",
      data: "USD 407.76, 3M +18.0%, forward P/E 158.1x",
      view: "The biggest upside narrative if humanoids scale, but also the least clean valuation setup.",
    },
  ],
  ko: [
    {
      name: "현대차",
      ticker: "005380.KS",
      role: "Boston Dynamics 노출",
      signal: "Boston Dynamics 직접 노출. 그래도 시장은 자동차주로 먼저 봄.",
      data: "444,000원, 6개월 +45.3%, 1개월 -26.9%, 선행 P/E 9.1배",
      view: "Atlas 배치, 내부 공장 도입, IPO 기대가 핵심 촉매.",
    },
    {
      name: "엔비디아",
      ticker: "NVDA",
      role: "피지컬 AI 플랫폼",
      signal: "Isaac, Cosmos, 엣지 AI 노출. 로봇 인프라의 중심축.",
      data: "210.96달러, 3개월 +14.8%, 6개월 +11.7%, 선행 P/E 16.5배",
      view: "가장 질 좋은 노출. 다만 이미 AI 기대가 많이 반영.",
    },
    {
      name: "테라다인",
      ticker: "TER",
      role: "테스트 자동화와 협동로봇",
      signal: "반도체 테스트와 협동로봇 노출. 공장 자동화 수혜.",
      data: "359.60달러, 6개월 +61.8%, 선행 P/E 36.6배",
      view: "삽과 곡괭이 성격의 종목. 다만 최근 상승이 커서 모멘텀 훼손에는 민감.",
    },
    {
      name: "두산로보틱스",
      ticker: "454910.KS",
      role: "국내 협동로봇 순수주",
      signal: "로봇 매출 노출은 깔끔함. 아직 수익성이 문제.",
      data: "70,100원, 1개월 -36.5%, 6개월 -13.7%, 선행 P/E 적자",
      view: "고베타 관찰 종목. 수주와 마진 개선이 먼저 필요.",
    },
    {
      name: "레인보우로보틱스",
      ticker: "277810.KQ",
      role: "삼성 연계 기대주",
      signal: "삼성 로봇 로드맵 기대주. 실적보다 기대가 큼.",
      data: "415,000원, 1개월 -33.5%, 선행 P/E 349.3배",
      view: "촉매에는 강하게 반응. 기대가 식으면 하방도 큼.",
    },
    {
      name: "테슬라",
      ticker: "TSLA",
      role: "휴머노이드 옵션",
      signal: "Optimus 옵션. EV와 지배구조 리스크도 같이 붙음.",
      data: "407.76달러, 3개월 +18.0%, 선행 P/E 158.1배",
      view: "상방 스토리는 큼. 밸류에이션은 가장 부담.",
    },
  ],
} satisfies Record<Lang, Array<{ name: string; ticker: string; role: string; signal: string; data: string; view: string }>>;

const scenarios = {
  en: [
    {
      title: "Base Case",
      probability: "55%",
      description:
        "The theme stays strong, but leadership rotates between AI semis, factory automation, and Korea robot pure plays. Hyundai gets a valuation tailwind, while pure plays stay volatile until orders and margins improve.",
    },
    {
      title: "Bull Case",
      probability: "25%",
      description:
        "Atlas deployment timelines, NVIDIA robotics stack adoption, and reshoring capex accelerate together. Hyundai, Teradyne, and selected Korea robot names can re-rate sharply.",
    },
    {
      title: "Bear Case",
      probability: "20%",
      description:
        "Humanoid timelines slip, expensive robot stocks de-rate, and investors move back to profitable AI infrastructure. NVIDIA holds up better than pure plays; Hyundai returns to auto-sector valuation logic.",
    },
  ],
  ko: [
    {
      title: "기본 시나리오",
      probability: "55%",
      description:
        "테마는 유지. 주도주는 AI 반도체, 자동화, 국내 로봇주 사이에서 순환.",
    },
    {
      title: "강세 시나리오",
      probability: "25%",
      description:
        "Atlas 배치, 엔비디아 로봇 스택, 리쇼어링 투자가 같이 붙는 그림.",
    },
    {
      title: "약세 시나리오",
      probability: "20%",
      description:
        "휴머노이드 일정 지연. 비싼 순수주는 디레이팅. 돈은 다시 실적주로 이동.",
    },
  ],
} satisfies Record<Lang, Array<{ title: string; probability: string; description: string }>>;

const themes = {
  en: [
    {
      icon: "cpu",
      title: "Robot foundation models and simulation",
      body: "Robots need data, and the real world is slow. Simulation, synthetic data, and robot training frameworks can lead before unit shipments do.",
    },
    {
      icon: "factory",
      title: "Internal factory demand",
      body: "The first serious customer is not the consumer. It is the factory owner that can test utilization, safety, and payback inside its own network.",
    },
    {
      icon: "building",
      title: "Actuators, reducers, and sensors",
      body: "If humanoids move toward volume production, component bottlenecks show up early. Parts suppliers may re-rate before robot brands do.",
    },
    {
      icon: "bot",
      title: "Cobot to humanoid bridge",
      body: "Cobots already have factory use cases. They are the practical bridge between today's automation market and tomorrow's humanoid market.",
    },
  ],
  ko: [
    {
      icon: "cpu",
      title: "로봇 파운데이션 모델과 시뮬레이션",
      body: "현실 데이터는 부족하고 실험은 느림. 시뮬레이션과 합성 데이터가 먼저 뜰 수 있음.",
    },
    {
      icon: "factory",
      title: "내부 공장 수요",
      body: "초기 고객은 소비자가 아니라 공장. 활용률과 안전성을 내부에서 먼저 검증.",
    },
    {
      icon: "building",
      title: "액추에이터, 감속기, 센서",
      body: "양산으로 가면 부품 병목이 먼저 보임. 핵심 부품사가 먼저 재평가될 수 있음.",
    },
    {
      icon: "bot",
      title: "협동로봇에서 휴머노이드로 가는 다리",
      body: "협동로봇은 이미 공장 사용처가 있음. 휴머노이드 전 단계의 현실적 수혜.",
    },
  ],
} satisfies Record<Lang, Array<{ icon: "cpu" | "factory" | "building" | "bot"; title: string; body: string }>>;

const watchItems = {
  en: [
    { label: "Best direct listed proxy", value: "Hyundai Motor via Boston Dynamics" },
    { label: "Best platform proxy", value: "NVIDIA via Isaac, Cosmos, GR00T, edge AI" },
    { label: "Best picks-and-shovels proxy", value: "Teradyne via test automation and cobots" },
    { label: "Highest Korea beta", value: "Rainbow Robotics and Doosan Robotics" },
    { label: "Diversified route", value: "IRBO, BOTZ, ROBO robotics and AI ETFs" },
  ],
  ko: [
    { label: "가장 직접적인 상장 프록시", value: "Boston Dynamics를 보유한 현대차" },
    { label: "가장 강한 플랫폼 프록시", value: "Isaac, Cosmos, GR00T의 엔비디아" },
    { label: "삽과 곡괭이 프록시", value: "테스트 자동화와 협동로봇의 테라다인" },
    { label: "국내 고베타", value: "레인보우로보틱스와 두산로보틱스" },
    { label: "분산 노출", value: "IRBO, BOTZ, ROBO 로봇/AI ETF" },
  ],
} satisfies Record<Lang, Array<{ label: string; value: string }>>;

const catalysts = {
  en: [
    "Boston Dynamics Atlas production proof, Hyundai/Kia factory deployment milestones, or IPO preparation headlines",
    "NVIDIA Isaac, Cosmos, and GR00T adoption by robot makers, system integrators, and industrial labs",
    "Factory automation capex recovery as companies bring manufacturing closer to end demand",
    "Korean conglomerate capital allocation toward humanoids, cobots, actuators, reducers, sensors, and robot software",
    "Margin evidence from cobot vendors, not just prototype videos or conference demos",
  ],
  ko: [
    "Boston Dynamics Atlas 생산 검증",
    "현대차·기아 공장 배치 마일스톤",
    "엔비디아 Isaac, Cosmos, GR00T 채택",
    "리쇼어링과 자동화 설비투자 회복",
    "협동로봇 업체의 마진과 수주 개선",
  ],
} satisfies Record<Lang, string[]>;

const sources = [
  {
    name: "Reuters",
    detail: "Hyundai factory robotics plan and 2028 robot production capacity target",
    href: "https://www.reuters.com/business/autos-transportation/hyundai-motor-group-plans-deploy-humanoid-robots-us-factory-2028-2026-01-05/",
  },
  {
    name: "NVIDIA Newsroom",
    detail: "Isaac GR00T reference humanoid robot and physical AI platform direction",
    href: "https://nvidianews.nvidia.com/news/nvidia-open-humanoid-robot-reference-design",
  },
  {
    name: "The Korea Herald",
    detail: "Hyundai and Kia internal Atlas deployment target",
    href: "https://www.koreaherald.com/article/10741955",
  },
  {
    name: "Kiplinger",
    detail: "AI and robotics ETF positioning",
    href: "https://www.kiplinger.com/investing/etfs/601112/top-artificial-intelligence-ai-etfs",
  },
];

export const metadata = {
  title: "Physical AI Outlook | MarketLens",
  description: "Physical AI and robotics market outlook with Boston Dynamics, Hyundai, NVIDIA, and robotics stock proxies.",
};

export default async function PhysicalAiPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const lang: Lang = params?.lang === "en" ? "en" : "ko";
  const t = copy[lang];

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/?lang=${lang}`}
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
            <LanguageSwitch lang={lang} label={String(t.language)} />
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Bot className="h-4 w-4" />
                {t.label}
              </div>
              <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
                {t.title}
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">{t.intro}</p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
              <div className="font-semibold text-zinc-950">{t.updated}</div>
              <div>2026-07-13 KST</div>
              <div className="mt-2 text-xs text-zinc-500">{t.note}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section className="space-y-4">
          <Panel title={String(t.thesis)} icon={<ShieldCheck className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-3">
              {thesis[lang].map((item) => (
                <SignalCard key={item.label} label={item.label} value={item.value} detail={item.detail} />
              ))}
            </div>
          </Panel>

          <Panel title={String(t.basket)} icon={<LineChart className="h-4 w-4" />}>
            <div className="grid gap-3">
              {leaders[lang].map((item) => (
                <article key={item.ticker} className="rounded-md border border-zinc-200 bg-white p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold text-zinc-950">{item.name}</h2>
                        <span className="rounded bg-zinc-100 px-2 py-1 font-mono text-xs font-semibold text-zinc-600">
                          {item.ticker}
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-medium text-blue-700">{item.role}</div>
                    </div>
                    <div className="rounded bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-600">{item.data}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{item.signal}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-800">{item.view}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title={String(t.outlook)} icon={<Activity className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-3">
              {scenarios[lang].map((scenario) => (
                <article key={scenario.title} className="rounded-md border border-zinc-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-zinc-950">{scenario.title}</h2>
                    <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                      {scenario.probability}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{scenario.description}</p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title={String(t.nextThemes)} icon={<Zap className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-2">
              {themes[lang].map((theme) => (
                <ThemeBlock key={theme.title} icon={themeIcon(theme.icon)} title={theme.title} body={theme.body} />
              ))}
            </div>
          </Panel>
        </section>

        <aside className="space-y-4">
          <Panel title={String(t.watchlist)} icon={<Bot className="h-4 w-4" />}>
            <div className="space-y-2">
              {watchItems[lang].map((item) => (
                <div key={item.label} className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-semibold uppercase text-zinc-500">{item.label}</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-950">{item.value}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={String(t.catalysts)} icon={<Zap className="h-4 w-4" />}>
            <ul className="space-y-2 text-sm leading-6 text-zinc-600">
              {catalysts[lang].map((item) => (
                <li key={item} className="rounded-md border border-zinc-200 bg-white p-3">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={String(t.risk)} icon={<AlertTriangle className="h-4 w-4" />}>
            <div className="space-y-3 text-sm leading-6 text-zinc-600">
              {(t.riskBody as string[]).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </Panel>

          <Panel title={String(t.sources)} icon={<LinkIcon className="h-4 w-4" />}>
            <div className="space-y-2">
              {sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  className="block rounded-md border border-zinc-200 bg-white p-3 text-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="font-semibold text-zinc-950">{source.name}</span>
                  <span className="mt-1 block leading-6 text-zinc-600">{source.detail}</span>
                </a>
              ))}
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
        <Link className={lang === "en" ? activeToggleClass : toggleClass} href="/physical-ai?lang=en">
          EN
        </Link>
        <Link className={lang === "ko" ? activeToggleClass : toggleClass} href="/physical-ai?lang=ko">
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

function SignalCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-xs font-semibold uppercase text-zinc-500">{label}</div>
      <div className="mt-2 text-lg font-semibold text-zinc-950">{value}</div>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{detail}</p>
    </article>
  );
}

function ThemeBlock({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="rounded-md border border-zinc-200 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950">
        <span className="text-blue-600">{icon}</span>
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{body}</p>
    </article>
  );
}

function themeIcon(icon: "cpu" | "factory" | "building" | "bot") {
  if (icon === "cpu") return <Cpu className="h-5 w-5" />;
  if (icon === "factory") return <Factory className="h-5 w-5" />;
  if (icon === "building") return <Building2 className="h-5 w-5" />;
  return <Bot className="h-5 w-5" />;
}

const toggleClass = "px-3 py-1.5 text-xs font-semibold text-zinc-600";
const activeToggleClass = "bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white";
