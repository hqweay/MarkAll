import { getTags } from "#/db/mapper/tagMapper";
export function templatePraseSchema(template) {


    // console.log(333333333);
    // console.log(template);
    let tags = getTags();
    let SCHEMA = {
        type: "object",
        // title: "添加条目",
        properties: {
            // template_name 这里不用设置
            tag_name: {
                type: "array",
                title: "标签",
                anyOf: [],
                attrs: {
                    placeholder: "Select your list subscription",
                    title: "Please select your list subscription"
                }
            },
            template_style: {
                title: "条目信息",
                description: "条目信息",
                type: "object",
                properties: {

                },
                required: ["name"]
            }
        },
    };
    // console.log(template);

    tags.forEach(key => {
        // console.log(key);
        SCHEMA.properties.tag_name.anyOf.push({ value: key, label: key });
    })

    Object.keys(template.style).forEach(key => {
        SCHEMA.properties.template_style.properties[key] = {

            type: "string",
            // "maxLength": 40,
            title: key,
            // description: "Ex. Using the NPM Search Engine",
            attrs: {
                // rows: "1",
                type: "textarea"
            }

        };  //push({ key: { title: key } });
    })
    // console.log(SCHEMA);
    return SCHEMA;
}