export interface SqlQueryError {
  message: string;
  line?: number;
}

export interface SqlQuery {
  value: string;
  elapsedMs?: number;
  errors?: SqlQueryError[];
}
