

/**
 * 
 */
export class FrontendComm
{
	constructor()
	{
	
	}

	public async sendToEndpoint(endpoint: string, data: unknown)
	{
		browser.runtime.sendMessage({endpoint, data});
	}
}