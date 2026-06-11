import { SiteHeader } from "../../components/site/site-header";
import { SiteFooter } from "../../components/site/site-footer";
import { DocsSidebar } from "../../components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[88rem] gap-10 px-6 py-12 lg:px-10">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-2">
            <DocsSidebar />
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          {/* Navigation docs sur mobile/tablette (l'aside est masquée < lg). */}
          <details className="glass mb-8 rounded-2xl lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
              <span>Sommaire de la documentation</span>
              <span className="text-muted">▾</span>
            </summary>
            <div className="border-t border-border px-2 pb-3 pt-2">
              <DocsSidebar />
            </div>
          </details>
          {children}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
