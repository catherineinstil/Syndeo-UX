import {
  Bot,
  MessageCircle,
  MessagesSquare,
  Monitor,
  Phone,
  Send,
  Smartphone,
  Webhook,
} from "lucide-react";

const channels = [
  { type: "Widgets > Desktop", name: "desktop production", idLabel: "Bot Id", value: "780769152729088", icon: Monitor },
  { type: "DialogFlow CX", name: "DFCX Production Cha...", idLabel: "Bot Id", value: "d4358055-259b-42...", icon: Bot },
  { type: "Facebook", name: "Codeseek test page", idLabel: "Bot Id", value: "115580038066282", icon: MessageCircle },
  { type: "Line", name: "Line channel", idLabel: "Bot Id", value: "Ufadec39888653ff2...", icon: MessagesSquare },
  { type: "Mobile", name: "mobile production ch...", idLabel: "Bot Id", value: "338831446376448", icon: Smartphone },
  { type: "Slack", name: "Slack Channel", idLabel: "Bot Id", value: "A06SAH90URM", icon: MessagesSquare },
  { type: "SMS", name: "SMS Production Cha...", idLabel: "Phone", value: "+447361582408", icon: Phone },
  { type: "Telegram", name: "Telegram Production...", idLabel: "Bot Id", value: "8576692908:AAGY4...", icon: Send },
  { type: "Voice", name: "Voice production cha...", idLabel: "Bot Id", value: "128478032691200", icon: Phone },
  { type: "Web", name: "web production uk", idLabel: "Bot Id", value: "WEB-829104-UK", icon: Webhook },
  { type: "Web", name: "web lead gen", idLabel: "Bot Id", value: "WEB-829105-LG", icon: Webhook },
  { type: "Web", name: "web mortgage faq", idLabel: "Bot Id", value: "WEB-829106-MF", icon: Webhook },
  { type: "Web", name: "web support portal", idLabel: "Bot Id", value: "WEB-829107-SP", icon: Webhook },
  { type: "Web", name: "web sandbox channel", idLabel: "Bot Id", value: "WEB-829108-SB", icon: Webhook },
  { type: "WhatsApp", name: "WhatsApp Productio...", idLabel: "Bot Id", value: "+447488892962", icon: MessageCircle },
];

export default function ChannelsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#3B4760]">Your Channels</h1>
          <p className="mt-2 text-sm text-[#6A738A]">
            Manage every test and production endpoint connected to your Syndeo estate.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-[#2F8FFF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E7FEF]">
            Add Test Channel
          </button>
          <button className="rounded-lg bg-[#2F8FFF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E7FEF]">
            Add Production Channel
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {channels.map(({ type, name, idLabel, value, icon: Icon }) => (
          <div
            key={`${type}-${name}`}
            className="rounded-lg border border-[#E8F0FB] bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E8F0FB] text-[#2F8FFF]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#3B4760]">{type}</p>
                  <p className="mt-1 text-xs text-[#94A3B8]">Connected channel</p>
                </div>
              </div>
              <span className="rounded-full bg-[#F6F8FA] px-2.5 py-1 text-xs font-medium text-[#6A738A]">
                Live
              </span>
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <p className="text-[#3B4760]">
                <span className="font-medium">Name:</span>{" "}
                <span className="text-[#6A738A]">{name}</span>
              </p>
              <p className="text-[#3B4760]">
                <span className="font-medium">{idLabel}:</span>{" "}
                <span className="text-[#6A738A]">{value}</span>
              </p>
            </div>

            <button className="mt-6 inline-flex rounded-lg border border-[#E8F0FB] px-4 py-2.5 text-sm font-semibold text-[#3B4760] transition hover:bg-[#F6F8FA]">
              Delete Channel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
