import { Descendant, Element, Text } from 'slate';

export const processValue = (descendants: Descendant[]) => {
  let value = '';
  let lines = 0;

  for (const { children } of descendants as Element[]) {
    value += (children[0] as Text).text + '\n';
    lines++;
  }

  return { value, lines };
};

export const getDescendants = (query: string): Descendant[] => {
  const descendants: Descendant[] = [];

  for (const line of query.split('\n')) {
    descendants.push({
      children: [
        {
          text: line,
        },
      ],
    });
  }

  return descendants;
};
