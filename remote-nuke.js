/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	if (args.help || args._.length < 1) {
		ns.tprint("This script nukes the target host.");
		ns.tprint(`Usage: run ${ns.getScriptName()} HOST `);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles`);
		return;
	}

	const target = args._[0];

	if (!ns.serverExists(target)) {
		ns.tprint(`Server '${target}' does not exist. Aborting.`);
		return;
	}

  const programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe",
  "HTTPWorm.exe", "SQLInject.exe"];
for (let i = 0; i < programs.length; ++i) {
  if (ns.fileExists(programs[i], "home")) {
    if (i === 0) { ns.brutessh(target); }
    if (i === 1) { ns.ftpcrack(target); }
    if (i === 2) { ns.relaysmtp(target); }
    if (i === 3) { ns.httpworm(target); }
    if (i === 4) { ns.sqlinject(target); }
  }
}

  ns.nuke(target);
}
