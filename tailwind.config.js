/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Fira Mono", "monospace"],
            },
            colors: {
                base: "rgb(var(--theme-base) / <alpha-value>)",
                surface: "rgb(var(--theme-surface) / <alpha-value>)",
                overlay: "rgb(var(--theme-overlay) / <alpha-value>)",
                muted: "rgb(var(--theme-muted) / <alpha-value>)",
                subtle: "rgb(var(--theme-subtle) / <alpha-value>)",
                text: "rgb(var(--theme-text) / <alpha-value>)",
                love: "rgb(var(--theme-love) / <alpha-value>)",
                gold: "rgb(var(--theme-gold) / <alpha-value>)",
                rose: "rgb(var(--theme-rose) / <alpha-value>)",
                pine: "rgb(var(--theme-pine) / <alpha-value>)",
                foam: "rgb(var(--theme-foam) / <alpha-value>)",
                iris: "rgb(var(--theme-iris) / <alpha-value>)",
                highlightLow: "rgb(var(--theme-highlightLow) / <alpha-value>)",
                highlightMed: "rgb(var(--theme-highlightMed) / <alpha-value>)",
                highlightHigh: "rgb(var(--theme-highlightHigh) / <alpha-value>)",
            },
        },
    },
    plugins: [],
};


