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
import { ChipDemo } from "@/components/ui/chip-demo";
import { Link } from "@/components/ui/link";
import { List, ListItem } from "@/components/ui/list";
import { Blockquote } from "@/components/ui/blockquote";
import { Divider } from "@/components/ui/divider";
import { Image } from "@/components/ui/image";

export default function Home() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-16 rounded-xl bg-surface px-6 pb-20 pt-10">
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
          <Text variant="body">
            <strong>굵게</strong>, <em>기울임</em>, <del>취소선</del>도 본문
            안에서 그대로 사용할 수 있습니다.
          </Text>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Link</Heading>
        <Text variant="body">
          본문 속 링크는 이렇게{" "}
          <Link href="https://nextjs.org" target="_blank" rel="noreferrer">
            굵은 글씨와 이동 아이콘
          </Link>
          으로 표시되고, 마우스를 올리면 텍스트와 아이콘이 코랄 톤으로 바뀝니다.
        </Text>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>List</Heading>
        <div className="flex flex-col gap-4">
          <List>
            <ListItem>순서 없는 목록의 불릿은 회색 계열입니다.</ListItem>
            <ListItem>본문 텍스트와 동일한 색상을 사용합니다.</ListItem>
            <ListItem>중첩도 자연스럽게 들여쓰기됩니다.</ListItem>
          </List>
          <List as="ol">
            <ListItem>순서 있는 목록은 숫자도 회색으로 표시됩니다.</ListItem>
            <ListItem>두 번째 항목입니다.</ListItem>
            <ListItem>세 번째 항목입니다.</ListItem>
          </List>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Blockquote</Heading>
        <Blockquote>
          인용문은 왼쪽 보더와{" "}
          <Link href="https://nextjs.org" target="_blank" rel="noreferrer">
            회색 텍스트
          </Link>
          로 <InlineCode>본문</InlineCode>과 구분됩니다.
        </Blockquote>
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
            surface·gray-1 토큰을 사용한 기본 카드 컴포넌트입니다.
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
        <Heading level={2}>Chip</Heading>
        <Text variant="body">
          on/off 토글되는 필터 칩입니다. 활성화되면 검정 배경과 X 아이콘이
          붙습니다.
        </Text>
        <ChipDemo />
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
              <TableCell className="font-medium text-text">
                background
              </TableCell>
              <TableCell>#fffbfa</TableCell>
              <TableCell>#0d0d0d</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">surface</TableCell>
              <TableCell>#ffffff</TableCell>
              <TableCell>#0d0d0d</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">text</TableCell>
              <TableCell>#1a1a1a</TableCell>
              <TableCell>#f2f2f2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">gray-1</TableCell>
              <TableCell>#ededed</TableCell>
              <TableCell>#262626</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">gray-2</TableCell>
              <TableCell>#a3a3a3</TableCell>
              <TableCell>#a3a3a3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">accent</TableCell>
              <TableCell>#ff6b47</TableCell>
              <TableCell>#e08a6b</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">
                accent-text
              </TableCell>
              <TableCell>#c2410c</TableCell>
              <TableCell>#f2a488</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">
                accent-bg
              </TableCell>
              <TableCell>#fff1ec</TableCell>
              <TableCell>#2e1810</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">code-bg</TableCell>
              <TableCell>#f5ece7</TableCell>
              <TableCell>#332420</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-text">
                code-text
              </TableCell>
              <TableCell>#c2410c</TableCell>
              <TableCell>#f2a488</TableCell>
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

      <section className="flex flex-col gap-6">
        <Heading level={2}>Divider</Heading>
        <Text variant="body">구분선(---)은 옅은 회색 보더로 표시됩니다.</Text>
        <Divider />
      </section>

      <section className="flex flex-col gap-6">
        <Heading level={2}>Image</Heading>
        <Text variant="body">
          마크다운 이미지는 둥근 모서리와 얇은 보더가 적용됩니다.
        </Text>
        <Image src="/globe.svg" alt="예시 이미지" width={640} height={360} />
      </section>
    </div>
  );
}
