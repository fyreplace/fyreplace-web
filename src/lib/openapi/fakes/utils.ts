import { ResponseError, type ExplainedFailure, type ViolationReport } from '../generated';

export function fail(status: number, body?: ViolationReport | ExplainedFailure): never {
	throw new ResponseError(new Response(body ? JSON.stringify(body) : null, { status }));
}
