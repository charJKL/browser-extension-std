import { isUndefined } from "@/util/func/isUndefined";
import { isNull } from "@/util/func/isNull";

export function hasProp<S extends string>(obj: unknown, prop: S) : obj is { [Key in S]: unknown }
{
	if(isUndefined(obj)) return false;
	if(isNull(obj)) return false;
	if(obj.hasOwnProperty(prop) === false) return false;

	return true;
}