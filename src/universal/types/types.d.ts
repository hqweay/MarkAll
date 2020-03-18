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
  "name": string,
  "enums": Array<string>,
  "state": string
}

interface RateType {
  name: string,
  max: string,
  state: string
}

interface TemplateFiledType {
  name: string,
  description: string,
  type: TemplateStyleItemEnum,
}

interface TemplateType {
  name: string,
  style: Array<TemplateFiledType>,
}


interface ItemFiledType {
  name: string,
  type: string,
  value: any
}

interface ItemType {
  id: string,
  template_name: string,
  style_content: Array<ItemFiledType>,
  tags: Array<string>,
}

