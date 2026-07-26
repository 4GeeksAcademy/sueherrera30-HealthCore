tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"]
      },
      colors: {
        primary: {
          100: "#CFF0EA",
          200: "#88C9C4",
          300: "#3E9B94",
          400: "#20666B",
          500: "#0C3B45"
        },
        secondary: "#722F37"
      },
      boxShadow: {
        "soft-relief": "6px 6px 12px rgba(12, 59, 69, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.9)",
        "inner-relief": "inset 4px 4px 8px rgba(12, 59, 69, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.9)",
        floating: "0 10px 25px -5px rgba(32, 102, 107, 0.4), 0 8px 10px -6px rgba(32, 102, 107, 0.2)"
      }
    }
  }
};
