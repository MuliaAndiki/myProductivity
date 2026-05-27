import { env } from '@/configs/env.config';
import type { NextConfig } from 'next';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpack = require('webpack');

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/shared', 'react-native', 'react-native-web', 'nativewind', 'react-native-css-interop', 'react-native-reanimated', 'react-native-screens', 'react-native-safe-area-context', 'react-native-gesture-handler', 'react-native-svg', '@rn-primitives/dialog', '@rn-primitives/alert-dialog', '@rn-primitives/slot', '@rn-primitives/checkbox', '@rn-primitives/progress', '@rn-primitives/aspect-ratio', '@expo/vector-icons', 'lucide-react-native'],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    };

    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      ...(config.resolve.extensions || []),
    ];

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      }),
    );

    return config;
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: env.NEXT_PUBLIC_BASEPATH || '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
