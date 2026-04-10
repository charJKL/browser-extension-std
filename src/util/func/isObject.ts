


export function isObject<S extends string, Y>(obj: unknown, prop: S, type: Y) : obj is { [Key in S]: Y }
{
	if(typeof obj === "undefined") return false;
	if(obj === null) return false;
	if(obj.hasOwnProperty(prop) === false) return false;
	

	// TODO implement type validation.

	return true;
}