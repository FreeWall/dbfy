import { Resizable } from 're-resizable';

import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import Header from './sidebar/header';

export default function Sidebar() {
  const [size, setSize] = useLocalStorage('size', 240);

  return (
    <Resizable
      as="aside"
      className={'min-w-[240px] bg-dbfy-sidebar'}
      enable={{ right: true }}
      defaultSize={{ width: size as number, height: 'auto' }}
      size={{ width: size as number, height: 'auto' }}
      onResizeStop={(event, direction, refToElement) =>
        setSize(refToElement.offsetWidth)
      }
    >
      <Header />
    </Resizable>
  );
}
