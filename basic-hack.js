/** @param {NS} ns **/
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


	// Defines how much money a server should have before we hack it
	const maxMoney = ns.getServerMaxMoney(target);
	const moneyThresh = maxMoney * 0.50;
	ns.print(`maxMoney: ${new Intl.NumberFormat().format(maxMoney)}`);
	ns.print(`moneyThresh: ${new Intl.NumberFormat().format(moneyThresh)}`);

	// Defines the maximum security level the target server can
	// have. If the target's security level is higher than this,
	// we'll weaken it before doing anything else
	const security = ns.getServerMinSecurityLevel(target);
	const securityThresh = security + 30;
	ns.print(`security: ${new Intl.NumberFormat().format(security)}`);
	ns.print(`securityThresh: ${new Intl.NumberFormat().format(securityThresh)}`);

	while (true) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}

		const v = ns.getServerSecurityLevel(target);
		const vFmt = new Intl.NumberFormat().format(v);
		ns.print(`Security of server: ${vFmt}`);

		const money = ns.getServerMoneyAvailable(target);
		const moneyFmt = new Intl.NumberFormat().format(money);
		ns.print(`Money on server: \$${moneyFmt}`);
	}
}
