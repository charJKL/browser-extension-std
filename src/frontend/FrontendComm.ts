import { Comm, EndpointDesc, ResolveNames, ResolveData } from "@/shared/Comm";




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
		const packet = Comm.CreatePacket(endpoint, data);
		const response = await browser.runtime.sendMessage(packet);
		const result = Comm.ValidatePacket(response);
		return result.data;
	}
}