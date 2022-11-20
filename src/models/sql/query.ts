export interface SqlQueryError {
  message: string;
  line?: number;
}

export interface SqlQuery {
  value: string;
  timing?: number;
  errors?: SqlQueryError[];
}
