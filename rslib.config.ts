import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig(
{
	plugins: [pluginReact()],
	source: 
	{
		tsconfigPath: "./tsconfig.json",
		entry: 
		{
			index: ['./src/**'],
		},
	},
	lib: 
	[
		{ bundle: false, dts: true, format: 'esm' },
	],
	output: 
	{
		cleanDistPath: true,
		distPath: "./build/",
		target: 'web',
	},
});
