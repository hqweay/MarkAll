export function resolveTemplateField(item: any, field: TemplateFieldType): any {
  if (field.type === "ENUM") {
    let fieldEnums = field.extra.enums;
    item.style_content.push({
      name: field.name,
      type: field.type,
      value: {
        enums: fieldEnums,
        state: ""
      }
    });
  } else if (field.type === "RATE") {
    item.style_content.push({
      name: field.name,
      type: field.type,
      value: {
        max: field.extra.max,
        state: 0
      }
    });
  } else {
    item.style_content.push({
      name: field.name,
      type: field.type,
      value: []
    });
  }
  // return item;
}