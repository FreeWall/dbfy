import { RangeSet, RangeSetBuilder } from '@codemirror/state';
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';

export const contentLinesPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = RangeSet.empty;
    }

    update(update: ViewUpdate) {
      const line = update.view.state.doc.line(3);

      const stripe = Decoration.line({
        attributes: { class: 'cm-lineError' },
      });

      const builder = new RangeSetBuilder<Decoration>();
      builder.add(line.from, line.from, stripe);

      this.decorations = builder.finish();
    }
  },
  {
    decorations: (v) => v.decorations,
  },
);
