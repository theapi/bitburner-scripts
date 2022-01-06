
function numThreads(ns, script, host, reserveRam = 0) {
  const max = ns.getServerMaxRam(host);
  const used = ns.getServerUsedRam(host) + reserveRam;
  const available = max - used;
  const hackRam = ns.getScriptRam(script, host);

  return Math.floor(available / hackRam);
}

/** @param {NS} ns **/
export async function main(ns) {
  const args = ns.flags([['help', false]]);
  if (args.help) {
    ns.tprint("Run when starting again");
    ns.tprint(`USAGE: run ${ns.getScriptName()}`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()}`);
    return;
  }

  ns.disableLog("getServerMoneyAvailable");

  // Log to Elasticsearch.
  ns.exec("remote-log.js", "home");

  // Get some quick cash and hacking points.
  // but keep sone ram free.
  let t = numThreads(ns, "basic-hack.js", "home", 10);
  ns.exec("basic-hack.js", "home", t, "n00dles");

  // Tor = 200,000
  let money = ns.getServerMoneyAvailable("home");
  while (money < 210000) {
    await ns.sleep(2000);
    money = ns.getServerMoneyAvailable("home");
  }
  ns.purchaseTor();
  ns.tprint("Tor got");

  /*
BruteSSH.exe - $500.000k - Opens up SSH Ports.
FTPCrack.exe - $1.500m - Opens up FTP Ports.
relaySMTP.exe - $5.000m - Opens up SMTP Ports.
HTTPWorm.exe - $30.000m - Opens up HTTP Ports.
SQLInject.exe - $250.000m - Opens up SQL Ports.
  */

  // Buy brutessh
  if (!ns.fileExists("BruteSSH.exe", "home")) {
    ns.tprint("Starting brutessh buying process");
    money = ns.getServerMoneyAvailable("home");
    while (money < 500000) {
      ns.tprint(" brutessh not enought money yet");
      await ns.sleep(5000);
      money = ns.getServerMoneyAvailable("home");
    }
    if (!ns.purchaseProgram("BruteSSH.exe")) {
      ns.tprint("BruteSSH purchase failed");
      ns.exit();
    }
  }

  // Buy FTPCrack.exe
  if (!ns.fileExists("FTPCrack.exe", "home")) {
    money = ns.getServerMoneyAvailable("home");
    while (money < 1600000) {
      await ns.sleep(5000);
      money = ns.getServerMoneyAvailable("home");
    }
    if (!ns.purchaseProgram("FTPCrack.exe")) {
      ns.tprint("FTPCrack.exe purchase failed");
      ns.exit();
    }
  }

  // Auto buy servers to hammer joesguns
  ns.exec("auto-buy-servers.js", "home", 1, "2048", "basic-hack.js", "joesguns");

  ns.tprint("Waiting for enough money to stop attacking n00dles");
  money = ns.getServerMoneyAvailable("home");
  while (money < 10000000) {
    await ns.sleep(30000);
    money = ns.getServerMoneyAvailable("home");
  }

  // Buy relaySMTP.exe
  if (!ns.fileExists("relaySMTP.exe", "home")) {
    money = ns.getServerMoneyAvailable("home");
    ns.purchaseProgram("relaySMTP.exe");
  }

  // Time for joesguns
  ns.kill("basic-hack.js", "home", "n00dles");
  ns.tprint("restarting hack to target joesguns");
  // wait for script to die.
  await ns.sleep(2000);
  t = numThreads(ns, "basic-hack.js", "home", 10);
  ns.exec("basic-hack.js", "home", t, "joesguns");

  // Attack phantasy when ready
  let player = ns.getPlayer();
  while (player.hacking < 200) {
    await ns.sleep(20000);
    player = ns.getPlayer();
  }
  ns.kill("basic-hack.js", "home", "joesguns");
  await ns.sleep(10000);
  t = numThreads(ns, "basic-hack.js", "home", 10);
  ns.exec("basic-hack.js", "home", t, "phantasy");

  // Now bigger servers
  ns.kill("auto-buy-servers.js", "home", "2048", "basic-hack.js", "joesguns");
  ns.exec("auto-buy-servers.js", "home", 1, "8192", "basic-hack.js", "joesguns");

}