#!/usr/local/bin/python3.6
# encoding:utf-8
# 注释使用中文引入
from bs4 import BeautifulSoup
import requests
import time
import sys
import importlib
import json
importlib.reload(sys)
# utf-8 编码问题

# 配置
page_end = 100000  # 要爬多少条数据
# page_end = (page_end/15 + 1) * 15
id = 0  # 计数
user = 'hqweay'  # 豆瓣 id
file_name = "./douban-" + user + ".json"  # 数据保存文件名
sleep_time = 700  # 爬取频率
page = -15
# --------------------------
fo = open(file_name, "w+")  # 数据写入文件 "ab+"追加,"wb+"覆盖  b 是二进制使用数据的意思
print('开始爬取...')
datas = []
item = {
    "url": "https://movie.douban.com/subject/1297052/",
    "pic": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p456692072.jpg",
    "name": "侧耳倾听/耳をすませば/心之谷/梦幻街少女",
    "intro": "1995-07-15(日本)/本名阳子/小林桂树/高山南/高桥一生/山下容莉枝/室井滋/露口茂/饭冢雅弓/加利·艾尔维斯/日本/近藤喜文/111分钟/侧耳倾听/剧情/爱情/动画/宫崎骏HayaoMiyazaki/柊葵AoiHîragi/日语/英语",
    "date": "2019-05-31",
    "comment": "干净得像猫爪一样/中学英语课本接触的乡村路",
    "oldTags": ["吉卜力", "宫崎峻", "日本", "日本动画"]
}
# 爬虫
while True:

    # 15 为一组,值为 0~15 取得同一页数据
    page += 15
    # URL
    url_str = 'https://movie.douban.com/people/' + user + '/collect?start=' + \
        str(page) + '&sort=time&rating=all&filter=all&mode=grid'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36', 'Cookie': 'll="118324"; bid=M1JpprRWbRA; push_doumail_num=0; douban-profile-remind=1; gr_user_id=5b991e9a-31e3-4570-b558-8c8e7aa8b17f; _vwo_uuid_v2=D093346D2775934F09BF533639BA70A30|96572c08218f84fdf2c7830547e53a6c; douban-fav-remind=1; _ga=GA1.2.1862642392.1547866201; __yadk_uid=rZ6T4lQaw0wUVSanYlG8WBzSDTojX7pU; __utmc=30149280; push_noty_num=0; viewed="33384238_30379527"; dbcl2="99496602:URDCBQ9kKPk"; ck=q7xT; __utmz=30149280.1560075912.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=30149280.9949; ct=y; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1560175430%2C%22https%3A%2F%2Fbook.douban.com%2Fsubject%2F30486757%2F%22%5D; _pk_ses.100001.8cb4=*; __utma=30149280.1862642392.1547866201.1560165568.1560175435.10; __utmb=30149280.2.10.1560175435; _pk_id.100001.8cb4=d857a24b5312fe94.1547866200.366.1560176114.1560156871.'}
    # 获取信息
    response = requests.get(url=url_str, headers=headers)
    info_html = response.text
    soup = BeautifulSoup(info_html, 'html.parser')
    tag = soup.div
    movieList = soup.find_all("div", "item")  # 一页所有电影

    print(response)

    if(0 == len(movieList)):
        break
    # 测试
    # if(page > 30):
    #     break

    # 解析...
    for movie in movieList:
        id += 1
        movieItem = BeautifulSoup(str(movie), 'html.parser')
        pic = movieItem.find("div", "pic").find('img')['src']
        title = movieItem.find("li", "title").find('a').get_text()
        url = movieItem.find("li", "title").find('a')['href']
        intro = movieItem.find("li", "intro").get_text()
        date = movieItem.find("span", "date").get_text()

        tags = ""
        if movieItem.find("span", "tags") != None:
            tags = movieItem.find("span", "tags").get_text()

        comment = ""
        if movieItem.find("span", "comment") != None:
            comment = movieItem.find("span", "comment").get_text()

        tags = tags.replace("标签: ", "")  # 去掉前缀
        tags = tags.split(" ")  # 按空格转为数组

        if len(tags) == 1:
            del tags[0]

        print("第" + str(id) + "条数据...")

        # item['id'] = str(id)
        item['name'] = str(title.replace("\n", "").replace(" ", ""))
        item['url'] = str(url.replace("\n", "").replace(" ", ""))
        item['pic'] = str(pic.replace("\n", "").replace(" ", ""))
        item['intro'] = str(intro.replace("\n", "").replace(" ", ""))
        item['date'] = str(date)
        item['comment'] = str(comment.replace(
            "\n", "").replace(" ", "").replace('"', '\''))
        item['oldTags'] = str(tags)

        newItem = item.copy()
        datas.append(newItem)


itemJson = json.dumps(datas, ensure_ascii=False)
fo.write(itemJson)
fo.close()
