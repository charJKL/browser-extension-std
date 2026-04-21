import { hasProp } from "@/util/func/hasProp";

type SupportedPropType = Array<ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor> | ObjectConstructor | StringConstructor | NumberConstructor | BooleanConstructor | string | number | boolean;
type PlainObject = { [Key in string]: SupportedPropType }

type ResolvePropType<T extends SupportedPropType> = T extends { (...value: unknown[]): infer R } ? R : T;
type ResovleObjectTypes<T extends PlainObject> = { [Key in keyof T]: ResolvePropType<T[Key]> }

/**
 * Check if object has prop.
 * Very useful function when comes to `unknown` type.
 */
export function isObject<B extends PlainObject>(obj: unknown, blueprint: B) : obj is ResovleObjectTypes<B>
{
	// TODO here is bug: isObject is valid of any object if blueprint is empty object.

	for(const prop in blueprint)
	{
		if(hasProp(obj, prop, blueprint[prop]) === false) return false;
	}
	return true;
}