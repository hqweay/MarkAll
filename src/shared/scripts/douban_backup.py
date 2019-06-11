#!/usr/local/bin/python3.6
# encoding:utf-8
# 注释使用中文引入
from bs4 import BeautifulSoup
import requests
import time
import sys
import importlib
importlib.reload(sys)
# utf-8 编码问题

# 配置
page_end = 100000  # 要爬多少条数据
# page_end = (page_end/15 + 1) * 15
id = 0  # 计数
user = 'hqweay'  # 豆瓣 id
file_name = "./douban-" + user + ".json"  # 数据保存文件名
sleep_time = 500  # 爬取频率
page = -15
# --------------------------
fo = open(file_name, "wb+")  # 数据写入文件 "ab+"追加,"wb+"覆盖  b 是二进制使用数据的意思
print('开始爬取...')
# 爬虫
while True:
    # 15 为一组,值为 0~15 取得同一页数据
    page += 15
    # URL
    url_str = 'https://movie.douban.com/people/' + user + '/collect?start=' + \
        str(page) + '&sort=time&rating=all&filter=all&mode=grid'
    # 获取信息
    response = requests.get(url=url_str)
    info_html = response.text
    soup = BeautifulSoup(info_html, 'html.parser')
    tag = soup.div
    movieList = soup.find_all("div", "item")  # 一页所有电影

    # 退出条件 爬取完了
    if(0 == len(movieList)):
        fo.write(("]").encode('UTF-8'))
        fo.close()
        break

    fo.write(("[").encode('UTF-8'))
    # 解析...
    for movie in movieList:
        id += 1
        movieItem = BeautifulSoup(str(movie), 'html.parser')
        pic = movieItem.find("div", "pic").find('img')['src']
        title = movieItem.find("li", "title").find('a').get_text()
        url = movieItem.find("li", "title").find('a')['href']
        intro = movieItem.find("li", "intro").get_text()
        # .find_all("span", "date")[2].get_text()  # 3 is comment
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
            tags = "[]"
        else:
            tags = str(tags).replace("'", '"')

        print("第" + str(id) + "条数据...")
        # 写入
        fo.write(
            (
                '{\n"id" : "' + str(id) + '",' +
                '\n"url" : "' + str(url.replace("\n", "").replace(" ", "")) + '",' +
                '\n"pic" : "' + str(pic.replace("\n", "").replace(" ", "")) + '",' +
                '\n"name" : "' + str(title.replace("\n", "").replace(" ", "")) + '",' +
                '\n"intro" : "' + str(intro.replace("\n", "").replace(" ", "")) + '",' +
                '\n"date" : "' + str(date) + '",' +
                '\n"comment" : "' + str(comment.replace("\n", "").replace(" ", "").replace('"', '\'')) + '",' +
                '\n"oldTags" : ' + str(tags)
                + '\n}').encode('UTF-8')
        )
        # 如果后面还有数据的话 添加 逗号
        # 操 怎么判断呢?
        # 还没到末尾
        # if page_end != page:
        #     fo.write((',\n').encode('UTF-8'))

    # fo.write(("]").encode('UTF-8'))

    # exit
    # if page_end == page:
    #     fo.close()
    #     break
