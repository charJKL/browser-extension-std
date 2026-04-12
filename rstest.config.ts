import { defineConfig } from '@rstest/core';
import { withRslibConfig } from '@rstest/adapter-rslib';

export default defineConfig(
{
	extends: withRslibConfig(),
	include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
});