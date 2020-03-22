// import STORE_PATH from '../../static/STORE_PATH'
// import { addItem } from '../mapper/itemMapper'
// import { addTag } from '../mapper/tagMapper'
// import { addTemplate } from '#/db/mapper/templateMapper'
// // douban-movie
// const fs = require('fs-extra')

// export async function importDoubanMovies() {
//   try {
//     let data = await fs.readJson(STORE_PATH + '/user/douban-movie.json')
//     // let id = 1;
//     console.log('导入条目中...')
//     data.forEach(element => {
//       // id++;
//       let item = {
//         template_name: '豆瓣电影',
//         template_style: {
//           'url': 'https://movie.douban.com/subject/3892394/',
//           'pic': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2294396926.jpg',
//           'name': '仁医/JIN-仁-/妙手仁医/时空侠医',
//           'intro': '2009-10-11(日本)/大泽隆夫/中谷美纪/绫濑遥/小出惠介/桐谷健太/田口浩正/户田菜穗/武田铁矢/高冈早纪/六平直政/麻生祐未/小日向文世/内野圣阳/佐藤二朗/户次重幸/山本耕史/深水三章/青木和代/甲本雅裕/柴田杏花/谷桃子/平山浩行/吉泽悠/川村阳介/森崎麻美/大方斐纱子/石丸谦二郎/林泰文/津田健次郎/中村敦夫/小林胜也/水泽绘玲奈/相岛一之/水泽亚纪/奥田达士/KazukiHasegawa/日本/平川雄一朗/川岛龙太郎/54分钟/仁医/剧情/奇幻/科幻/森下佳子KeikoMorishita/日语',
//           'date': '2019-02-01',
//           'comment': '配乐过头了.../这么意淫的设定居然拍的这么主旋律又不腻，太强了'
//         },
//         tag_name: [
//           '恐怖', '科幻', '喜剧']
//       }
//       item.template_style.name = element.name
//       item.template_style.url = element.url
//       item.template_style.pic = element.pic
//       item.template_style.intro = element.intro
//       item.template_style.date = element.date
//       item.template_style.comment = element.comment
//       item.tag_name = element.oldTags

//       // if no templement,add.
//       let templement = {
//         name: '豆瓣电影',
//         style: {
//           'url': 'https://movie.douban.com/subject/3892394/',
//           'pic': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2294396926.jpg',
//           'name': '仁医/JIN-仁-/妙手仁医/时空侠医',
//           'intro': '2009-10-11(日本)/大泽隆夫/中谷美纪/绫濑遥/小出惠介/桐谷健太/田口浩正/户田菜穗/武田铁矢/高冈早纪/六平直政/麻生祐未/小日向文世/内野圣阳/佐藤二朗/户次重幸/山本耕史/深水三章/青木和代/甲本雅裕/柴田杏花/谷桃子/平山浩行/吉泽悠/川村阳介/森崎麻美/大方斐纱子/石丸谦二郎/林泰文/津田健次郎/中村敦夫/小林胜也/水泽绘玲奈/相岛一之/水泽亚纪/奥田达士/KazukiHasegawa/日本/平川雄一朗/川岛龙太郎/54分钟/仁医/剧情/奇幻/科幻/森下佳子KeikoMorishita/日语',
//           'date': '2019-02-01',
//           'comment': '配乐过头了.../这么意淫的设定居然拍的这么主旋律又不腻，太强了'
//         }
//       }
//       addTemplate(templement)
//       addItem(item)
//       item.tag_name.forEach(function (tagName) {
//         addTag(tagName)
//       })
//     })
//   } catch (err) {
//     console.error(err)
//   }
// }
