// src/utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TrpcRouter } from '../server/trpc/router';

export const trpc = createTRPCReact<TrpcRouter>();

/**
 * These are helper types to infer the input and output of query resolvers
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<TRouteKey extends keyof TrpcRouter['_def']['queries']> = inferProcedureOutput<
  TrpcRouter['_def']['queries'][TRouteKey]
>;

export type inferQueryInput<TRouteKey extends keyof TrpcRouter['_def']['queries']> = inferProcedureInput<
  TrpcRouter['_def']['queries'][TRouteKey]
>;

export type inferMutationOutput<TRouteKey extends keyof TrpcRouter['_def']['mutations']> = inferProcedureOutput<
  TrpcRouter['_def']['mutations'][TRouteKey]
>;

export type inferMutationInput<TRouteKey extends keyof TrpcRouter['_def']['mutations']> = inferProcedureInput<
  TrpcRouter['_def']['mutations'][TRouteKey]
>;
