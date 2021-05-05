# VRChat Join Notifier

VRChatで同じインスタンスにjoinしたユーザ名を表示するツールです。
表示はWindowsのトースト通知とXSOverlayのVR内通知を利用できます。
（XSOverlayの通知を利用するには、事前にXSOverlayの導入が必要です）

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
設定項目は省略できます。設定ファイルが無い場合はデフォルト設定が適用されます。

- interval
チェック間隔を指定します。1秒以下にするとCPU負荷が増えます。

- specificNames
別の通知音を使うユーザ名を指定します。（音の変更はトースト通知のみ有効）

- specificExec
specificNamesで指定したユーザ名を通知したとき、実行するコマンドを指定します。

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
https://iwanuki.booth.pm/items/2947584
