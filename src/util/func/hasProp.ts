import { isUndefined } from "@/util/func/isUndefined";
import { isNull } from "@/util/func/isNull";
import { isArray } from "@/util/func/isArray";

type SupportedPropType = Array<ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor> | ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor | string | number | boolean;
type ResolvePropType<T extends SupportedPropType> = T extends { (...value: unknown[]): infer R } ? R : T;

export function hasProp<S extends string, T extends SupportedPropType>(obj: unknown, prop: S, type?: T) : obj is { [Key in S]: ResolvePropType<T> }
{
	const hasOwnProperty = (obj: {}, prop: S) : obj is { [Key in S]: unknown } => obj.hasOwnProperty(prop);
	if(isUndefined(obj)) return false;
	if(isNull(obj)) return false;
	if(hasOwnProperty(obj, prop) === false) return false;
	if(isUndefined(type) === false && doesTypesMatch(type, obj[prop]) === false) return false;

	return true;
}

function doesTypesMatch(type: SupportedPropType, value: unknown) : boolean
{
	if(type === undefined)
	{
		return typeof value === "undefined";
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
	if(isArray(type) && isArray(value))
	{
		if(type.length !== 1) return false; // array passed as type must be length of 1.
		if(value.length === 0) return true;
		return value.map(value => doesTypesMatch(type[0], value)).every(value => value === true);
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