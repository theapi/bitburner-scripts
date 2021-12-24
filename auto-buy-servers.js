

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const ram = args._[0];
  const script = args._[1];
  const target = args._[2];
	if (args.help || !ram || !script || !target) {
		ns.tprint("Buy and run servers automatically.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} RAM SCRIPT`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} 8 basic-hack.js n00dles`);
		return;
	}

// @TODO select which server to hack automatically

  // Continuously try to purchase servers until we've reached the maximum
  // amount of servers
  let i = 0;
  while (i < ns.getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
        let host = ns.purchaseServer("x-" + i, ram);
        await ns.scp(script, host);

        const max = ns.getServerMaxRam(host);
        const used = ns.getServerUsedRam(host);
        const available = max - used;
        ns.tprint(`available ${available}`);
        const hackRam = ns.getScriptRam(script, host);
        ns.tprint(`hackRam ${hackRam}`);

        const threads = Math.floor(available / hackRam);
        ns.tprint(`Max threads for ${host} is ${threads}`);

        ns.exec(script, host, threads, target);
        ++i;
    }
    await ns.sleep(30000);
  }

}