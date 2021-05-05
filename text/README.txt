# VRChat Join Notifier

VRChatで同じインスタンスにjoinしたユーザ名を表示するツールです。
表示はWindowsのトースト通知とXSOverlayのVR内通知を利用できます。

# 使い方

## 起動方法

同じフォルダにあるvrchat-join-notifier.exeを実行します。
コマンドプロンプトが開くので、閉じずに実行したままにします。

## 終了方法

コマンドプロンプトのウインドウを閉じます。

## アンインストール

このファイルが入っているフォルダを削除します。

# 設定ファイル

同じフォルダにあるjoin-notifier.jsonを編集します。
設定変更はツールの再起動で適用されます。
設定はすべて省略可です。

- interval
更新間隔を指定します。1秒以下にするとCPU負荷が増えます。

- specificNames
別の通知音を使うユーザ名を指定します。

- specificExec
specificNamesで指定したユーザ名を通知するとき、実行するコマンドを指定します。

- isToast
トースト通知のON/OFFを切り替えます。

isXSOverlay
XSOverlay通知のON/OFFを切り替えます。

## 設定ファイルの例

{
    "interval": "2",
    "specificNames": ["myFriendName1", "myFriendNAme2"],
    "specificExec": "echo ${{names}}",
    "isToast": true,
    "isXSOverlay": true
}

# 免責事項

本ツールを使用して発生したすべての問題や損害について、制作者は一切の責任を負いません。

## リンク

頒布元
https://github.com/kamakiri01/vrchat-join-notifier
