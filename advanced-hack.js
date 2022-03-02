

// Send to external logger for analysis.
async function remoteLog(ns, action, target, value) {

	await ns.wget(
		`https://192.168.0.2:8000/${action}/${target}/${value}`,
		"junk.txt"
	);

	const v = ns.getServerSecurityLevel(target);
	const vFmt = new Intl.NumberFormat().format(v);
	ns.print(`Security of server: ${vFmt}`);

	const money = ns.getServerMoneyAvailable(target);
	const moneyFmt = new Intl.NumberFormat().format(money);
	ns.print(`Money on server: \$${moneyFmt}`);

}

async function processFinished(ns, pid, host) {
	while (ns.isRunning(pid, host)) {
		await ns.sleep(200);
	}
}

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);
	const target = args._[0];
	let userMaxRam = args._[1];
	if (args.help || !target) {
		ns.tprint("This script will generate money by hacking a target server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME MAX_RAM`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()} n00dles 1024`);
		return;
	}

	if (!userMaxRam) {
		userMaxRam = 0;
	}
	const host = 'home';

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

	ns.disableLog("sleep");
	// ns.disableLog("getServerSecurityLevel");
	// ns.disableLog("getServerMoneyAvailable");
	// ns.disableLog("getServerMaxMoney");
	// ns.disableLog("getServerMinSecurityLevel");
	// ns.disableLog("getHackingLevel");
	// ns.disableLog("wget");

	const aRam = ns.getScriptRam("advanced-hack.js");
	const hRam = ns.getScriptRam("do-hack.js");
	const gRam = ns.getScriptRam("do-grow.js");
	const wRam = ns.getScriptRam("do-weaken.js");
	const maxRam = Math.floor(
		ns.getServerMaxRam(host) - ns.getServerUsedRam(host) - userMaxRam - aRam
	);
	ns.tprint(
		`aRam: ${aRam}, hRam: ${hRam}, gRam: ${gRam}, wRam: ${wRam}, maxRam: ${maxRam}`
	);



	let server = ns.getServer(host);
	let player = ns.getPlayer();

	let hPercent = ns.formulas.hacking.hackPercent(server, player) * 100;
	let gPercent = ns.formulas.hacking.growPercent(server, 1, player, server.cpuCores);
	let wTime = ns.formulas.hacking.weakenTime(server, player);
	let gTime = ns.formulas.hacking.growTime(server, player);
	let hTime = ns.formulas.hacking.hackTime(server, player);

	let maxThreads = Math.floor(maxRam / wRam);
	let wThreads = maxThreads - (ns.getServerMinSecurityLevel(target) / 0.05);
	let p = Math.floor(gPercent);
	let gThreads = Math.floor(5.0 / p);
	let hThreads = Math.floor(50 / hPercent);
	wThreads = Math.floor(wThreads - (gThreads * 0.004));


	ns.tprint(`gPercent: ${gPercent}, threads: ${gThreads}`);

	let money = ns.getServerMoneyAvailable(target);
	ns.tprint(`money: ${money}`);


	let pid = ns.exec('do-weaken.js', host, wThreads, target);
	ns.tprint(`wPid: ${pid} threads: ${wThreads} time: ${wTime}`);
	await processFinished(ns, pid, host);

	pid = ns.exec('do-hack.js', host, hThreads, target);
	ns.tprint(`hPid: ${pid} threads: ${hThreads} time: ${hTime}`);
	await processFinished(ns, pid, host);
	money = ns.getServerMoneyAvailable(target);
	ns.tprint(`money: ${money}`);

	pid = ns.exec('do-grow.js', host, gThreads, target);
	ns.tprint(`gPid: ${pid} threads: ${gThreads} time: ${gTime}`);
	await processFinished(ns, pid, host);

	money = ns.getServerMoneyAvailable(target);
	ns.tprint(`money: ${money}`);

	ns.tprint('DONE');
}
