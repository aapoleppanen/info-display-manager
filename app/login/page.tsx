import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import { Container, TextInput, PasswordInput, Button, Title, Paper, Group } from '@mantine/core';
import Form from "../_components/form";

const Page = async () => {
    const session = await getPageSession();
    if (session) redirect("/");
    return (
        <Container size="xs" p="lg">
            <Paper p="lg" shadow="xs">
                <Title order={2} m="lg">
                    Kirjaudu sisään
                </Title>
                <Form action="/api/login">
                    <TextInput
                        label="Käyttäjä"
                        name="username"
                        id="username"
                        placeholder="Sinun käyttäjänimi"
                        required
                    />
                    <PasswordInput
                        label="Salasana"
                        name="password"
                        id="password"
                        placeholder="Salasanasi"
                        required
                        mt="md"
                    />
                    <Group mt="md">
                        <Button type="submit">Kirjaudu</Button>
                    </Group>
                </Form>
            </Paper>
        </Container>
    );
};

export default Page;
