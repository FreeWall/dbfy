import { Resizable } from 're-resizable';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import Database from './sidebar/database';
import Header from './sidebar/header';
import Server from './sidebar/server';
import Tables from './sidebar/tables';

export default function Sidebar() {
  const [size, setSize] = useLocalStorage('size', 240);

  return (
    <Resizable
      as="aside"
      className={'min-w-[240px] bg-[#2a2d2e]'}
      enable={{ right: true }}
      defaultSize={{ width: size as number, height: 'auto' }}
      size={{ width: size as number, height: 'auto' }}
      maxWidth={'50%'}
      grid={[10, 0]}
      onResizeStop={(event, direction, refToElement) => setSize(refToElement.offsetWidth)}
    >
      <Header />
      <Server />
      <Database />
      <Tables />
    </Resizable>
  );
}
