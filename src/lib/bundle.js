let loading;

export const loadBundle = () => {
  loading ??= fetch("/bundle.json").then((response) => {
    if (!response.ok) throw new Error("bundle");
    return response.json();
  });
  loading.catch(() => { loading = undefined; });
  return loading;
};

export const maskUrl = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg.replaceAll("currentColor", "#000"))}")`;
