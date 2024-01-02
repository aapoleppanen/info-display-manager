import { getPageSession } from '@/auth/lucia';
import { Stack } from '@mantine/core';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getPageSession();
	if (!session) redirect("/login");

  return (
    <Stack>
      <Link href="/1">Apartment 1</Link>
      <Link href="/2">Apartment 2</Link>
      </Stack>
  );
}
