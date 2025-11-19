// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: ["class"],
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       colors: {
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           1: "hsl(var(--chart-1))",
//           2: "hsl(var(--chart-2))",
//           3: "hsl(var(--chart-3))",
//           4: "hsl(var(--chart-4))",
//           5: "hsl(var(--chart-5))",
//         },
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };

/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["submenu_top_left_arrow", "submenu_top_right_arrow"],
  theme: {
    extend: {
      colors: {
        pink: "#fd03dc",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        airepro: {
          purple: "#9b87f5",
          darkPurple: "#7E69AB",
          blue: "#33C3F0",
          lightGray: "#F1F0FB",
          gray: "#8E9196",
          pink: "#fd03dc",
          darkPink: "#c102ab",
          violet: "#8B5CF6",
          darkViolet: "#6D28D9",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        poppins: ["Poppins", ...fontFamily.sans],
        inter: ["Inter", ...fontFamily.sans],
      },
      backgroundImage: {
        pinkGradient:
          "radial-gradient(circle, rgba(253,3,220,1) 40%, rgba(190,24,93,1) 100%)",
        aireproGradient: "linear-gradient(135deg, #9b87f5 0%, #33C3F0 100%)",
      },
      keyframes: {
        settingLink: {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "90%", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        settingLink: "settingLink 0.4s ease-in",
        float: "float 6s ease-in-out infinite",
        fadeInUp: "fadeInUp 1s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "hero-card": "0 20px 40px -10px rgba(155, 135, 245, 0.15)",
        "hero-button": "0 4px 14px -2px rgba(155, 135, 245, 0.4)",
      },
    },
  },
  variants: {
    extend: {
      content: ["before", "after", "hover"],
      animation: ["responsive", "hover", "focus"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-spinner": {
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
          "&": { "-moz-appearance": "textfield" },
        },
      });
    }),
    require("tailwindcss-animate"),
  ],
};
