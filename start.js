
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

  // Log to Elasticsearch.
  ns.exec("remote-log.js", "home");

  // Get some quick cash and hacking points.
  // but keep sone ram free.
  let t = numThreads(ns, "basic-hack.js", "home", 8);
  ns.exec("basic-hack.js", "home", t, "n00dles");

  // Tor = 200,000
  let money = ns.getServerMoneyAvailable("home");
  while (money < 210000) {
    await ns.sleep(2000);
    money = ns.getServerMoneyAvailable("home");
  }
  if (!ns.purchaseTor()) {
    ns.tprint("Tor purchase failed");
    // No idea why, bail...
    ns.exit();
  }

  /*
BruteSSH.exe - $500.000k - Opens up SSH Ports.
FTPCrack.exe - $1.500m - Opens up FTP Ports.
relaySMTP.exe - $5.000m - Opens up SMTP Ports.
HTTPWorm.exe - $30.000m - Opens up HTTP Ports.
SQLInject.exe - $250.000m - Opens up SQL Ports.
  */

  // Buy brutessh
  if (!ns.fileExists("BruteSSH.exe", "home")) {
    money = ns.getServerMoneyAvailable("home");
    while (money < 500000) {
      await ns.sleep(2000);
      money = ns.getServerMoneyAvailable("home");
    }
    if (!ns.purchaseProgram("BruteSSH.exe")) {
      ns.tprint("BruteSSH purchase failed");
      ns.exit();
    }
  }

  // Time for joesguns
  ns.kill("basic-hack.js", "home", t, "n00dles");
  let t = numThreads(ns, "basic-hack.js", "home", 8);
  ns.exec("basic-hack.js", "home", t, "joesguns");

  // Buy FTPCrack.exe
  if (!ns.fileExists("FTPCrack.exe", "home")) {
    money = ns.getServerMoneyAvailable("home");
    while (money < 1500000) {
      await ns.sleep(2000);
      money = ns.getServerMoneyAvailable("home");
    }
    if (!ns.purchaseProgram("FTPCrack.exe")) {
      ns.tprint("FTPCrack.exe purchase failed");
      ns.exit();
    }
  }
}