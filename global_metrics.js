// From https://github.com/Nolshine/bitburner-scripts/blob/master/global_metrics.ns.js

// Script for comparing the metrics of different servers
// and returning the best current target.
// Atm it just uses max money, I was attempting to use
// more clever metrics before but there seems to be little point
// when comparing effort to result

/** @param {NS} ns **/
export async function main(ns){

  let visited = ['home'];
  let nodes = ns.scan('home');
  let results = [];

  let bestTarget = createMetric(ns, 'foodnstuff');

  while (nodes.length > 0){
      let node = nodes.pop();
      if (visited.includes(node)){
          continue;
      }

      let metric = createMetric(ns, node);
      results.push({
        name: metric.name,
        cash: metric.maxCash,
        growth: metric.growthFactor,
      });

      if (compareMetrics(ns, metric, bestTarget)){
          bestTarget = metric;
      }
      visited.push(node);
      nodes = nodes.concat(ns.scan(node));
  }

  results.sort((a, b) => {
      return a.cash - b.cash;
  });

  if (bestTarget === null){
      ns.tprint("Could not find target, please check for bugs");
      return;
  }

  for (let r of results) {
    ns.tprint(`${r.name} - cash: ${new Intl.NumberFormat().format(r.cash)} : growth: ${r.growth}`);
  }

  ns.tprint(bestTarget.name);
  ns.tprint("min Sec: "+bestTarget.minSecLevel);
  ns.tprint("Max cash: $"+bestTarget.maxCash);
  ns.tprint("Growth factor: "+bestTarget.growthFactor);
  ns.tprint("Level requirement: "+bestTarget.requiredLevel);
  ns.tprint("Hack chance: "+bestTarget.hackChance);
}


function createMetric(ns, hostname){

  return {
      name: hostname,
      minSecLevel: ns.getServerMinSecurityLevel(hostname),
      maxCash: ns.getServerMaxMoney(hostname),
      growthFactor: ns.getServerGrowth(hostname),
      requiredLevel: ns.getServerRequiredHackingLevel(hostname),
      hackChance : (ns.hackAnalyzeChance(hostname) * 100).toFixed(2),
  }
}

function compareMetrics(ns, a, b){
  //ns.tprint("Comparing: " + a.name + ", " + b.name);
  // returns true is A is 'better' than B

  if (a.hackChance = 100) {
    // ns.tprint(a);
    // ns.tprint(`${a.name} - maxCash: ${new Intl.NumberFormat().format(a.maxCash)} : growthFactor: ${a.growthFactor}`);
  }

  if (!a || !a.maxCash || !ns.hasRootAccess(a.name) || a.requiredLevel > ns.getHackingLevel()
  || a.hackChance < 90) {
      return false;
  }

  return a.maxCash > b.maxCash;
}