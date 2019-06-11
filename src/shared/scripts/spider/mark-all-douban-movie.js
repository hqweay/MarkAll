const fs = require('fs-extra')
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');

export function getMovies() {
    let data = []
    // let item = {};
    let user = "hqweay";
    let page = -15;
    // let id = 0;
    let flag = false;

    console.log("开始爬取...");

    // var exec = new Promise(function (resolve, reject) {
    // id++; 
    var s = setInterval(function () {
        page += 15;
        var cnodeUrl = 'https://movie.douban.com/people/' + user + '/collect?start=' +
            page + '&sort=time&rating=all&filter=all&mode=grid';
        console.log("正在获取第 " + page + " 条数据...");
        superagent.get(cnodeUrl)
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    console.log(err);
                }
                var $ = cheerio.load(sres.text);

                let items = $('.item');
                if (items.length == 0) {
                    console.log("为 0 嘛")
                    flag = true;
                }
                // test
                // if (page == 30) {
                //     flag = true;
                // }

                items.each(function (idx, element) {
                    // todo
                    let item = {};
                    var $element = $(element);
                    let url = $element.find('.pic a').attr('href');
                    let pic = $element.find('.pic img').attr('src');
                    let title = $element.find('.info .title a').text()
                    let intro = $element.find('.info .intro').text()
                    let date = $element.find('.info .date').text()
                    let tags = "";
                    if ($element.find('.info .tags').length != 0) {
                        tags = $element.find('.info .tags').text();
                    }
                    let comment = ""
                    if ($element.find('.info .comment').length != 0) {
                        comment = $element.find('.info .comment').text();
                    }

                    // tags 处理
                    tags = tags.replace("标签: ", "") // 去掉前缀
                    tags = tags.split(" ") // 按空格转为数组


                    if (tags.length == 1) {
                        tags.splice(0, 1)
                    }

                    item['name'] = title.replace(/\s/g, "") //replace("\n", "").replace(" ", "")
                    item['url'] = url.replace(/\s/g, "") //replace("\n", "").replace(" ", "")
                    item['pic'] = pic.replace(/\s/g, "") //replace("\n", "").replace(" ", "")
                    item['intro'] = intro.replace(/\s/g, "") //replace("\n", "").replace(" ", "")
                    item['date'] = date
                    item['comment'] = comment.replace(/\s/g, "") //replace("\n", "").replace(" ", "").replace('"', '\'')
                    item['oldTags'] = tags
                    data.push(item);
                });
            })
        if (flag === true) {
            clearInterval(s);
            fs.outputJson("file.json", data, err => {
                console.log(err) // => null
            })
        }
    }, 1000);

    // resolve(42);
    // })
    // exec.then(function () {
    //     console.log(data)
    //     // 这里写入吧
    //     fs.outputJson("file.json", data, err => {
    //         console.log(err) // => null
    //     })

    // })
}