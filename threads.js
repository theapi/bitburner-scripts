/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	let scr = args._[0];
	if (args.help) {
		ns.tprint("How many threads can be run on the current host");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SCRIPT`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} basic-hack.js`);
		return;
	}

	if (!scr) {
		scr = 'basic-hack.js';
	}
	const host = ns.getHostname();
	const max = ns.getServerMaxRam(host);
	const used = ns.getServerUsedRam(host);
	const available = max - used;
	const hackRam = ns.getScriptRam(scr, host);

	const t = Math.floor(available / hackRam);
	ns.tprint(`Max threads for ${scr} is ${t}`);
}