
/** @param {NS} ns **/

function myMoney(ns) {
  return ns.getServerMoneyAvailable("home");
}

export async function main(ns) {
  const args = ns.flags([["help", false]]);
  if (args.help) {
    ns.tprint("This script buys hacknets.");
    ns.tprint(`Usage: run ${ns.getScriptName()}`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()}`);
    return;
  }

  ns.disableLog("getServerMoneyAvailable");
  ns.disableLog("sleep");


  let cnt = 8;

  while (ns.hacknet.numNodes() < cnt) {
    let res = ns.hacknet.purchaseNode();
    ns.print(`Purchased ns.hacknet Node with index: ${res}`);
  };

  for (let i = 0; i < cnt; i++) {
    while (ns.hacknet.getNodeStats(i).level < 200) {
      let cost = ns.hacknet.getLevelUpgradeCost(i, 1);
      while (myMoney(ns) < cost) {
        ns.print(`Level upgrade needs ${cost}`);
        await ns.sleep(3000);
      }
      ns.hacknet.upgradeLevel(i, 1);
    };
  };


  for (let i = 0; i < cnt; i++) {
    while (ns.hacknet.getNodeStats(i).ram < 32) {
      let cost = ns.hacknet.getRamUpgradeCost(i, 1);
      while (myMoney(ns) < cost) {
        ns.print(`Ram upgrade needs ${cost}`);
        await ns.sleep(3000);
      }
      ns.hacknet.upgradeRam(i, 1);
    };
  };


  for (var i = 0; i < cnt; i++) {
    while (ns.hacknet.getNodeStats(i).cores < 10) {
      var cost = ns.hacknet.getCoreUpgradeCost(i, 1);
      while (myMoney(ns) < cost) {
        ns.print(`Core upgrade needs ${cost}`);
        await ns.sleep(3000);
      }
      ns.hacknet.upgradeCore(i, 1);
    };
  };
}
