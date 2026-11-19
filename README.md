# herdr-worktree-nest

A small [herdr-app](https://herdr.dev) mod. When you run `git worktree add`, it opens a new herdr space for the new folder. The Spaces sidebar then shows that space under its repo.

## Features

- Opens a herdr space automatically for every new git worktree.
- Nests the new space under its repo in the Spaces sidebar.
- Works in every repo on your machine. You do not set it up per repo.
- Works in repos that set their own `core.hooksPath` (for example husky).
- Does not add a second space if the folder already has one.
- Keeps your focus. After it opens the new space, it switches back to the space and tab you were using.
- Does not replace any hook. Git runs each repo's own hooks (for example Git LFS) as usual.
- Never breaks a git command. If herdr is not running, git continues as normal.
- Does not choose where worktrees are created.

## Requirements

- [herdr-app](https://herdr.dev)
- git with config-based hooks (tested with 2.56)
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

3. Tell git to run the mod's hook after each checkout:

   ```sh
   git config --global hook.worktree-nest.event post-checkout
   git config --global hook.worktree-nest.command ~/.config/herdr-app/mods/worktree-nest/scripts/on-checkout
   ```

   This hook runs in addition to your other hooks. It does not change `core.hooksPath`.

4. Optional: add this hidden block to your herdr layout. The mod then keeps the Git config hook set for you.

   ```json
   {
     "id": "worktree-nest",
     "type": "block",
     "content": { "mod": "worktree-nest" },
     "hidden": true,
     "size": { "px": 0 }
   }
   ```

   The hook works without this block once step 3 is done.

### Upgrade from the `core.hooksPath` version

Older versions set `core.hooksPath` to this mod's `hooks` folder. That folder no longer exists. The mod removes that setting when herdr loads it. Without the layout block, remove it yourself:

```sh
git config --global --unset core.hooksPath
```

## Use

Create a worktree as usual:

```sh
git worktree add ../my-feature my-feature
```

A new herdr space opens for `../my-feature`.

A new space nests under a project space only when that space's first terminal (or folder) is the repo's main checkout. Without such a space, the new space appears at the top level.

## Uninstall

Remove the hidden block from your layout first, if you added it. Then run:

```sh
git config --global --unset-all hook.worktree-nest.event
git config --global --unset hook.worktree-nest.command
rm ~/.config/herdr-app/mods/worktree-nest
```
