#! /usr/bin/env node

const program = require('commander');
const axios = require('axios');

// [type] 可选
// <type> 必选

program
  .command('anime [day]')
  .description('choose anime day')
  .option('-l, --limit [amount]', 'limit amount', parseInt, 20)
  .action(async (day, cmd) => {
    try {
      const { data } = await axios.get('https://bangumi.bilibili.com/web_api/timeline_global');
    } catch (err) {
    }
  });

program.parse(process.argv);


