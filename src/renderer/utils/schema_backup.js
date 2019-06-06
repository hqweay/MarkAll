export function templatePraseSchema(template) {
    import { getTags } from "@/../shared/db/mapper/tagMapper";
    let tags = getTags();
    let SCHEMA = {
        type: "object",
        title: "添加条目",
        properties: {
            tag_name: {
                type: "array",
                title: "标签",
                anyOf: [
                    { value: "daily", label: "Daily New" },
                    { value: "promotion", label: "Promotion" }
                ],
                attrs: {
                    placeholder: "Select your list subscription",
                    title: "Please select your list subscription"
                }
            },
            // name: {
            //   type: "string",
            //   minLength: 8,
            //   maxLength: 80,
            //   title: "String",
            //   attrs: {
            //     placeholder: "Your Full Name",
            //     title: "Please enter your full name"
            //   }
            // },
            template_style: {
                title: "条目信息",
                description: "条目信息",
                type: "object",
                properties: {
                    name: {
                        title: "SubName",
                        attrs: {
                            placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                        }
                    },
                    // url: {
                    //   title: "SubUrl",
                    //   format: "uri"
                    // },
                    url: {
                        title: "SubName",
                        attrs: {
                            placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                        }
                    },
                    pic: {
                        title: "SubName",
                        attrs: {
                            placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                        }
                    },
                    intro: {
                        title: "SubName",
                        attrs: {
                            placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                        }
                    },
                    date: {
                        title: "SubName",
                        attrs: {
                            placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                        }
                    },
                    comment: {
                        title: "SubName",
                        attrs: {
                            placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                        }
                    }
                },
                required: ["name"]
            }
        },
        additionalProperties: false
        // required: ["name", "email", "lists"]
    };
}







{
    type: "object",
        title: "添加条目",
            properties: {
        tag_name: {
            type: "array",
                title: "标签",
                    anyOf: [
                        { value: "daily", label: "Daily New" },
                        { value: "promotion", label: "Promotion" }
                    ],
                        attrs: {
                placeholder: "Select your list subscription",
                    title: "Please select your list subscription"
            }
        },
        // name: {
        //   type: "string",
        //   minLength: 8,
        //   maxLength: 80,
        //   title: "String",
        //   attrs: {
        //     placeholder: "Your Full Name",
        //     title: "Please enter your full name"
        //   }
        // },
        template_style: {
            title: "条目信息",
                description: "条目信息",
                    type: "object",
                        properties: {
                name: {
                    title: "SubName",
                        attrs: {
                        placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                    }
                },
                // url: {
                //   title: "SubUrl",
                //   format: "uri"
                // },
                url: {
                    title: "SubName",
                        attrs: {
                        placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                    }
                },
                pic: {
                    title: "SubName",
                        attrs: {
                        placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                    }
                },
                intro: {
                    title: "SubName",
                        attrs: {
                        placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                    }
                },
                date: {
                    title: "SubName",
                        attrs: {
                        placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                    }
                },
                comment: {
                    title: "SubName",
                        attrs: {
                        placeholder: "Sub Full Name",
                            title: "Please enter your full name"
                    }
                }
            },
            required: ["name"]
        }
    },
    additionalProperties: true
    // required: ["name", "email", "lists"]
};



"source": {
    "type": "string",
        "maxLength": 120,
            "title": "Source",
                "description": "Ex. Using the NPM Search Engine",
                    "attrs": {
        "type": "textarea",
            "placeholder": "How did you hear about us?"
    }
}