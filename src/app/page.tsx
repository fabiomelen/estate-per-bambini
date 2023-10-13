import Link from "next/link";
import Card from "@/components/card";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card title="Demo" cta={{ href: "/landing", label: "landing page" }}>
        Working example how to integrate the mds-bd login services in landing &
        contest pages.
      </Card>
      <Card title="Docs" cta={{ href: "/docs", prefetch: false }}>
        Flow and services documentation.
      </Card>
    </div>
  );
}
