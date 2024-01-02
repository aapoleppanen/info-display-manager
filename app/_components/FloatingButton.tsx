import { ActionIcon } from "@mantine/core";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

const FloatingButton = ({ onClick, children }: Props) => (
  <ActionIcon
    radius="xl"
    size="xl"
    color="teal"
    aria-label="Action Button"
    style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
    onClick={onClick}
  >
    {children}
  </ActionIcon>
);

export default FloatingButton;
