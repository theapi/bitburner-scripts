
import $ from 'jquery'; // nope :(

/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([['help', false]]);

	if (args.help) {
		ns.tprint("EXPERIMENTAL: posting data to a real server.");
		ns.tprint(`USAGE: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

  const payload = {
    foo: "bar"
  }

  // Trying to jquery like "wget" does here
  // https://github.com/danielyxie/bitburner/blob/bd7af955ee7466191e56b895fc03767eb6852c3a/src/Terminal/commands/wget.ts#L24
  $.post("https://192.168.0.2:8080",
    payload,
    function(data, status){
    ns.tprint(status);
    ns.tprint(data);
  });
}
