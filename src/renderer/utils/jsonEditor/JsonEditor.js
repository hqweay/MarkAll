import JsonEditor from "vue-json-ui-editor";
JsonEditor.setComponent("form", "el-form", ({ vm }) => {
    // vm is the JsonEditor VM
    const labelWidth = "120px";
    const model = vm.data;
    const rules = {};
    function parseField(fields) {
        Object.keys(fields).forEach(key => {
            if (key.indexOf("$") === 0 && key !== "$sub") return;
            const field = fields[key];
            if (field.$sub) {
                return parseField(field);
            }
            if (!field.name) return;
            rules[field.name] = [];
            // http://element.eleme.io/#/en-US/component/form#validation
            const type =
                field.schemaType === "array" && field.type === "radio"
                    ? "string"
                    : field.schemaType;
            const required = field.required;
            const message = field.title;
            const trigger = ["radio", "checkbox", "select"].includes(field.type)
                ? "change"
                : "blur";
            rules[field.name].push({ type, required, message, trigger });
            if (field.minlength !== undefined || field.maxlength !== undefined) {
                const max = field.maxlength || 255;
                const min = field.minlength || 0;
                const msg = `Length must between ${min} and ${max}`;
                rules[field.name].push({ min, max, message: msg, trigger });
            }
        });
    }
    parseField(vm.fields);
    // returning the form props
    return { labelWidth, rules, model };
});
// http://element.eleme.io/#/en-US/component/form#validation
JsonEditor.setComponent("label", "el-form-item", ({ field }) => ({
    prop: field.name
}));
JsonEditor.setComponent("email", "el-input");
JsonEditor.setComponent("url", "el-input");
JsonEditor.setComponent("number", "el-input-number");
JsonEditor.setComponent("text", "el-input");
JsonEditor.setComponent("textarea", "el-input");
JsonEditor.setComponent("checkbox", "el-checkbox");
JsonEditor.setComponent("checkboxgroup", "el-checkbox-group");
JsonEditor.setComponent("radio", "el-radio");
JsonEditor.setComponent("select", "el-select");
JsonEditor.setComponent("switch", "el-switch");
JsonEditor.setComponent("color", "el-color-picker");
JsonEditor.setComponent("rate", "el-rate");

export default JsonEditor;