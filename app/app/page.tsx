import {
  Activity,
  ArrowUpRight,
  Bot,
  Cable,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Total Conversations",
    value: "12,847",
    trend: "+12.4% vs last week",
    icon: MessageSquare,
  },
  {
    title: "Active Flows",
    value: "8",
    trend: "+2 new this month",
    icon: Activity,
  },
  {
    title: "Connected Channels",
    value: "12",
    trend: "+3 integrations live",
    icon: Cable,
  },
  {
    title: "AI Agents",
    value: "24",
    trend: "+6 published today",
    icon: Bot,
  },
];

const recentActivity = [
  {
    event: "Checkout recovery flow triggered",
    channel: "WhatsApp",
    customer: "A. Walker",
    status: "Completed",
    time: "2 minutes ago",
  },
  {
    event: "Retail FAQ agent answered shipping query",
    channel: "Web",
    customer: "Anonymous visitor",
    status: "Resolved",
    time: "11 minutes ago",
  },
  {
    event: "Mortgage statement added to Kelvin",
    channel: "AI Workbench",
    customer: "Training dataset",
    status: "Queued",
    time: "28 minutes ago",
  },
  {
    event: "New Facebook channel synced",
    channel: "Facebook",
    customer: "Codeseek test page",
    status: "Connected",
    time: "1 hour ago",
  },
  {
    event: "Lead generation agent published",
    channel: "AI Agents",
    customer: "Retail vertical",
    status: "Published",
    time: "Today, 09:42",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-2">
        <p className="text-sm font-medium text-[#2F8FFF]">Welcome back, Catherine</p>
        <div>
          <h1 className="text-3xl font-semibold text-[#3B4760]">Home</h1>
          <p className="mt-2 max-w-3xl text-sm text-[#6A738A]">
            Track performance across your conversational AI estate, monitor adoption,
            and stay on top of live activity from every connected channel.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, trend, icon: Icon }) => (
          <div
            key={title}
            className="rounded-lg border border-[#E8F0FB] bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#6A738A]">{title}</p>
                <p className="mt-4 text-3xl font-semibold text-[#3B4760]">{value}</p>
              </div>
              <div className="rounded-lg bg-[#E8F0FB] p-3 text-[#2F8FFF]">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#2F8FFF]">
              <ArrowUpRight className="h-4 w-4" />
              <span>{trend}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-[#E8F0FB] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E8F0FB] px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-[#3B4760]">Recent Activity</h2>
              <p className="mt-1 text-sm text-[#6A738A]">
                Real-time conversation and platform events from the last 24 hours.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#E8F0FB] px-3 py-1 text-xs font-semibold text-[#2F8FFF]">
              <Sparkles className="h-3.5 w-3.5" />
              Live feed
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F6F8FA] text-[#6A738A]">
                <tr>
                  <th className="px-6 py-3 font-medium">Event</th>
                  <th className="px-6 py-3 font-medium">Channel</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item) => (
                  <tr key={`${item.event}-${item.time}`} className="border-t border-[#E8F0FB]">
                    <td className="px-6 py-4 font-medium text-[#3B4760]">{item.event}</td>
                    <td className="px-6 py-4 text-[#6A738A]">{item.channel}</td>
                    <td className="px-6 py-4 text-[#6A738A]">{item.customer}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-[#E8F0FB] px-2.5 py-1 text-xs font-semibold text-[#2F8FFF]">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#94A3B8]">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-[#E8F0FB] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#3B4760]">Platform Snapshot</h2>
          <div className="mt-6 space-y-4">
            {[
              ["Automation success rate", "96.8%"],
              ["Average response time", "1.4 sec"],
              ["CSAT from live journeys", "4.7 / 5"],
              ["Escalations to human", "8.2%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg border border-[#E8F0FB] bg-[#F6F8FA] px-4 py-3"
              >
                <span className="text-sm text-[#6A738A]">{label}</span>
                <span className="text-sm font-semibold text-[#3B4760]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
