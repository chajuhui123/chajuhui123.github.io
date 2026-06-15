import Link from "next/link";

import { SiteLayout } from "@/components/site-layout";

export default function NotFound() {
  return (
    <SiteLayout>
      <h1 className="text-pink">404: Not Found</h1>
      <p>
        페이지를 찾을 수 없습니다.{" "}
        <Link href="/" className="text-primary hover:underline">
          홈으로 돌아가기
        </Link>
      </p>
    </SiteLayout>
  );
}
