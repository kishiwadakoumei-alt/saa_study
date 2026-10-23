# SAA 演習室 — GitHub Pages 対応版（60問）

Lovableもサーバーも不要な、静的HTML/JavaScriptのAWS SAA-C03演習サイトです。問題はすべてローカルに入っています。

## 使い方（PCで試す）

`index.html` をダブルクリックしてブラウザで開いてください。インターネット接続は不要です。

## URLで公開する（GitHub Pages）

1. 個人のGitHubアカウントで**新しいPublicリポジトリ**を作成します（例：`saa-study`）。元サイトへの編集権限は不要です。
2. このZIPを解凍し、`index.html`、`styles.css`、`app.js`、`data`フォルダ、`.nojekyll` をリポジトリのルートにアップロードしてコミットしてください。**ZIPファイル自体をアップロードしても動きません**。
3. リポジトリの Settings → Pages → Build and deployment → Source で `Deploy from a branch` を選び、Branch=`main`、Folder=`/(root)` → Save。
4. 数分後に `https://GitHubユーザー名.github.io/saa-study/` から開けるようになります。実際のURLはPages設定画面に表示されます。

## 追加問題の増やし方

- `data/questions-201-260.js`と同じ形式で、次の問題セット `data/questions-261-300.js` を用意。
- `window.SAA_QUESTION_BANKS = (window.SAA_QUESTION_BANKS || []).concat([/* 問題オブジェクト */]);` のように追記。
- `index.html`内で`app.js`より**前**に`<script src="./data/questions-261-300.js"></script>`を追加。
- IDを重複させないこと。収録数は自動集計されます。

### 問題のデータ構造

```json
{
  "id": 261,
  "domain": 1,
  "subtopic": "1.1 IAM role",
  "diff": 2,
  "type": "single",
  "text": "設問の文章",
  "choices": [{"key":"A","text":"選択肢A"},{"key":"B","text":"選択肢B"},{"key":"C","text":"選択肢C"},{"key":"D","text":"選択肢D"}],
  "correct": ["A"],
  "explanation": "正解の根拠と考え方",
  "wrong_reasons": {"B":"不正解の理由", "C":"不正解の理由", "D":"不正解の理由"}
}
```

- `domain`: 1 セキュリティ / 2 レジリエンス / 3 高パフォーマンス / 4 コスト最適化
- `diff`: 1 初級 / 2 中級 / 3 上級
- `type`: `single` (正解1つ) または `multi` (正解複数)
- `correct`: 正解のキーを配列で指定。
- 全選択肢の理由を持たせ、AWS公式仕様と矛盾しないかレビューしてください。

## 学習履歴

- 問題履歴はブラウザの`localStorage`に自動保存されます。URL・ドメイン・ブラウザが変わると原則引き継がれません。
- ホームの「履歴を書き出す」「履歴を読み込む」でバックアップ・移行できます。
- 問題数を追加するだけなら同じURLで履歴は維持されます（URLを変えずにGitHub Pagesを更新してください）。

## 現在の対応状況

- 問題数：60問（オリジナル第1弾）
- 回答後に正解・不正解と全選択肢の理由を確認
- 単一選択はクリックで採点 / 複数選択は「回答する」で採点
- 分野・難易度・未回答でフィルタ / 間違いだけ復習 / 分野別の進捗 / 履歴のJSON入出力
- 本番と同じ65問・130分模擬試験は**未実装**。問題数増加とレビュー後に追加予定。

※ この問題集はAWSの公式試験ではありません。1,000問になっても合格保証はできません。
