# VRChat Join Notifier

VRChat を起動中、同じインスタンスへの join を通知するコマンドラインツールです。
windows 向け実行ファイルも生成しています。

## Usage

```
$ ./bin/run -s mySpecialFriendName -se "echo %{{names}}"
```

### Install

コマンドライン上で利用する場合、Node.js が必要です。

依存モジュールの一部が GitHub Packages で公開されています。 `npm install` を実行する前に、 以下の手順が必要です。

1. GitHubアカウントの個人アクセストークンを準備します。トークンの権限は`read:packages` を含む必要があります。[参考](https://docs.github.com/ja/github/authenticating-to-github/creating-a-personal-access-token)
2. .npmrc に以下の記述を追加します。
[参考](https://docs.github.com/ja/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)

```
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

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
  exec command when match specific names. Replace %{{names}} in command text with join user names
* `-i, --interval <sec>`
  specify check interval (default: "2")
* `-nt, --no-toast`
  prevent toast notification
* `-nx, --no-xsoverlay`
  prevent xsoverlay notification

and other options. see `-h` option.
