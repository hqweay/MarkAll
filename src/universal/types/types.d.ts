// text,date,url,image(string,url or path)
// import { TemplateStyleEnum } from "./enum"
// 用 import 会把这个文件当作 export

declare enum TemplateStyleItemEnum {
  TEXT = "text",
  URL = "url",
  DATE = "date",
  IMAGE = "image",
  LIST_IMAGE = "list of images",
  LIST_TEXT = "list of text",
  LIST_URL = "list of urls",
  MARKDOWN = "markdown",
  FILE = "file",
  RATE = "rate",
  ENUM = "EnumType"
}

// 用键值对的话不方便扩展
interface ImageType {
  name: string,
  url: string,
  description: string,
}

interface UrlType {
  name: string,
  url: string,
  description: string,
}

interface EnumType {
  "enums": Array<string>,
  "state": string
}

/**
 * {
    name: "时间",
    description: "时间",
    type: "DATE"
  }
 */
interface TemplateStyleItemType {
  name: string,
  description: string,
  type: TemplateStyleItemEnum,
}

/**
 * {
  name: '日记！',
  style: [{
    name: "标题",
    description: "",
    type: "TEXT"
  }, {
    name: "内容",
    description: "文章内容",
    type: "MARKDOWN"
  }, {
    name: "时间",
    description: "时间",
    type: "DATE"
  }
 */
interface TemplateType {
  name: string,
  style: Array<TemplateStyleItemType>,
}


/**
 * ["童年,快乐"]
 */
// interface TagsType {
//   tags: Array<string>
// }

/**
 * {
  id: 2,
  template_name: '专辑',
  style_content: [{
    name: "名称", value: "这个世界会好吗"
  }, {
    name: "封面", value: "https://img3.doubanio.com/view/subject/m/public/s2745500.jpg"
  }, {
    name: "创作人", value: "李志"
  }, {
    name: "曲目", value: ["妈妈",
      "喀纳斯",
      "和你在一起"]
  }, {
    name: "日期", value: "2006-11"
  }],
  tags: ['童年']
}
 */
interface ItemType {
  id: string,
  template_name: string,
  style_content: Array<{ name: string, value: any }>,
  tags: Array<string>,
}

// TemplateType 的 style 类型 ： string，url，image...