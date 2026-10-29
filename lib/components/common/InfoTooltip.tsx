import { Tooltip } from "radix-ui";

export default function InfoTooltip(props: {
    children: React.ReactNode;
    content: React.ReactNode;
}) {
    // Props
    const { children, content } = props;

    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>

            <Tooltip.Portal>
                <Tooltip.Content sideOffset={5}>
                    {content}
                    <Tooltip.Arrow />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
}
