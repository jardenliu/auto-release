# Auto cretae release action
[English](README.md) | [中文](README_CN.md)

## Inputs
### token
**Not required** github token for action. defalut: `${{ github.token }}`

### name
**Required** new release name。

### code
**Required** code for new release

### body
**Not required** release body content. defalut: ''

### prerelase
**Not required** is prerelease or not. defalut: false

### recreate
**Not required** recreate or not

### assets
**Not required** auto upload assets for this new release


## Example usage
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