import { Store } from "lucide-react";
import { useState } from "react";

export default function SiteLogo({
  src,
  className,
}: {
  src: string | null;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center ${className ?? ""}`}
      >
        <Store className="h-4 w-4" strokeWidth={1.75} />
      </span>
    );
  }
  return (
    <img
      src={src}
      className={`shrink-0 rounded-lg bg-white object-cover ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
