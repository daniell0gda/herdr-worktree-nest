# herdr-worktree-nest

A personal [herdr-app](https://herdr.dev) mod. When `git worktree add` creates a linked worktree, it opens an unnamed herdr space on that folder so the shipped Spaces sidebar can nest it under the repo. It does not choose where worktrees are created.

The mod registers a global Git config hook (`hook.worktree-nest.*`). Git runs it for every repository, in addition to the repository's own hooks. A repository can set its own `core.hooksPath` (for example husky) and the hook still runs. If that folder already has a space, nothing is added.

It needs a Git version with config-based hooks (tested with 2.56).

## Install

```sh
ln -sfn "$PWD/mods/worktree-nest" ~/.config/herdr-app/mods/worktree-nest
herdr-app check ~/.config/herdr-app/mods/worktree-nest
```

Add a hidden block to your layout so the mod can keep the Git config hook installed:

```json
{
  "id": "worktree-nest",
  "type": "block",
  "content": { "mod": "worktree-nest" },
  "hidden": true,
  "size": { "px": 0 }
}
```

Without the layout block, add the hook yourself:

```sh
git config --global hook.worktree-nest.event post-checkout
git config --global hook.worktree-nest.command ~/.config/herdr-app/mods/worktree-nest/scripts/on-checkout
```

The mod removes an older global `core.hooksPath` that pointed at this mod's `hooks` folder.

A new space opens for any repository. It nests under a project space only when that space's first terminal (or folder) is the repo's main checkout.
