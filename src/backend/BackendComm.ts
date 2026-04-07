import "firefox-webext-browser"; // TODO why I need import this only in one file?

export type MessageSender = browser.runtime.MessageSender;
export type SendResponse = (response?: unknown) => void;

type Listener = () => unknown;
type Data = any;
type Keyof<T> = keyof T & string;


type EndpointDescName<T> = T extends `GET:${infer Y}` | `POST:${infer Y}` ? T : `WRONG_ENDPOINT_NAME:\`${T & string}\``;
type EndpointDescFunc<T> = T extends (...args: infer A) => infer R ? A extends Data ? R extends Data ? T : "<NOT_SUPPORTED_RETURN>" : "<NOT_SUPPORTED_ARGS>" : T;
type EndpointDesc<T> = { [Key in Keyof<T> as EndpointDescName<Key>]: EndpointDescFunc<T[Key]> };

type ResolveNames<T extends EndpointDesc<unknown>> = Keyof<T>;

/**
 *
 */
export class BackendComm<T extends EndpointDesc<T>>
{
	private readonly $listeners: Map<ResolveNames<T>, Listener>; 

	public constructor()
	{
		this.$listeners = new Map();

		browser.runtime.onMessage.addListener(this.invokeAssignedListeners.bind(this));
	}

	public addEndpointListener(endpoint: ResolveNames<T>, listener: Listener)
	{
		this.$listeners.set(endpoint, listener);
	}

	private invokeAssignedListeners(payload: unknown, sender: MessageSender, sendResponse: SendResponse) : boolean
	{
		console.log("BackednComm::invokeAssignedListeners", payload, sender); // TODO implement this
		return true; // indicate that result will be async.
	}
}
