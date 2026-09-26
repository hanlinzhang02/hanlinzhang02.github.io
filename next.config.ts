import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isUserOrOrganizationSite = repositoryName.endsWith('.github.io');
const githubPagesBasePath =
  isGitHubPagesBuild && repositoryName && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.bib$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
