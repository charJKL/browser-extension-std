import { test, expect } from "@rstest/core";
import { isObject } from "./isObject";

const data =
[
	{ object: {}, prop: "fruits", type: undefined, expected: false },
	{ object: { fruit: "", healthy: true}, prop: "healthy", type: undefined, expected: false },
	{ object: { fruit: "", healthy: true}, prop: "healthy", type: Boolean, expected: true },
	{ object: { fruit: "", healthy: true}, prop: "healthy", type: true, expected: true },
	{ object: { fruit: "", healthy: true}, prop: "healthy", type: false, expected: false },
	{ object: { fruits: "", count: 7}, prop: "count", type: undefined, expected: false },
	{ object: { fruits: "", count: 7}, prop: "count", type: Number, expected: true },
	{ object: { fruits: "", count: 7}, prop: "count", type: 7, expected: true },
	{ object: { fruits: "", count: 7}, prop: "count", type: 2, expected: false },
	{ object: { fruits: "", count: "7"}, prop: "count", type: 1, expected: false },
	{ object: { fruit: "apple" }, prop: "fruit", type: undefined, expected: false },
	{ object: { fruit: "apple" }, prop: "fruit", type: String, expected: true },
	{ object: { fruit: "apple" }, prop: "fruit", type: "apple", expected: true },
	{ object: { fruit: "apple" }, prop: "fruit", type: "orange", expected: false }
]
test.each(data)("Does $object has `$prop` property, and it's type is `$type`?", function({object, prop, type, expected})
{
	expect(isObject(object, prop, type)).toBe(expected);
});