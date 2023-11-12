import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import svgr from 'vite-plugin-svgr';
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

export default defineConfig({
	integrations: [tailwind(), react(), mdx(), icon({
		include: {
			ic: ["baseline-arrow-forward-ios"],
			mdi: ["circle", "pin"],
		},
	})],
	site: 'http://localhost:4321/',
	vite: {
		plugins: [
			svgr({}),
		],
		ssr: {
			noExternal: ['react-icons', 'date-fns'],
		},
	}
});