/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config, { dev, isServer }) => {
	  config.resolve.fallback = {
		...config.resolve.fallback,
		fs: false,
		net: false,
		tls: false,
	  };
  
	  // Add specific loader for problematic modules
	  config.module.rules.push({
		test: /\.(js|mjs|jsx)$/,
		resolve: {
		  fullySpecified: false,
		},
	  });
  
	  return config;
	},
	transpilePackages: [
	  'react-remove-scroll',
	  '@radix-ui/react-dropdown-menu',
	  'lucide-react'
	],
  };
  
  module.exports = nextConfig;