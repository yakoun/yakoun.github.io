import { w as writable } from './index2-C8PNV9uQ.js';

const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
const theme = writable(stored === "light" ? "light" : "dark");
theme.subscribe((value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", value);
    document.documentElement.classList.toggle("dark", value === "dark");
  }
});

export { theme as t };
//# sourceMappingURL=theme-B2QhgEeN.js.map
