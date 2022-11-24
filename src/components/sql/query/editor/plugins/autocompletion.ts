import { autocompletion, CompletionContext } from '@codemirror/autocomplete';

export const autocompletionPlugin = autocompletion({
  icons: false,
  activateOnTyping: true,
  maxRenderedOptions: 1000,
  addToOptions: [
    {
      render(completion, state) {
        if (typeof completion.type === undefined) {
          return null;
        }

        const element = document.createElement('span');
        element.className = 'cm-type';
        element.innerText = completion.type as string;
        return element;
      },
      position: 90,
    },
  ],
  optionClass(completion) {
    return 'cm-type-' + completion.type;
  },
  //override: [myCompletions],
});

function myCompletions(context: CompletionContext) {
  const word = context.matchBefore(/\w*/);
  if (!word || (word.from == word.to && !context.explicit)) return null;
  return {
    from: word.from,
    options: [
      { label: 'match', type: 'keyword' },
      { label: 'hello', type: 'variable', info: '(World)' },
      { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
    ],
  };
}
