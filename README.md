# herdr-worktree-nest

A personal [herdr-app](https://herdr.dev) mod. When `git worktree add` creates a linked worktree, it opens an unnamed herdr space on that folder so the shipped Spaces sidebar can nest it under the repo. It does not choose where worktrees are created.

The shared Git hook runs for every repository (via `core.hooksPath`), then runs the repo's own hook of the same name so things like Git LFS still work. If that folder already has a space, nothing is added.

## Install

```sh
ln -sfn "$PWD/mods/worktree-nest" ~/.config/herdr-app/mods/worktree-nest
herdr-app check ~/.config/herdr-app/mods/worktree-nest
git config --global core.hooksPath ~/.config/herdr-app/mods/worktree-nest/hooks
```

If `core.hooksPath` is already set to something else, leave it alone and wire this hook in there instead — overwriting it would skip other global hooks.

Add a hidden block to your layout so the mod can keep `core.hooksPath` installed:

```json
{
  "id": "worktree-nest",
  "type": "block",
  "content": { "mod": "worktree-nest" },
  "hidden": true,
  "size": { "px": 0 }
}
```

The hook itself works without the layout block once `core.hooksPath` is set. A new space nests under a project space only when that space's first terminal (or folder) is the repo's main checkout.
