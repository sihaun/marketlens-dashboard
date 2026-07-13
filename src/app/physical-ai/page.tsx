import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bot,
  Building2,
  Cpu,
  Factory,
  LineChart,
  Link as LinkIcon,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

const leaders = [
  {
    name: "Hyundai Motor",
    ticker: "005380.KS",
    role: "Boston Dynamics exposure",
    signal: "Boston Dynamics is the cleanest strategic catalyst, but the stock still trades as an automaker first.",
    data: "KRW 444,000, 6M +45.3%, 1M -26.9%, forward P/E 9.1x",
    view: "Re-rating candidate if Atlas deployment, internal factory adoption, or IPO optionality becomes more visible.",
  },
  {
    name: "NVIDIA",
    ticker: "NVDA",
    role: "Physical AI platform layer",
    signal: "Isaac, Cosmos, simulation, edge compute, and robot foundation models make NVIDIA the infrastructure toll road.",
    data: "USD 210.96, 3M +14.8%, 6M +11.7%, forward P/E 16.5x",
    view: "Best quality exposure, but physical AI upside is already embedded inside a very large AI semiconductor story.",
  },
  {
    name: "Teradyne",
    ticker: "TER",
    role: "Test automation and cobot leverage",
    signal: "Semiconductor test demand and Universal Robots exposure connect it to both AI hardware and factory automation.",
    data: "USD 359.60, 6M +61.8%, forward P/E 36.6x",
    view: "Useful picks-and-shovels name, though the stock is already momentum-sensitive after a strong move.",
  },
  {
    name: "Doosan Robotics",
    ticker: "454910.KS",
    role: "Korea cobot pure play",
    signal: "Cleaner robotics revenue exposure than conglomerates, but profitability is still the core issue.",
    data: "KRW 70,100, 1M -36.5%, 6M -13.7%, negative forward P/E",
    view: "High beta watchlist name; attractive only if orders, margins, or humanoid roadmap evidence improves.",
  },
  {
    name: "Rainbow Robotics",
    ticker: "277810.KQ",
    role: "Samsung-linked expectation trade",
    signal: "A leveraged Korea robotics theme tied to Samsung's roadmap, with valuation far ahead of current earnings.",
    data: "KRW 415,000, 1M -33.5%, forward P/E 349.3x",
    view: "Could move sharply on Samsung-related catalysts, but downside risk is high if expectations cool.",
  },
  {
    name: "Tesla",
    ticker: "TSLA",
    role: "Humanoid optionality",
    signal: "Optimus can change the narrative, but the stock also carries EV, margin, execution, and governance volatility.",
    data: "USD 407.76, 3M +18.0%, forward P/E 158.1x",
    view: "The biggest upside narrative if humanoids scale, but also the least clean valuation setup.",
  },
];

const catalysts = [
  "Boston Dynamics Atlas production proof, Hyundai/Kia factory deployment milestones, or IPO preparation headlines",
  "NVIDIA Isaac/Cosmos/GR00T adoption by robot makers, system integrators, and industrial labs",
  "Factory automation capex recovery as companies bring manufacturing closer to end demand",
  "Korean conglomerate capital allocation toward humanoids, cobots, actuators, reducers, sensors, and robot software",
  "Margin evidence from cobot vendors, not just prototype videos or conference demos",
];

const scenarios = [
  {
    title: "Base Case",
    probability: "55%",
    description:
      "Physical AI remains a strong multi-year theme, but near-term stock moves rotate between AI semis, factory automation, and Korea robot pure plays. Hyundai gets a valuation tailwind, while pure plays stay volatile until orders and margins improve.",
  },
  {
    title: "Bull Case",
    probability: "25%",
    description:
      "Atlas deployment timelines, NVIDIA robot stack adoption, and reshoring capex all accelerate together. Hyundai, Teradyne, and select Korea robot names can re-rate sharply, while ETFs broaden the move beyond one or two winners.",
  },
  {
    title: "Bear Case",
    probability: "20%",
    description:
      "Humanoid timelines slip, expensive robot stocks de-rate, and investors return to profitable AI infrastructure only. NVIDIA holds up better than pure plays; Hyundai falls back toward auto-sector valuation logic.",
  },
];

const watchItems = [
  { label: "Best direct listed proxy", value: "Hyundai Motor via Boston Dynamics" },
  { label: "Best platform proxy", value: "NVIDIA via Isaac, Cosmos, GR00T, edge AI" },
  { label: "Best picks-and-shovels proxy", value: "Teradyne via test automation and cobots" },
  { label: "Highest Korea beta", value: "Rainbow Robotics and Doosan Robotics" },
  { label: "Diversified route", value: "IRBO, BOTZ, ROBO robotics and AI ETFs" },
];

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

