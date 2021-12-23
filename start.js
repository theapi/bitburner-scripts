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

  // What kind of home server do we have?
  let availableRam = ns.getServerUsedRam("home");
  if (availableRam < 4000) {
    // Early days, use the othe startup script
    ns.exec("startup.script", "home");
    ns.exit();
  }

  // Get some quick cash and hacking points.
  const hackRam = ns.getScriptRam("basic-hack.js", "home") + 512;
  let t = Math.floor(availableRam / hackRam);
  const noodles = ns.exec("basic-hack.js", "home", t, "n00dles");
  let money = ns.getServerMoneyAvailable("home");

  while (money < 4000000) {
    await ns.sleep(2000);
    money = ns.getServerMoneyAvailable("home");
  }

  ns.kill("basic-hack.js", "home", t, "n00dles");

  // Damn can't buy TOR until later :(
  // https://github.com/danielyxie/bitburner/blob/dev/markdown/bitburner.singularity.purchasetor.md
  // // Buy the port hacking programs.
  // let money = ns.getServerMoneyAvailable("home");
  // // Wait untill the TOR server can be bought.
  // while (money < 200000) {
  //   await ns.sleep(2000);
  //   money = ns.getServerMoneyAvailable("home");
  // }





  // Run the money makers.
}