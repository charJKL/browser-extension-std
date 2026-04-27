import { Comm, EndpointDesc, ResolveNames, ResolveData, CorruptedPacketError } from "@/shared/Comm";
import { isError } from "@/util/func/isError";




/**
 * 
 */
export class FrontendComm<T extends EndpointDesc<T>>
{
	constructor()
	{
	
	}

	public async sendToEndpoint(endpoint: ResolveNames<T>, data: ResolveData<T>)
	{
		const packet = Comm.CreatePacket(endpoint, [data]);
		const response = await browser.runtime.sendMessage(packet);
		const result = Comm.ValidatePacket(response);
		if(isError(CorruptedPacketError, result))
		{
			console.log("Response from background script is corrupted.");
			return; // TODO what to do?
		}
		return result.data;
	}
}