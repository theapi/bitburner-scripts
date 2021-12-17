/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const name = args._[0];
	const ram = args._[1];
	if (args.help || !ram) {
		ns.tprint("This script will buy a server of ram size given.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} NAME RAM_SIZE`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} pserv-1 32`);
		return;
	}

	const cost = ns.getPurchasedServerCost(ram);
	const costFmt = new Intl.NumberFormat().format(cost);
	ns.tprint(`Cost of ${ram} server is ${costFmt}`);
	if (ns.getServerMoneyAvailable("home") > cost) {
		const want = await ns.prompt(`Do you want to buy it for \$${costFmt}?`);
		if (want) {
			const hostname = ns.purchaseServer(name, ram);
			ns.tprint(`Bought ${hostname}`);
			return;
		}
		ns.tprint(`Not buying server with ${ram} ram`);
		return;
	}

	ns.tprint(`Bummer, can't afford ${cost}`);
}