import { join } from "node:path";
import { rm } from "node:fs/promises";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

function log(cmd) {
  console.log(`========== ${cmd} ==========`);
}

async function clean() {
  log("clean");
  await Promise.all([
    rm(join(process.cwd(), "dist"), { recursive: true, force: true }),
    rm(join(process.cwd(), "node_modules"), { recursive: true, force: true }),
  ]);
  log("cleaned");
}

async function install() {
  log("install");
  await execAsync("npm ci");
  log("installed");
}

async function build() {
  log("build");
  await execAsync("npm run build");
  log("built");
}

async function test() {
  await clean();
  await install();
  await build();
}

test();
