#! /usr/bin/env node

const program = require('commander');
const axios = require('axios');
const inquirer = require('inquirer');
const open = require('open');
const chalk = require('chalk');
const ora = require('ora');
const package = require('../package.json');
const spinner = ora('获取新番中....');

// [type] 可选
// <type> 必选

const formatDate = (day) => {
  const date = day.getDate();
  const month = day.getMonth() + 1;

  return `${month}-${date}`;
}

program
  .version(package.version)
  .command('anime [day]')
  .description('choose anime day')
  .option('--no-publish', 'filter published')
  .option('-l, --limit [amount]', 'limit amount', parseInt)
  .action(async (day, cmd) => {
    try {
      spinner.start();
      const { data } = await axios.get('https://bangumi.bilibili.com/web_api/timeline_global');
      const { result = [] } = data;

      spinner.succeed('哔哩哔哩 (゜-゜)つロ 干杯~');

      const date = new Date();

      const dateMap = {
        'tomorrow': () => date.setDate(date.getDate() + 1),
        'yesterday': () => date.setDate(date.getDate() - 1),
      };

      dateMap[day] && dateMap[day]();

      const formatResult = formatDate(date);

      const filterArr = result.filter(item => item.date === formatResult);


      if (filterArr && filterArr.length) {
        if (cmd.limit) {
          filterArr[0].seasons = filterArr[0].seasons.slice(0, cmd.limit);
        }
        if (!cmd.publish) {
          filterArr[0].seasons = filterArr[0].seasons.filter(item => !item.is_published);
        }
        const choices = filterArr[0].seasons.map(item => {
          let title = `${item.title} (${item.pub_time} ${item.is_published ? '' : '即将更新'} ${item.pub_index})`;
          if (item.delay === 1) {
            title = `${item.title} (${item.pub_time} ${item.delay_reason})`;
          }
          return {
            name: title,
            value: item.season_id
          };
        });

        if (!choices.length) {
          console.log(chalk.black.bgRed('没有新番可选!'));
          process.exit(1);
        }

        inquirer.prompt([{
          type: 'list',
          name: 'seasonId',
          message: chalk.green('打开哪部新番?'),
          choices,
        }]).then(async (answers) => {
          await open(`https://www.bilibili.com/bangumi/play/ss${answers.seasonId}`);
        })
      }
    } catch (err) {
      spinner.fail('获取新番失败!');
      process.exit(1);
    }
  });

program.parse(process.argv);


