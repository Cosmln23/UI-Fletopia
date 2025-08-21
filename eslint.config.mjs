import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {},
    overrides: [
      {
        files: ["src/shared/ui/**/*.{ts,tsx}", "src/shared/ui/*.{ts,tsx}"],
        rules: {
          "no-restricted-imports": [
            "error",
            {
              patterns: [
                {
                  group: ["../*/**", "../*"],
                  message:
                    "UI components must not import sibling components. Use props composition or import from outside shared/ui.",
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

export default eslintConfig;
