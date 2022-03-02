/** @param {NS} ns **/
export async function main(ns) {
	const course = ns.args[0];
	const sleeves = 6;
	for (let x = 0; x < sleeves; x++) {
		ns.sleeve.setToUniversityCourse(x, "Rothman University", course);
	}
}
