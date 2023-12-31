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
                    Sign in
                </Title>
                <Form action="/api/login">
                    <TextInput
                        label="Username"
                        name="username"
                        id="username"
                        placeholder="Your username"
                        required
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        id="password"
                        placeholder="Your password"
                        required
                        mt="md"
                    />
                    <Group mt="md">
                        <Button type="submit">Log in</Button>
                    </Group>
                </Form>
            </Paper>
        </Container>
    );
};

export default Page;
