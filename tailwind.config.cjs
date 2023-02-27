/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/**/*.{html,js}",
        "./src/**/*.{html,ts,js}"
    ],
    theme: {
        extend: {
            colors: {
                "surface": {
                    900: "#111111"
                }
            }
        },
    },
    plugins: [],
};
