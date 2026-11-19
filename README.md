# herdr-worktree-nest

A small [herdr-app](https://herdr.dev) mod. When you run `git worktree add`, it opens a new herdr space for the new folder. The Spaces sidebar then shows that space under its repo.

## Features

- Opens a herdr space automatically for every new git worktree.
- Nests the new space under its repo in the Spaces sidebar.
- Works in every repo on your machine. You do not set it up per repo.
- Does not add a second space if the folder already has one.
- Keeps your focus. After it opens the new space, it switches back to the space and tab you were using.
- Still runs each repo's own hooks (for example Git LFS).
- Never breaks a git command. If herdr is not running, git continues as normal.
- Does not choose where worktrees are created.

## Requirements

- [herdr-app](https://herdr.dev)
- git
- Python 3
- Linux or macOS

## Install

1. Clone the repo and link the mod into herdr:

   ```sh
   git clone https://github.com/daniell0gda/herdr-worktree-nest.git
   cd herdr-worktree-nest
   ln -sfn "$PWD/mods/worktree-nest" ~/.config/herdr-app/mods/worktree-nest
   ```

2. Check that herdr accepts the mod:

   ```sh
   herdr-app check ~/.config/herdr-app/mods/worktree-nest
   ```

3. Tell git to use the mod's hooks:

   ```sh
   git config --global core.hooksPath ~/.config/herdr-app/mods/worktree-nest/hooks
   ```

   If `core.hooksPath` is already set to something else, do not overwrite it. Overwriting it would skip your other global hooks. Call this mod's hook from your existing hooks folder instead.

4. Optional: add this hidden block to your herdr layout. The mod then keeps `core.hooksPath` set for you.

   ```json
   {
     "id": "worktree-nest",
     "type": "block",
     "content": { "mod": "worktree-nest" },
     "hidden": true,
     "size": { "px": 0 }
   }
   ```

   The hook works without this block once `core.hooksPath` is set.

## Use

Create a worktree as usual:

```sh
git worktree add ../my-feature my-feature
```

A new herdr space opens for `../my-feature`.

A new space nests under a project space only when that space's first terminal (or folder) is the repo's main checkout.

## Uninstall

```sh
git config --global --unset core.hooksPath
rm ~/.config/herdr-app/mods/worktree-nest
```

Remove the hidden block from your layout too, if you added it.
