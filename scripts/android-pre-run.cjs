/**
 * PRE Android: exporta variables de build y ejecuta `expo run:android` con el applicationId `.pre`.
 *
 * Uso: node scripts/android-pre-run.cjs debug | release
 */
const { spawnSync } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");
const mode = process.argv[2] === "release" ? "release" : "debug";

const env = {
  ...process.env,
  APP_VARIANT: "pre",
  ORG_GRADLE_PROJECT_cicleparkPre: "true",
  APP_BUILD_TYPE: mode === "release" ? "release" : "debug",
};

const expoArgs = ["expo", "run:android", "--app-id", "com.anonymous.ciclepark.pre"];
if (mode === "release") {
  expoArgs.push("--variant", "release");
}

const result = spawnSync("npx", expoArgs, {
  cwd: root,
  env,
  stdio: "inherit",
  shell: true,
});

process.exit(result.status === 0 ? 0 : result.status ?? 1);
