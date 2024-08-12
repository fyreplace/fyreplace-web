import { ResponseError } from '../generated';

export function fail(status: number): never {
	throw new ResponseError(new Response(null, { status }));
}
