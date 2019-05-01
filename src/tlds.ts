const DOMAINS_FILE = "domains.txt";

export type TLD = string;

export async function fetchTLDs(): Promise<TLD[]> {
	const domainsUpper = await fetch(DOMAINS_FILE).then(r => r.text());
	return domainsUpper
		.toLowerCase()
		.split("\n")
		.filter(line => line.trim() !== "" && !line.trim().startsWith("#"));
}

export function getPossbileTLDs(tlds: TLD[], desired: string) {
	const possible = tlds.filter(tld => desired.endsWith(tld));
	return possible.length === 0
		? [`No match for <${desired}>`]
		: possible.map(tld => desired.slice(0, -tld.length) + "." + tld);
}
