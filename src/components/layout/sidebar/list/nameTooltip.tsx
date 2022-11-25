import { MouseEvent, useState } from 'react';

let tooltipTimeout = 0;

export function useNameTooltip(offsetTop?: number) {
  const [tooltip, setTooltip] = useState<{
    value: string;
    target: HTMLDivElement;
    visible: boolean;
  }>();

  const NameTooltip = () => {
    if (!tooltip || !tooltip.visible) {
      return null;
    }

    return (
      <div
        className="pointer-events-none fixed top-0 left-[44px] bg-dbfy-border pr-2 text-xs font-medium leading-[1.9em]"
        style={{ top: tooltip.target.offsetTop - (offsetTop ? offsetTop : 0) + 'px' }}
      >
        {tooltip.value}
      </div>
    );
  };

  function onMouseEnter(event: MouseEvent<HTMLDivElement>, item: string) {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = 0;
    }

    if (!tooltip && !((event.target as HTMLDivElement).offsetWidth < (event.target as HTMLDivElement).scrollWidth)) {
      return;
    }

    if (tooltip) {
      setTooltip({
        value: item,
        target: event.target as HTMLDivElement,
        visible: (event.target as HTMLDivElement).offsetWidth < (event.target as HTMLDivElement).scrollWidth,
      });
      return;
    }

    tooltipTimeout = window.setTimeout(() => {
      tooltipTimeout = 0;
      setTooltip({
        value: item,
        target: event.target as HTMLDivElement,
        visible: (event.target as HTMLDivElement).offsetWidth < (event.target as HTMLDivElement).scrollWidth,
      });
    }, 300);
  }

  function onMouseLeave() {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }

    setTooltip(undefined);
  }

  return {
    NameTooltip,
    tooltip,
    onMouseEnter,
    onMouseLeave,
  };
}
