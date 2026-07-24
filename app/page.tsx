import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { InlineCode, CodeBlock } from "@/components/ui/code";

export default function Home() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-16 rounded-3xl bg-background px-6 pb-20 pt-10">
      <section className="flex flex-col gap-4">
        <Text variant="caption" as="span">
          Design System
        </Text>
        <Heading level={1}>디자인 시스템</Heading>
        <Text variant="lead">
          토큰(색상·타이포)을 기반으로 만든 기본 컴포넌트들을 확인하는
          페이지입니다.
        </Text>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Typography</Heading>
        <div className="flex flex-col gap-4">
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Text variant="lead">
            Lead 문단은 본문보다 살짝 크게, 글 도입부에 사용합니다.
          </Text>
          <Text variant="body">
            Body 텍스트는 블로그 본문에 쓰이는 기본 크기입니다. Pretendard의
            넉넉한 줄간격으로 한글 가독성을 확보했습니다.
          </Text>
          <Text variant="small">Small 텍스트는 보조 UI에 사용합니다.</Text>
          <Text variant="caption">Caption은 날짜·태그 같은 메타 정보용.</Text>
          <Text variant="tiny">Tiny는 라벨이나 아주 작은 보조 텍스트용.</Text>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Buttons</Heading>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Card</Heading>
        <Card>
          <CardHeader>
            <Heading level={3}>카드 제목</Heading>
            <Text variant="caption">2026.07.24</Text>
          </CardHeader>
          <Text variant="body">
            surface·border 토큰을 사용한 기본 카드 컴포넌트입니다.
          </Text>
          <CardFooter>
            <Button size="sm">더 보기</Button>
            <Button size="sm" variant="ghost">
              닫기
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Table</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>토큰</TableHead>
              <TableHead>Light</TableHead>
              <TableHead>Dark</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-foreground">
                background
              </TableCell>
              <TableCell>white</TableCell>
              <TableCell>zinc-950</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">
                foreground
              </TableCell>
              <TableCell>zinc-900</TableCell>
              <TableCell>zinc-50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">
                border
              </TableCell>
              <TableCell>zinc-200</TableCell>
              <TableCell>zinc-800</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Code</Heading>
        <Text variant="body">
          인라인 코드는 이렇게 <InlineCode>pnpm build</InlineCode> 문장 속에
          씁니다.
        </Text>
        <CodeBlock
          lang="tsx"
          code={`export function Button({ variant, size, ...props }: ButtonProps) {
  return <button className={buttonStyles({ variant, size })} {...props} />;
}`}
        />
      </section>
    </div>
  );
}
