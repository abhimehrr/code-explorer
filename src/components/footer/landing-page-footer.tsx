import Link from "next/link";
import { Sparkles } from "lucide-react";

// Footer for the landing page
export function LandingPageFooter() {
  return (
    <footer className="py-6 bg-accent/30 border-t">
      <div className="flex items-center flex-col">
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <span>Did you know</span>
          <Link
            href="https://abhi.shre.in"
            target="_blank"
            className="flex items-center gap-1 text-purple-500 hover:text-purple-600 transition-all"
          >
            <Sparkles className="size-3" />
            <span>Abhishek</span>
          </Link>
          <span>dug up this gem?</span>
        </p>
      </div>
    </footer>
  );
}
