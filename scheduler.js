/** @param {NS} ns **/
export async function main(ns) {
  const args = ns.flags([['help', false]]);
  const host = args._[0];
  if (args.help || !host) {
    ns.tprint("Managed hacking of a server.");
    ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()} n00dles`);
    return;
  }

  // Defines how much money a server should have before we hack it
  const maxMoney = ns.getServerMaxMoney(host);
  const moneyThresh = maxMoney * 0.70;
  ns.print(`maxMoney: ${new Intl.NumberFormat().format(maxMoney)}`);
  ns.print(`moneyThresh: ${new Intl.NumberFormat().format(moneyThresh)}`);

  //while (true) {
  const server = ns.getServer(host);
  const player = ns.getPlayer();
  const hPercent = ns.formulas.hacking.hackPercent(server, player);
  ns.tprint(`hack percent: ${hPercent}`);
  const hTime = ns.formulas.hacking.hackTime(server, player);
  ns.tprint(`hack time: ${hTime}`);
  const weakenTime = ns.formulas.hacking.weakenTime(server, player);
  ns.tprint(`weaken time: ${weakenTime}`);

  // Take 0.5% of the server cash
  const ht = 100 / hPercent / 100 / 2;
  ns.tprint(`number of threads: ${ht}`);

  const wPid = ns.exec('do-weaken.js', 'home', ht, host);
  ns.tprint(`wPid: ${wPid}`);
  const hPid = ns.exec('do-hack.js', 'home', ht, host, weakenTime);
  ns.tprint(`hPid: ${hPid}`);


  await ns.sleep(5000);
  //}
}
