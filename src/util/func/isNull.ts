/**
 *
 */
export function isNull(value: unknown) : value is null
{
	if(typeof value === "object" && value === null) return true;
	return false;
}