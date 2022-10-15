import Prism from 'prismjs';
import styles from './prism.module.css';

import 'prismjs/components/prism-sql';

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
  error: styles.error,
};

Prism.hooks.add('wrap', (env) => {
  env.classes = env.classes.map((c) => prismClassMap[c] || c);
});

export default Prism;
