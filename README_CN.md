# Auto cretae release action(自动创建发布)
[English](README.md) | [中文](README_CN.md)

## 输入参数
### token
**非必填** 操作github的token。默认值`${{ github.token }}`

### name
**必填** 发布的名称。

### code
**必填** 发布的code

### body
**非必填** 发布的内容。默认值为空

### prerelase
**非必填** 是否是预发布，默认值为false

### recreate
**非必填** 是否重新创建

### assets
**非必填** 需要上传到发布的assets文件


## 使用示例
```
uses: jardenliu/auto-release@v0.1
with: 
    token: ${{github.token}}
    name: latest release
    code: latest
    prerelease: false
    recreate: true
    assets: >
      source.txt:target.txt:text/plain
      another.json:one.json:application/json
```