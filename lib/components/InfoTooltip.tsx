import { Tooltip } from "radix-ui";
import { JSX } from "react/jsx-runtime";

export default function InfoTooltip(props: {
    children: React.ReactNode;
    content: React.ReactNode;
}): JSX.Element {
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
