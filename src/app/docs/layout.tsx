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
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <SiteFooter />
    </>
  );
}
