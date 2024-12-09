# Gamepad API ハンズオン

[Gamepad API](https://developer.mozilla.org/ja/docs/Web/API/Gamepad_API) を使って、接続したゲームパッドの状態を取得する。

[ライブデモ](https://seotaro.github.io/gamepad-api-hands-on/)

## 実行例

- Logicool Gamepad F310

![image](https://user-images.githubusercontent.com/46148606/149670715-3cf6635d-0d6e-473f-9892-5961542e4f70.png)

## メモ

共通

- ジャイロ（モーション）には対応していない。

Mac & Chrome

- ゲームインターフェイスモード（XInput|DirectInput）の切り替えができるモデルは DirectInput モードにすること。
  - Logicool Gamepad F310はDirectInput モードにすると LT / RT がアナログではなくデジタルになってしまった。
- DualSense ワイヤレスコントローラーは有線|無線（Bluetooth）で接続してそのまま使えた。

![PXL_20220116_170910870 PORTRAIT](https://user-images.githubusercontent.com/46148606/149670430-ea9eef13-f26d-4eed-8fdb-8cc08d6e8a29.jpg)
