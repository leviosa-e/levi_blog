# 撤销和丢弃 commit

## 撤销 commit：使用 `git revert`

`git revert` 会创建一个新的 commit，以撤销指定的某次 commit。并且这次撤销也会保存在历史记录中，通过 `git log` 可以查看。

```
git revert <commit-hash>
```

## 丢弃 commit：使用 `git reset`

`git reset` 会将 commit 的代码变更，以及历史记录同时清除。如果后悔了，可以使用 `git relog` 恢复操作。

```
// 将 HEAD 指针移动到上一个提交，但保留你的更改在暂存区和工作目录中
git reset --soft HEAD~1

// 将 HEAD 指针移动到上一个提交，并且丢弃工作目录和暂存区中的更改。注意： 这个操作是不可逆的，会丢失所有未保存的更改。
git reset --hard HEAD~1

// 丢弃最近的两个提交
git reset --hard HEAD~2

// 回退到某个提交
git reset --hard <commit-hash>
```

- 应用场景：

当 本地分支的提交记录 和 远程分支的提交记录 出现分歧时，比如：

- 本地分支：commitA -> commitB -> commitC
- 远程分支：commitA -> commitB -> commitD

这种情况就会导致 `git pull` 失败，出现以下提示：

```
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.

fatal: Need to specify how to reconcile divergent branches.
```

这时候就需要使用 `git reset` 将本地分支回退到 commitB，然后才能成功 `git pull`。

> Tips：这种情况可能在多人同时开发同一个分支时出现，但最好的解决办法是不要多人共同开发同一个分支。而是各自开发一个分支，最后再一起合到 release 分支上，处理冲突，再合并到 master 分支进行发布。

### 使用 `git reflog` 恢复操作

如果你在使用 `git reset --hard` 后后悔了，`git reflog` 可以帮助你找到丢弃的提交，并恢复到那个状态：

```
git reflog
```

找到你想要恢复的提交的哈希值，然后使用 `git reset` 进行恢复：

```
git reset --hard <commit-hash>
```
