import heroImg from "../assets/hero.jpg";

/**
 * Resolves absolute or relative asset paths with Vite base URL compatibility.
 */
export const getImgUrl = (path) => {
  if (!path) return heroImg;
  if (path === "/images/hero.jpg" || path === "images/hero.jpg") {
    return heroImg;
  }
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || "/";
  const formattedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${formattedBase}${cleanPath}`;
};

export { heroImg };
