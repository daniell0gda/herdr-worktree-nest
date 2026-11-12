// Keeps a shared Git hooksPath installed so a new linked worktree opens
// an unnamed herdr space (and can nest under its repo). Does not change
// where worktrees are created.
import { View, div } from "gpui-kit";
import { exec, appHome, notify, shared, setShared } from "herdr";

export default class WorktreeNest extends View {
  init(_props, cx) {
    cx.spawn(async () => {
      await this.ensureHooksPath();
    });
  }

  hooksDir() {
    return `${appHome()}/mods/worktree-nest/hooks`;
  }

  async ensureHooksPath() {
    const dir = this.hooksDir();
    const got = await exec("git", ["config", "--global", "--get", "core.hooksPath"]);
    const current = (got.stdout || "").trim();
    const home = ((await exec("sh", ["-c", "printf %s \"$HOME\""])).stdout || "").replace(/\/$/, "");
    const resolved = current.replace(/^~(?=\/|$)/, home).replace(/\/$/, "");
    const ours = dir.replace(/\/$/, "");
    if (!current) {
      await exec("git", ["config", "--global", "core.hooksPath", dir]);
      return;
    }
    if (resolved === ours) return;
    if (shared("worktree-nest.hooksPathWarned") === current) return;
    setShared("worktree-nest.hooksPathWarned", current);
    notify({
      title: "Worktree nest: Git hooksPath is already set",
      body: `core.hooksPath is ${current}, so new worktrees will not auto-open as herdr spaces.`,
      level: "warning",
      timeout: 8000,
    });
  }

  render() {
    return div().id("worktree-nest");
  }
}
