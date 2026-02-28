import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocsSidebar } from "./DocsSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { Github, Droplets } from "lucide-react";

export function DocsLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DocsSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 glass-1 sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="mr-1" />
              <Link to="/" className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors">
                <Droplets className="h-5 w-5 text-primary" />
                <span className="hidden sm:inline">Liquid Glass UI</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4 text-muted-foreground" />
              </a>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto px-6 py-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
