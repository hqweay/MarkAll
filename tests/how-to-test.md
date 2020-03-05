我还不知道怎么使用测试。

Mocha是JavaScript的测试框架, 浏览器和Node端均可以使用。但是Mocha本身并不提供断言的功能, 需要借助例如: Chai, 这样的断言库完成测试的功能。

```javascript
describe('unit', function () {
  it('example', function () {
    return true
  })
})
```

unit：面向程序员

e2e：面向用户

通过在终端中输入 yarn test:unit 来运行测试。tests 目录中任何以 .spec.js 结尾的文件都会被自动执行。