import { getPageSession } from "@/auth/lucia";
import { Container, Paper, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <Container size="xs" p="lg">
      <Paper p="lg" shadow="xs">
        <Title order={2} mb="lg">
          Apartments
        </Title>
        <Stack>
          <Link href="/1">Kaartilaisenpolku 4 A</Link>
          <Link href="/2">Kaartilaisenpolku 4 B</Link>
        </Stack>
      </Paper>
    </Container>
  );
}
