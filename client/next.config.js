/** @type {import('next').NextConfig} */

require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
  },
}

module.exports = nextConfig
