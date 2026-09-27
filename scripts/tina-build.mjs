import { spawnSync } from "node:child_process";

const hasTinaCloud =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) &&
  Boolean(process.env.TINA_TOKEN);

const args = hasTinaCloud
  ? ["build", "--noTelemetry"]
  : ["build", "--local", "--skip-cloud-checks", "--noTelemetry"];

const result = spawnSync("tinacms", args, {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
