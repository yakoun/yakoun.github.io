const CATEGORIES = [
  { value: "electricite", label: "Électricité", emoji: "⚡" },
  { value: "reseaux", label: "Réseaux", emoji: "🔗" },
  { value: "wifi", label: "WiFi", emoji: "📶" },
  { value: "paraboles", label: "Paraboles", emoji: "📡" },
  { value: "dev-web", label: "Développement web", emoji: "💻" },
  { value: "apps-mobiles", label: "Applications mobiles", emoji: "📱" },
  { value: "automatisation", label: "Automatisation", emoji: "⚙️" }
];
const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label])
);

export { CATEGORY_LABELS as C, CATEGORIES as a };
//# sourceMappingURL=index3-D_TadQnu.js.map
