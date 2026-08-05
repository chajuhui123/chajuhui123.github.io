import NextLink from "next/link";
import { Heading, Text } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-xl px-6 pb-20 pt-8 text-center">
      <Text variant="caption" className="tracking-[0.2em]">
        404
      </Text>
      <Heading level={4}>페이지를 찾을 수 없어요</Heading>
      <Text variant="body" className="max-w-sm text-gray-2">
        주소가 바뀌었거나 더 이상 존재하지 않는 페이지예요. <br />
        홈으로 돌아가 다른 글을 둘러보세요.
      </Text>
      <NextLink
        href="/"
        className="inline-flex items-center gap-1 text-xs text-gray-2 underline-offset-6 decoration-accent transition-colors mt-4 hover:text-text hover:underline"
      >
        홈으로
      </NextLink>
    </div>
  );
}
