export function checkJson(message) {
    if (message == "") {
        alert("不能为空");
        return false;
    } else {
        var res = "";
        for (var i = 0, j = 0, k = 0, ii, ele; i < message.length; i++) {
            //k:缩进，j:""个数
            ele = message.charAt(i);
            if (j % 2 == 0 && ele == "}") {
                k--;
                for (ii = 0; ii < k; ii++) ele = "    " + ele;
                ele = "\n" + ele;
            } else if (j % 2 == 0 && ele == "{") {
                ele += "\n";
                k++;
                // debugger;
                for (ii = 0; ii < k; ii++) ele += "    ";
            } else if (j % 2 == 0 && ele == ",") {
                ele += "\n";
                for (ii = 0; ii < k; ii++) ele += "    ";
            } else if (ele == '"') j++;
            res += ele;
        }
        return res;
    }
}