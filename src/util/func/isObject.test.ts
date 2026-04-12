import { test, expect } from "@rstest/core";
import { isObject } from "./isObject";

const data =
[
	{ object: {}, blueprint: {}, expected: true},
	{ object: {}, blueprint: {name: String}, expected: false},
	{ object: {name: "Joe", surname:"Doe", age: 23}, blueprint: {name: String}, expected: true},
	{ object: {name: "Joe", surname:"Doe", age: 23}, blueprint: {name: String, surname: String, age: Number}, expected: true},
	{ object: {name: "Joe", surname:"Doe", age: 23}, blueprint: {name: String, surname: String, age: 23}, expected: true},
	{ object: {name: "Joe", surname:"Doe", age: 23, cars: ["First", "Second"]}, blueprint: {name: String, surname: String, age: 23}, expected: true},
	{ object: {name: "Joe", surname:"Doe", age: 23, cars: ["First", "Second"]}, blueprint: {name: String, surname: String, age: 23, cars: Array(String)}, expected: true},
	{ object: {name: "Joe", surname:"Doe", age: 23, cars: []}, blueprint: {name: String, surname: String, age: 23, cars: Array(String)}, expected: true},
	{ object: {name: "Joe", surname:"Doe", age: 23, cars: [false]}, blueprint: {name: String, surname: String, age: 23, cars: Array(String)}, expected: false},
	{ object: {name: "Joe", surname:"Doe" }, blueprint: {name: String, surname: String, age: Number}, expected: false},
	{ object: {name: 21, surname:"Doe" }, blueprint: {name: String, surname: String, age: Number}, expected: false},
	{ object: {name: String, surname:"Doe", age: 23 }, blueprint: {name: String, surname: String, age: Number}, expected: false},
]
test.each(data)("Does `$object` match `$blueprint`?", function({object, blueprint, expected})
{
	expect(isObject(object, blueprint)).toBe(expected);
});