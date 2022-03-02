/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("sleep");
	const crime = ns.args[0];
	let again = true;
	while (again) {
		let time = ns.commitCrime(crime);
		await ns.sleep(time * .8);
		again = ns.isBusy();
		while (ns.isBusy()) {
			await ns.sleep(100);
		}
	}
}
