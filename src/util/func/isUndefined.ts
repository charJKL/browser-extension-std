
/** 
 *
 */
export function isUndefined<T>(value: T | undefined) : value is undefined
{
	if(typeof value === "undefined") return true;
	return false;
}
