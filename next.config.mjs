/**
 * The site is a pure static export, so it can be served from any file host.
 *
 * GitHub Pages serves a project site from a sub-path, which would break every
 * absolute asset URL. The workflow sets GITHUB_PAGES=true so the build knows to
 * prefix them; local dev and every other host keep serving from the root.
 */
const basePath = process.env.GITHUB_PAGES === 'true' ? process.env.PAGES_BASE_PATH || '' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
