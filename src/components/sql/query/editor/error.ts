export interface QueryError {
  message: string;
  line?: number;
  offset: number[];
}
