import { join } from "node:path";
import { rm } from "node:fs/promises";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const packageManager = {
  name: "npm",
  install: () => runCommand("npm ci"),
  build: () => runCommand("npm run build"),
};

async function runCommand(cmd) {
  try {
    return await execAsync(cmd, { stdio: "inherit" });
  } catch (error) {
    throw new Error(
      `Error: the command: ${cmd} exited with exit code ${
        error.code
      }.\n======= STDOUT =======:\n${
        error.stdout || "<none>"
      }\n======= STDERR =======:\n${error.stderr || "<none>"}\n`
    );
  }
}

function log(cmd) {
  console.log(`- ${cmd}`);
}

async function clean() {
  log("cleaning...");
  await Promise.all([
    rm(join(process.cwd(), "dist"), { recursive: true, force: true }),
    rm(join(process.cwd(), ".yarn"), { recursive: true, force: true }),
    rm(join(process.cwd(), "node_modules"), { recursive: true, force: true }),
  ]);
}

async function install() {
  log(`installing...`);
  await packageManager.install();
}

async function build() {
  log(`building...`);
  await packageManager.build();
}

async function test() {
  log(`testing package manager: ${packageManager.name}`);
  await clean();
  await install();
  await build();
  log("done ✅");
}

test();
