module.exports = {
  apps: [
    {
      name: 'minesweeper',
      script: '/home/dan/repos/svelte-sweeper/build.sh',
      interpreter: 'bash',
      instances: 1,
      env: {
        NODE_ENV: 'production'
      },
      restart_delay: 4000,
      error_file: '/home/dan/.pm2/logs/minesweeper-error.log',
      out_file: '/home/dan/.pm2/logs/minesweeper-out.log'
    }
  ]
};
