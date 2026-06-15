import Link from "next/link";

type SiteLayoutProps = {
  children: React.ReactNode;
  isRootPath?: boolean;
};

export function SiteLayout({ children, isRootPath = false }: SiteLayoutProps) {
  return (
    <div>
      <Link href="/">
        <header className="mx-4 mb-24 mt-16 h-[250px] max-md:mx-6 max-md:mt-12" />
      </Link>
      <div
        className="mx-auto max-w-4xl px-5 py-10"
        data-is-root-path={isRootPath ? "true" : "false"}
      >
        <main>{children}</main>
        <footer className="pb-6 pt-24 text-center">
          © {new Date().getFullYear()}, Joy. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
