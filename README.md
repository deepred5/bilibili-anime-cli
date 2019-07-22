# bilibili-anime-cli
哔哩哔哩番剧 命令行工具

![bili-anime](http://pic.deepred5.com/bili-anime.png)

## 安装
```bash
npm install -g bili-anime
# OR
yarn global add bili-anime
```

## 命令行参数
```bash
bili-anime -h

Usage: anime [options] [day]                    
                                                
选择获取哪天的新番(yesterday|today(默认)|tomorrow)                            
                                                
Options:                                        
  --no-publish          只获取未放送的新番        
  -l, --limit [amount]  限制展示的条数           
  -h, --help            输出帮助信息
```

Example:
```bash
bili-anime anime # 获取当天新番
bili-anime anime tomorrow # 获取明天新番
bili-anime anime --no-publish # 获取当天未发布新番
bili-anime anime -l 7 # 只展示7条新番信息
```