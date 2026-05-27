import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@task-mono/ui-components', '@task-mono/utils'],
};

export default nextConfig;
