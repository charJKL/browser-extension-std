import {isObject} from "@/util/func/isObject";
import * as z from "zod"; 

type Keyof<T> = keyof T & string;

export type Data = { [Key: string]: Data } | Array<Data> | number | string | boolean;

export type EndpointDescName<T> = T extends `GET:${infer Y}` | `POST:${infer Y}` ? T : `WRONG_ENDPOINT_NAME:\`${T & string}\``;
export type EndpointDescFunc<T> = T extends (...args: infer A) => infer R ? A extends Data ? R extends Data ? T : "<NOT_SUPPORTED_RETURN>" : "<NOT_SUPPORTED_ARGS>" : T;
export type EndpointDesc<T> = { [Key in Keyof<T> as EndpointDescName<Key>]: EndpointDescFunc<T[Key]> };

export type ResolveNames<T extends EndpointDesc<unknown>> = Keyof<T>;
export type ResolveData<T> = unknown; // TODO implement this

export type Packet = { endpoint: string, data: Array<Data> };


const DataDesc : z.ZodType<Data> = z.lazy(() => z.union([z.record(z.string(), DataDesc), z.array(DataDesc), z.number(), z.string(), z.boolean()]))
const PayloadDesc = z.object({ endpoint: z.string(), data: z.array(DataDesc) });

/**
 *
 */
export class Comm
{
	public static ValidatePacket(payload: unknown) : Packet
	{
		const validatePayload = PayloadDesc.safeParse(payload); // TODO remove `Zod` library from dependencies.
		if(validatePayload.success === false) throw new Error("Payload is corrupted") 

		const endpoint = validatePayload.data.endpoint;
		const data = validatePayload.data.data;
		return { endpoint, data };
	}

	public static CreatePacket(endpoint: string, data: Array<unknown>) : Packet
	{
		const payload : unknown = { endpoint, data };
		const validatePayload = PayloadDesc.safeParse(payload);
		if(validatePayload.success === false) throw new Error("Data is not supported");

		return { endpoint: validatePayload.data.endpoint, data: validatePayload.data.data };
	}
}



