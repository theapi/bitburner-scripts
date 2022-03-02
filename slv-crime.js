/** @param {NS} ns **/
export async function main(ns) {
	const crime = ns.args[0];
	const sleeves = 6;
	for (let x = 0; x < sleeves; x++) {
		ns.sleeve.setToCommitCrime(x, crime);
	}
}
