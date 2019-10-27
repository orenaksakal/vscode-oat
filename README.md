# vscode-oat

Auto transformation between unsafe attribute accesses to exception free nullable accesses. E.g. && chain.

## Example

![vscode-oat](https://raw.githubusercontent.com/orenaksakal/vscode-oat/master/images/vscode-oat.gif)

## Extension Settings

Only and chain (&&) available at the moment as it seems to be most optimal solution https://jsperf.com/nullableobjectpropertiesaccessor

Future options:
- Ternary operator
- Elvis like
- try catch

## Release Notes

Major and minor release change log

### 1.0.0

Initial release of vscode-oat
