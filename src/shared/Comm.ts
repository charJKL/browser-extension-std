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

const dataz = z.object(
{
	endpoint: z.string(),
	get data() { return z.array(z.union([dataz, z.string(),z.number(), z.boolean()])) }
})



/**
 *
 */
export class Comm
{
	public static ValidatePacket(payload: unknown) : Packet
	{
		if(isObject(payload, {endpoint: String, data: Array(Object)}) == false ) throw new Error()
		
		const result = dataz.safeParse(payload);
		if(result.success == false) return;
		const x = result.data.


		const endpoint = payload.endpoint;
		const data = payload.data as unknown as Data[]; // TODO remove this casting
		return { endpoint, data };
	}

	public static CreatePacket(endpoint: string, data: unknown) : Packet
	{
		// TODO check if data is valid.
		const dataChecked = [data] as Data[]; // TODO remove this casting
		return { endpoint, data: dataChecked };
	}
}



