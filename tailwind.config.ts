import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    mode: "jit",

    plugins: [typography],
} satisfies Config;
