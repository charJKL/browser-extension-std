/**
 * Only those types are supported.
 */
type SupportedPropType = StringConstructor | NumberConstructor | BooleanConstructor | string | number | boolean | undefined;

/**
 * Helper type.
 */
type ResolvePropType<T extends SupportedPropType> = T extends { new (value?: unknown): infer R } ? R : T;

/**
 * Check if object has prop.
 * Very useful function when comes to `unknown` type.
 */
export function isObject<S extends string, Y extends SupportedPropType>(obj: unknown, prop: S, type: Y) : obj is { [Key in S]: ResolvePropType<Y> }
{
	if(typeof obj === "undefined") return false;
	if(obj === null) return false;
	if(obj.hasOwnProperty(prop) === false) return false;
	if(doesTypesMatch(type, obj[prop]) === false) return false;
	return true;
}

function doesTypesMatch(type: SupportedPropType, value: unknown) : boolean
{
	if(type === undefined)
	{
		return type === value;
	}
	if(type === String)
	{
		return typeof value === "string";
	}
	if(type === Number)
	{
		return typeof value === "number";
	}
	if(type === Boolean)
	{
		return typeof value === "boolean";
	}
	if(typeof type === "string")
	{
		return type === value;
	}
	if(typeof type === "number")
	{
		return type === value;
	}
	if(typeof type === "boolean")
	{
		return type === value;
	}
	return false;
}
