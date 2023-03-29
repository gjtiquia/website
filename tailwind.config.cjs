/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/**/*.{html,js}",
        "./src/**/*.{html,ts,js}"
    ],
    theme: {
        extend: {
            colors: {
                "primary": "hsl(219, 62%, 44%)",
                "surface": {
                    700: "hsl(212, 71%, 23%)",
                    800: "hsl(212, 52%, 16%)",
                    900: "hsl(210, 30%, 10%)"
                },

                "gamedev-primary": "hsl(352, 82%, 38%)",
                "gamedev-surface": {
                    700: "hsl(352, 71%, 23%)",
                    800: "hsl(352, 52%, 16%)",
                    900: "hsl(350, 30%, 10%)"
                },
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
