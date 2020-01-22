// @ts-ignore
export function stylePraser(styleItem: any): string {
  if (styleItem.type === 'TEXT') {
    return `<div style="width:30%;" class= "name" >`
      + styleItem.name
      + `</div>`
      + `<div class="value" >`
      + styleItem.value
      + `</div>`
      ;
  } else if (styleItem.type === 'URL') {
    return `<div style="width:30%;" class= "name" >`
      + styleItem.name
      + `</div>`
      + `<div class="value" >`
      + `<a style="color:#0dda4a;text-decoration:none;" target='_blank' href='` + styleItem.value.url + ` '>`
      + styleItem.value.name
      + `</a>`

      + `</div>`;
  } else if (styleItem.type === 'DATE') {
    var date = new Date(styleItem.value);
    return `<div style="width:30%;" class= "name" >`
      + styleItem.name
      + `</div>`
      + `<div class="value">`
      + (date.getFullYear() +
        " 年 " +
        date.getMonth() +
        " 月 " +
        date.getDay() +
        " 日")

      + `</div>`;
  } else if (styleItem.type === 'IMAGE') {
    return `<div style="width:31%;" class= "name" >`
      + styleItem.name
      + `</div>`
      + `<div class="value">`
      + `<div class="image">`
      + `<img width="68%" src="` + styleItem.value + `">`
      + `</img>`
      + `</div>`
      + `</div>`;
  } else if (styleItem.type === 'LIST_IMAGE') {
    let imgs = `<div class="list-image">`;
    for (let imgUrl in styleItem.value) {
      imgs += `<img width="30%" style="margin-right: 1%;" src="` + styleItem.value[imgUrl] + `">` + `</img>`
    }
    imgs += `</div>`
    return `<div class= "name">`
      + styleItem.name
      + `</div>`
      + `<div style="margin-top:2%;" class="value">`
      + imgs
      + `</div>`;
  } else if (styleItem.type === 'LIST_TEXT') {
    let strs = `<div class="list-text">`;
    for (let text in styleItem.value) {
      strs += styleItem.value[text] + ' / ';
    }
    strs += `</div>`;
    return `<div style="width:30%;" class= "name" >`
      + styleItem.name
      + `</div>`
      + `<div class="value" >`
      + strs
      + `</div>`;
  } else if (styleItem.type === 'LIST_URL') {
    let urls = `<div style="margin-top:2%;" class="list-url">`;
    for (let url in styleItem.value) {
      urls += `<a style="color:#0dda4a;text-decoration:none;" target='_blank' href='`
        + styleItem.value[url].url
        + ` '>`
        + styleItem.value[url].name + `</a>` + `</br>`;
    }
    urls += `</div>`;
    return `<div class= "name" >`
      + styleItem.name
      + `</div>`
      + `<div class="value" >`
      + urls
      + `</div>`;
  }
}