# Task Board — CLAUDE.md

## Project Overview

タスク管理ボードアプリケーション。

## Git Rules

**コードを変更するたびに必ずGitHubへプッシュすること。**

具体的な手順：

1. 変更をステージングする（機密ファイルは除外）
2. 意味のあるコミットメッセージでコミットする
3. `git push origin <branch>` でリモートへプッシュする

```
git add <changed-files>
git commit -m "説明的なメッセージ"
git push origin <branch>
```

### ブランチ戦略

- `main` — 本番相当。直接コミット禁止。
- `dev` — 開発作業ブランチ。通常はここで作業してプッシュ。
- 機能ごとにフィーチャーブランチを切っても良い。

### コミットメッセージ規則

- 1行目は日本語または英語で「何をしたか」を簡潔に記述
- `fix:` / `feat:` / `refactor:` / `docs:` などのプレフィックスを使う
- Co-Authored-By 行を末尾に追加する（Claude が作業した場合）

### 禁止事項

- `--force` push to `main`
- `--no-verify` でフックをスキップすること
- `.env` や認証情報をコミットすること

## Development

（技術スタックが決まったらここに追記する）

## Notes

- プロジェクト固有のルールができたらこのファイルを更新すること
