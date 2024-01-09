/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'background': '#7167ab',
                'primary': '#fcfcfc', 
                'secondary': '#db1236',
                'tertiary': '#1478c3',
                'shade': '#eaeeec',
                'accent': '#101155',
            },
        },
    },
    plugins: [],
}