export default function PhysicalAiPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
          >
            <ArrowLeft className="h-4 w-4" />
            MarketLens
          </Link>
          <div className="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Bot className="h-4 w-4" />
                Physical AI Watch
              </div>
              <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
                피지컬 AI는 보스턴 다이나믹스보다 넓게 봐야 한다
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
                휴머노이드와 산업용 로봇은 아직 초기 상용화 구간이다. 주가 관점에서는 단일 로봇 제조사보다
                플랫폼, 생산 자동화, 반도체 테스트, 대기업 내부 수요가 먼저 움직일 가능성이 높다.
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
              <div className="font-semibold text-zinc-950">Updated</div>
              <div>2026-07-13 KST</div>
              <div className="mt-2 text-xs text-zinc-500">
                Public market data and news scan. This is research context, not a trade instruction.
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <section className="space-y-4">
          <Panel title="핵심 결론" icon={<ShieldCheck className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-3">
              <SignalCard
                label="가장 깔끔한 Boston Dynamics 프록시"
                value="Hyundai Motor"
                detail="보스턴 다이나믹스는 비상장이다. 현대차가 가장 직접적인 상장 노출이지만, 자동차 실적 사이클이 함께 섞인다."
              />
              <SignalCard
                label="가장 강한 생태계 프록시"
                value="NVIDIA"
                detail="로봇 학습, 시뮬레이션, 엣지 추론, 개발자 생태계가 모두 연결된다. 다만 이미 AI 기대가 크다."
              />
              <SignalCard
                label="가장 높은 변동성"
                value="Korea robot pure plays"
                detail="두산로보틱스와 레인보우로보틱스는 테마 민감도가 높지만, 현재 숫자보다 기대가 앞선 구간이다."
              />
            </div>
          </Panel>

          <Panel title="상장 노출도 바스켓" icon={<LineChart className="h-4 w-4" />}>
            <div className="grid gap-3">
              {leaders.map((item) => (
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

          <Panel title="주가 변동 전망" icon={<Activity className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-3">
              {scenarios.map((scenario) => (
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

          <Panel title="다음에 뜰 가능성이 큰 영역" icon={<Zap className="h-4 w-4" />}>
            <div className="grid gap-3 md:grid-cols-2">
              <ThemeBlock
                icon={<Cpu className="h-5 w-5" />}
                title="Robot foundation model and simulation"
                body="휴머노이드는 데이터가 부족하다. 실제 로봇보다 먼저 시뮬레이션, 합성 데이터, 로봇 학습 프레임워크가 투자자 관심을 받을 가능성이 높다."
              />
              <ThemeBlock
                icon={<Factory className="h-5 w-5" />}
                title="Internal factory demand"
                body="초기 고객은 일반 소비자가 아니라 자체 공장이다. 현대차, Tesla, Amazon 같은 내부 수요자가 원가와 활용률을 증명해야 한다."
              />
              <ThemeBlock
                icon={<Building2 className="h-5 w-5" />}
                title="Actuator, reducer, sensor supply chain"
                body="휴머노이드가 대량 생산으로 넘어가면 부품 병목이 먼저 드러난다. 완성 로봇보다 핵심 부품사가 빠르게 재평가될 수 있다."
              />
              <ThemeBlock
                icon={<Bot className="h-5 w-5" />}
                title="Cobot to humanoid bridge"
                body="공장 자동화에 이미 들어간 협동로봇 업체가 휴머노이드보다 먼저 매출을 만든다. 두산로보틱스와 Teradyne/Universal Robots를 같이 봐야 한다."
              />
            </div>
          </Panel>
        </section>

        <aside className="space-y-4">
          <Panel title="Watchlist" icon={<Bot className="h-4 w-4" />}>
            <div className="space-y-2">
              {watchItems.map((item) => (
                <div key={item.label} className="rounded-md border border-zinc-200 bg-white p-3">
                  <div className="text-xs font-semibold uppercase text-zinc-500">{item.label}</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-950">{item.value}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Catalysts" icon={<Zap className="h-4 w-4" />}>
            <ul className="space-y-2 text-sm leading-6 text-zinc-600">
              {catalysts.map((item) => (
                <li key={item} className="rounded-md border border-zinc-200 bg-white p-3">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Risk" icon={<AlertTriangle className="h-4 w-4" />}>
            <div className="space-y-3 text-sm leading-6 text-zinc-600">
              <p>
                휴머노이드 로봇은 영상 데모와 실제 공장 ROI 사이의 거리가 크다. 고밸류 로봇주는 수주 공백,
                적자 지속, 대기업 일정 지연에 민감하다.
              </p>
              <p>
                현대차는 Boston Dynamics 기대가 붙더라도 본업은 자동차다. 환율, EV 경쟁, 관세, 노조, 자동차
                마진이 로봇 테마보다 주가를 더 크게 흔들 수 있다.
              </p>
            </div>
          </Panel>

          <Panel title="Sources" icon={<LinkIcon className="h-4 w-4" />}>
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
