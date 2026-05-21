import React from "react";

const badgeStyles: Record<string, string> = {
  React: "#1971c2",
  Angular: "#c92a2a",
  Vue: "#237a32",
  Svelte: "#b83d0f",
  "Web Components": "#1864ab",
  Shell: "#495057"
};

const badgeStylesDark: Record<string, string> = {
  React: "#74c0fc",
  Angular: "#ff8787",
  Vue: "#69db7c",
  Svelte: "#ffa94d",
  "Web Components": "#74c0fc",
  Shell: "#adb5bd"
};

const frameworkIcons: Record<string, string> = {
  React: "/icons/react.svg",
  Angular: "/icons/angular.svg",
  Vue: "/icons/vue.svg",
  Svelte: "/icons/svelte.svg",
  "Web Components": "/icons/webcomponents.svg",
  Shell: "/icons/shell.svg"
};

function isDarkTheme(): boolean {
  return document.documentElement.getAttribute("data-theme") === "execdark";
}

export function FrameworkBadge({ name, showText = false }: { name: string; showText?: boolean }) {
  const [dark, setDark] = React.useState(() => isDarkTheme());
  
  React.useEffect(() => {
    const observer = new MutationObserver(() => setDark(isDarkTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  
  const color = (dark ? badgeStylesDark[name] : badgeStyles[name]) ?? (dark ? "#adb5bd" : "#495057");
  const iconUrl = frameworkIcons[name];
  
  const baseStyle: React.CSSProperties = {
    background: "var(--surface-soft)",
    border: `1px solid ${color}`,
    borderRadius: 999,
    color: color
  };
  
  if (showText) {
    return (
      <span
        style={{
          ...baseStyle,
          padding: "2px 10px",
          fontSize: 12
        }}
      >
        {name}
      </span>
    );
  }
  
  return (
    <span
      style={{
        ...baseStyle,
        padding: "4px 8px",
        fontSize: 14,
        fontWeight: "bold",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "20px",
        height: "20px"
      }}
      title={name}
    >
      {iconUrl ? (
        <img 
          src={iconUrl} 
          alt={name}
          style={{
            width: "16px",
            height: "16px"
          }}
        />
      ) : (
        "?"
      )}
    </span>
  );
}
