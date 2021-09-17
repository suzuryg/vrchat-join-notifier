# VRChat Join Notifier

VRChat を起動中、同じインスタンスへの join/leave を通知する node.js コマンドラインツールです。
windows 向け単体実行ファイルを Release しています。

## Usage

```
$ ./bin/run -t join"
```

### Install

コマンドライン上で利用する場合、Node.js が必要です。

```
git clone git@github.com:kamakiri01/vrchat-join-notifier.git
cd vrchat-join-notifier
$ npm install
$ npm run build
```

`vn` コマンドとしてグローバルにインストールする場合、

```
$ npm install -g
```

### Run

```
$ ./bin/run
```

または、グローバルにインストールした場合、

```
$ vn
```

または、`vrchat-join-notifier.exe` を実行します。

### Options

* `-s --specific-names <name...>`:
  specific notification names(with another notification sound)
* `-se, --specific-exec <command>`:
  exec command when match specific names. Replace %{{names}} in command text with join user names. ex: -s mySpecialFriendName -se "echo %{{names}}"
* `-i, --interval <sec>`
  specify check interval (default: "2")
* `-nt, --no-toast`
  prevent toast notification
* `-nx, --no-xsoverlay`
  prevent xsoverlay notification

and other options. see `-h` option.

### Giving coffee

コーヒー代を受け付けています。
[VRChatJoinNotifier - Iwanuki S.P.A. - BOOTH](https://iwanuki.booth.pm/items/2947584)
