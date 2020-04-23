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
  ENUM = "EnumType",
}

// template field item
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
  name: string,
  enums: Array<string>,
  state: string
}
interface RateType {
  name: string,
  max: number,
  state: number
}

// template field
// extra 用于 enums、rate 等记录额外信息(desprition 也迁移进来)
interface TemplateFiledType {
  name: string,
  type: string,
  extra: any,
}
// template
interface TemplateType {
  id: string
  name: string,
  style: Array<TemplateFiledType>,
}


// item field
interface ItemFieldType {
  name: string,
  type: string,
  value: any
}
// item
interface ItemType {
  id: string,
  created_time: string,
  updated_time: string,
  template_name: string,
  style_content: Array<ItemFieldType>,
  tags: Array<string>,
}

