export interface QueryError {
  message: string;
  line?: number;
  offset: {
    start: number;
    end: number;
  };
}
