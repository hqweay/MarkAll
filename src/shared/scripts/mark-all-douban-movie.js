const fs = require('fs-extra')
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');

export function getMovies() {
    let data = []
    // let item = {};
    let user = "hqweay";
    let page = -15;

    // while (true) {
    page += 15;
    var cnodeUrl = 'https://movie.douban.com/people/' + user + '/collect?start=' +
        page + '&sort=time&rating=all&filter=all&mode=grid';


    new Promise(function (resolve, reject) {
        superagent.get(cnodeUrl)
            .set('Cookie', 'll="118324"; bid=M1JpprRWbRA; push_doumail_num=0; douban-profile-remind=1; gr_user_id=5b991e9a-31e3-4570-b558-8c8e7aa8b17f; _vwo_uuid_v2=D093346D2775934F09BF533639BA70A30|96572c08218f84fdf2c7830547e53a6c; douban-fav-remind=1; _ga=GA1.2.1862642392.1547866201; __yadk_uid=rZ6T4lQaw0wUVSanYlG8WBzSDTojX7pU; __utmc=30149280; push_noty_num=0; viewed="33384238_30379527"; dbcl2="99496602:URDCBQ9kKPk"; ck=q7xT; __utmz=30149280.1560075912.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=30149280.9949; ct=y; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1560175430%2C%22https%3A%2F%2Fbook.douban.com%2Fsubject%2F30486757%2F%22%5D; _pk_ses.100001.8cb4=*; __utma=30149280.1862642392.1547866201.1560165568.1560175435.10; __utmb=30149280.2.10.1560175435; _pk_id.100001.8cb4=d857a24b5312fe94.1547866200.366.1560176114.1560156871.')
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    console.log(err);
                }
                var $ = cheerio.load(sres.text);


                $('.item').each(function (idx, element) {
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
                resolve(1);

            })
    }).then(function () {
        // console.log(data)
        // 这里写入吧
        fs.outputJson("file.json", data, err => {
            console.log(err) // => null
        })

    })





}

// }