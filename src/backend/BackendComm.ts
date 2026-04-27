import { Comm, EndpointDesc, ResolveNames } from "@/shared/Comm";
import { isError } from "@/util/func/isError";

import { CorruptedPacketError, DataIsNotSupported } from "@/shared/Comm";

export type MessageSender = browser.runtime.MessageSender;
export type SendResponse = (response?: unknown) => void;

class UnsafeValue { };
export type Unsafe<T> = T | UnsafeValue;
type AllowBeAsync<T> = T | Promise<T>;
type BackendListenerArgs<T extends Array<unknown>> = { [Key in keyof T]: Unsafe<T[Key]> };
type BackendListener<T> = T extends (...args: infer A) => infer R ? (...args: BackendListenerArgs<A>) => AllowBeAsync<R> : never;

type Listener = (...args: unknown[]) => unknown; // TODO change this type

/**
 *
 */
export class BackendComm<D extends EndpointDesc<D>>
{
	private readonly $listeners: Map<string, Listener>; // TODO should we be more restrict on `Listener` type?

	public constructor()
	{
		this.$listeners = new Map();

		browser.runtime.onMessage.addListener(this.invokeAssignedListeners.bind(this));
	}

	public addEndpointListener<E extends ResolveNames<D>>(endpoint: E, listener: BackendListener<D[E]>)
	{
		this.$listeners.set(endpoint, listener);
	}

	private invokeAssignedListeners(payload: unknown, sender: MessageSender, sendResponse: SendResponse) : boolean
	{
		console.log("BackednComm::invokeAssignedListeners", payload, sender); // TODO remove this log
		(async function(this: BackendComm<D>){
			const packet = Comm.ValidatePacket(payload);
			if(isError(CorruptedPacketError, packet)) 
			{
				console.log("Recevided packet is corrupted", payload);
				return false; // TODO what to return here?
			}
			const listener = this.$listeners.get(packet.endpoint);
			if(listener === undefined) throw new Error("Listener for this endpoint is not set.");
			const result = await listener.call(undefined, ...(packet.data));
			const response = Comm.CreatePacket(packet.endpoint, [result]);
			if(isError(DataIsNotSupported, response))
			{
				console.log("Response data is not supported", result);
				return false; // TODO what to return here?
			}
			sendResponse(response);
		}).call(this);
		return true; // indicate that result will be async.
	}
}