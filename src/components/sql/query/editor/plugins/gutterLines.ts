import { gutter, GutterMarker } from '@codemirror/view';

export const gutterLinesPlugin = gutter({
  lineMarker(view, line) {
    const marker = new (class extends GutterMarker {
      private error = false;
      public number = 0;

      constructor(number: number) {
        super();
        this.number = number;
      }

      setError(error: boolean) {
        this.error = error;
      }

      toDOM() {
        return document.createTextNode('' + this.number);
      }
    })(view.state.doc.lineAt(line.from).number);

    if (marker.number == 3) {
      marker.elementClass = 'cm-gutterElementError';
    }

    return marker;
  },
});
