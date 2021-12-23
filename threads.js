/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
  const scr = args._[0];
  const host = args._[1];
	if (args.help || !scr || !host) {
		ns.tprint("How many threads can be run on a host");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SCRIPT HOST`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} basic-hack.js home`);
		return;
	}

  ns.tprint(`host ${host}`);
  const max = ns.getServerMaxRam(host);
  const used = ns.getServerUsedRam(host);
  const available = max - used;
  ns.tprint(`available ${available}`);
  const hackRam = ns.getScriptRam(scr, host);
  ns.tprint(`hackRam ${hackRam}`);

  const t = Math.ceil(available / hackRam);
  ns.tprint(`Max threads for ${host} is ${t}`);
}
