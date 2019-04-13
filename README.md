# vscode-oat

Auto transformation from object accesses to safer (nullable) object accesses. e.g. && chain.

## Example

![vscode-oat](https://raw.githubusercontent.com/orenaksakal/vscode-oat/master/images/vscode-oat.gif)

## Extension Settings

Only && chain is available by 1.0.0 as it seems to be most optimal solution https://jsperf.com/nullableobjectpropertiesaccessor

Possible additional options:
- Ternary operator
- Elvis like
- try catch

## Release Notes

Major and minor release change log

### 1.0.0

Initial release of vscode-oat
