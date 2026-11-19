// Keeps a global Git config hook installed so a new linked worktree opens
// an unnamed herdr space (and can nest under its repo). Does not change
// where worktrees are created.
import { View, div } from "gpui-kit";
import { exec, appHome } from "herdr";

const HOOK_NAME = "worktree-nest";
const HOOK_EVENT = "post-checkout";

export default class WorktreeNest extends View {
  init(_props, cx) {
    cx.spawn(async () => {
      await this.removeLegacyHooksPath();
      await this.ensureGlobalConfig(`hook.${HOOK_NAME}.event`, HOOK_EVENT);
      await this.ensureGlobalConfig(`hook.${HOOK_NAME}.command`, this.hookScript());
    });
  }

  hookScript() {
    return `${appHome()}/mods/worktree-nest/scripts/on-checkout`;
  }

  legacyHooksDir() {
    return `${appHome()}/mods/worktree-nest/hooks`;
  }

  async readGlobalConfig(args) {
    const result = await exec("git", ["config", "--global", ...args]);
    return (result.stdout || "").trim();
  }

  async ensureGlobalConfig(key, value) {
    if ((await this.readGlobalConfig(["--get-all", key])) === value) return;
    await exec("git", ["config", "--global", "--replace-all", key, value]);
  }

  async removeLegacyHooksPath() {
    const current = await this.readGlobalConfig(["--type=path", "--get", "core.hooksPath"]);
    if (current.replace(/\/$/, "") !== this.legacyHooksDir()) return;
    await exec("git", ["config", "--global", "--unset", "core.hooksPath"]);
  }

  render() {
    return div().id("worktree-nest");
  }
}
