/** @param {NS} ns **/
export async function main(ns) {
	const sleeves = 6;
	for (let x = 0; x < sleeves; x++) {
		ns.sleeve.setToShockRecovery(x);
	}
}
