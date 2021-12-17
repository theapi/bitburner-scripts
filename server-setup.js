/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const host = args._[0];
	if (args.help || !host) {
		ns.tprint("This script will buy a server of ram size given.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} NAME `);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} pserv-1`);
		return;
	}
	if (!ns.serverExists(host)) {
		ns.tprint(`Server '${host}' does not exist. Aborting.`);
		return;
	}

  ns.tprint("Copying scripts...");

  const scripts = [
    'do-grow.js',
    'do-weaken.js',
    'do-hack.js',
    'remote-nuke.js',
    'nectar-net.js',
  ];
  for (const scr of scripts) {
	  ns.tprint(`Copying '${scr}' to '${host}' `);
	  await ns.scp(scr, ns.getHostname(), host);
  }

}