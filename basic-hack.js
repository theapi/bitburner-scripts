/** @param {NS} ns **/

// Send to external logger for analysis.
async function remoteLog(ns, action, target, value) {

	await ns.wget(
		`https://192.168.0.2:8080/${action}/${target}/${value}`,
		"junk.txt"
	);

	const v = ns.getServerSecurityLevel(target);
	const vFmt = new Intl.NumberFormat().format(v);
	ns.print(`Security of server: ${vFmt}`);

	const money = ns.getServerMoneyAvailable(target);
	const moneyFmt = new Intl.NumberFormat().format(money);
	ns.print(`Money on server: \$${moneyFmt}`);

}

export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const target = args._[0];
	if (args.help || !target) {
		ns.tprint("This script will generate money by hacking a target server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles`);
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

	ns.disableLog("getServerSecurityLevel");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerMaxMoney");
	ns.disableLog("getServerMinSecurityLevel");
	ns.disableLog("getHackingLevel");
	ns.disableLog("wget");

	// Defines how much money a server should have before we hack it
	const maxMoney = ns.getServerMaxMoney(target);
	const moneyThresh = maxMoney * 0.70;
	ns.print(`maxMoney: ${new Intl.NumberFormat().format(maxMoney)}`);
	ns.print(`moneyThresh: ${new Intl.NumberFormat().format(moneyThresh)}`);

	const security = ns.getServerMinSecurityLevel(target);
	ns.print(`security: ${new Intl.NumberFormat().format(security)}`);

	while (true) {
		let myLevel = ns.getHackingLevel();
		let securityThresh = Math.floor(myLevel / 2);
		ns.print(`securityThresh: ${new Intl.NumberFormat().format(securityThresh)}`);

		if (ns.getServerSecurityLevel(target) > securityThresh) {
			const weak = await ns.weaken(target);
			await remoteLog(ns, "weaken", target, weak);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			const grew = await ns.grow(target);
			await remoteLog(ns, "grow", target, grew);
		} else {
			const stole = await ns.hack(target);
			await remoteLog(ns, "hack", target, stole);
		}
	}
}
