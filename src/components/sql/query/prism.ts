import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

import styles from './prism.module.css';

export const prismClassMap: { [key: string]: string | undefined } = {
  token: styles.token,
  comment: styles.comment,
  variable: styles.variable,
  string: styles.string,
  identifier: styles.identifier,
  punctuation: styles.punctuation,
  function: styles.function,
  keyword: styles.keyword,
  boolean: styles.boolean,
  number: styles.number,
  operator: styles.operator,
};

Prism.hooks.add('wrap', (env) => {
  env.classes = env.classes.map((c) => prismClassMap[c] || c);
});

export default Prism;
