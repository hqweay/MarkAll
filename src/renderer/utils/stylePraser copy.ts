// @ts-ignore
export function stylePraser(styleItem: any): string {
  if (styleItem.type === 'TEXT') {
    return `<div class="item text">`
      + `<h2 class= "name" >`
      + styleItem.name
      + `</h2>`
      + `<div class="value" >`
      + styleItem.value
      + `</div>`
      + `</div>`;
  } else if (styleItem.type === 'URL') {
    return `<div class="item url">`
      + `<h2 class= "name" >`
      + styleItem.name
      + `</h2>`
      + `<div class="value" >`
      + `<a target='_blank' href='` + styleItem.value + ` '>`
      + styleItem.value
      + `</a>`
      + `</div>`
      + `</div>`;
  } else if (styleItem.type === 'DATE') {
    var date = new Date(styleItem.value);
    return `<div class="item url">`
      + `<h2 class= "name" >`
      + styleItem.name
      + `</h2>`
      + `<div class="value">`
      + (date.getFullYear() +
        " 年 " +
        date.getMonth() +
        " 月 " +
        date.getDay() +
        " 日")
      + `</div>`
      + `</div>`;
  } else if (styleItem.type === 'IMAGE') {
    return `<div class="item url">`
      + `<h2 class= "name" >`
      + styleItem.name
      + `</h2>`
      + `<div class="value">`
      + `<div width="50px" height="50px" class="image">`
      + `<img width="30%" src="` + styleItem.value + `">`
      + `</img>`
      + `</div>`
      + `</div>`
      + `</div>`;
  } else if (styleItem.type === 'LIST_IMAGE') {
    let imgs = `<div class="list-image">`;
    for (let imgUrl in styleItem.value) {
      imgs += `<img width="30%" style="margin-right: 1%;" src="` + styleItem.value[imgUrl] + `">` + `</img>`
    }
    imgs += `</div>`
    return `<div class="item url">`
      + `<h2 class= "name">`
      + styleItem.name
      + `</h2>`
      + `<div class="value">`
      + imgs
      + `</div>`
      + `</div>`;
  } else if (styleItem.type === 'LIST_TEXT') {
    let strs = `<div class="list-text">`;
    for (let text in styleItem.value) {
      strs += styleItem.value[text] + ' / ';
    }
    strs += `</div>`;
    return `<div class="item text">`
      + `<h2 class= "name" >`
      + styleItem.name
      + `</h2>`
      + `<div class="value" >`
      + strs
      + `</div>`
      + `</div>`;
  }
}