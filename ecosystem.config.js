module.exports = {
  apps: [
    {
      name: 'next-notebook',
      script: 'npx next start -p 10001',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '180M',
      env: {
        NODE_ENV: 'production',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
