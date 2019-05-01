const DOMAINS_FILE = "domains.txt";

export async function fetchTLDs(): Promise<string[]> {
	const domainsUpper = await fetch(DOMAINS_FILE).then(r => r.text());
	return domainsUpper
		.toLowerCase()
		.split("\n")
		.filter(line => line.trim() !== "" && !line.trim().startsWith("#"));
}
