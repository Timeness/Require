const fs = require("fs");
const { spawn } = require("child_process");

class BotService {
  static currentProcess = null;
  static langMap = {
    python: (entry) => ["python", [entry]],
    js: (entry) => ["node", [entry]],
    ts: (entry) => ["ts-node", [entry]],
    ruby: (entry) => ["ruby", [entry]],
    java: (entry) => ["java", [entry]],
    lua: (entry) => ["lua", [entry]],
    php: (entry) => ["php", [entry]]
  };

  static loadConfig() {
    const configPath = "deploy.config.json";
    if (!fs.existsSync(configPath)) {
      throw new Error("deploy.config.json not found.");
    }
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (!this.langMap[config.language]) {
      throw new Error(`Unsupported language: ${config.language}`);
    }

    return config;
  }

  static run() {
    const config = this.loadConfig();
    if (this.currentProcess) {
      this.currentProcess.kill();
      console.log("Previous process killed.");
    }

    const [cmd, args] = this.langMap[config.language](config.entry);
    console.log(`Starting bot: ${cmd} ${args.join(" ")}`);
    this.currentProcess = spawn(cmd, args, { stdio: "inherit" });
    this.currentProcess.on("exit", (code) => {
      console.log(`Bot exited with code ${code}.`);
      this.currentProcess = null;
    });
  }

  static stop() {
    if (this.currentProcess) {
      this.currentProcess.kill();
      console.log("Bot stopped.");
      this.currentProcess = null;
    } else {
      console.log("No active process to stop.");
    }
  }

  static restart() {
    console.log("Restarting bot...");
    this.stop();
    setTimeout(() => this.run(), 1000);
  }
}


if (require.main === module) {
  const command = process.argv[2];
  switch (command) {
    case "run":
      BotService.run();
      break;
    case "stop":
      BotService.stop();
      break;
    case "restart":
      BotService.restart();
      break;
    default:
      console.log("Usage: node graphy/app.js [run|stop|restart]");
  }
} else {
  module.exports = BotService;
  }
