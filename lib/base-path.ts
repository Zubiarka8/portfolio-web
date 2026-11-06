const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative path with the site's base path. Needed for plain
 * <a> and <img>: next/link handles it, but SVGs bypass the image loader.
 */
export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}

/** Same as withBasePath, for page routes: they are exported as <route>/index.html. */
export function pageHref(path: string): string {
  const prefixed = withBasePath(path);
  return prefixed.endsWith("/") || prefixed.includes("#") ? prefixed : `${prefixed}/`;
}
