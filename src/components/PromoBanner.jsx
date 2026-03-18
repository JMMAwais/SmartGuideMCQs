import { Link } from "react-router-dom";
import { FileText, Youtube, ClipboardList } from "lucide-react";

const banners = [
  {
    id: 1,
    Icon: FileText,
    label: "Past Papers",
    text: "Download FREE Past Papers for all subjects!",
    link: "/past-papers",
    external: false,
    bg: "bg-blue-600",
  },
  {
    id: 2,
    Icon: Youtube,
    label: "YouTube",
    text: "Watch FREE video lectures on our YouTube channel!",
    link: "https://youtube.com/@mcqprep",
    external: true,
    bg: "bg-red-600",
  },
  {
    id: 3,
    Icon: ClipboardList,
    label: "Online Test",
    text: "Take FREE online tests and check your preparation!",
    link: "/online-test",
    external: false,
    bg: "bg-green-600",
  },
];

function BannerContent({ banner }) {
  return (
    <>
      <span className="shrink-0">
        <banner.Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <span className="block text-xs font-bold uppercase tracking-wide opacity-80">
          {banner.label}
        </span>
        <span className="block truncate text-sm font-medium">
          {banner.text}
        </span>
      </div>
    </>
  );
}

function PromoBanner() {
  return (
    <div className="w-full border-b border-border bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">

          {banners.map((banner) =>
            banner.external ? (
              <a
                key={banner.id}
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-1 items-center gap-3 rounded-lg px-4 py-3 text-white transition-opacity hover:opacity-90 ${banner.bg}`}
              >
                <BannerContent banner={banner} />
              </a>
            ) : (
              <Link
                key={banner.id}
                to={banner.link}
                className={`flex flex-1 items-center gap-3 rounded-lg px-4 py-3 text-white transition-opacity hover:opacity-90 ${banner.bg}`}
              >
                <BannerContent banner={banner} />
              </Link>
            )
          )}

        </div>
      </div>
    </div>
  );
}

export default PromoBanner;