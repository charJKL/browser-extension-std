import { Comm, EndpointDesc, ResolveNames } from "@/shared/Comm";

export type MessageSender = browser.runtime.MessageSender;
export type SendResponse = (response?: unknown) => void;

type Listener = (...args: unknown[]) => unknown; // TODO change this type

/**
 *
 */
export class BackendComm<T extends EndpointDesc<T>>
{
	private readonly $listeners: Map<string, Listener>; 

	public constructor()
	{
		this.$listeners = new Map(); // TODO this should be multimap

		browser.runtime.onMessage.addListener(this.invokeAssignedListeners.bind(this));
	}

	public addEndpointListener(endpoint: ResolveNames<T>, listener: Listener)
	{
		this.$listeners.set(endpoint, listener);
	}

	private invokeAssignedListeners(payload: unknown, sender: MessageSender, sendResponse: SendResponse) : boolean
	{
		console.log("BackednComm::invokeAssignedListeners", payload, sender); // TODO remove this log
		(async function(this: BackendComm<T>){
			const packet = Comm.ValidatePacket(payload);
			const listener = this.$listeners.get(packet.endpoint);
			if(listener === undefined) throw new Error("Listener for this endpoint is not set.");
			const result = await listener.call(undefined, ...(packet.data));
			const response = Comm.CreatePacket(packet.endpoint, result);
			sendResponse(response);
		}).call(this);
		return true; // indicate that result will be async.
	}
}
