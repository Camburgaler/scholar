import { Tooltip } from "radix-ui";

type InfoTooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
};

function InfoTooltip({ children, content }: InfoTooltipProps) {
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
