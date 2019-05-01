import React, { PureComponent, ChangeEvent } from "react";

import "./App.css";
import { fetchTLDs, getPossbileTLDs, TLD } from "./tlds";


interface StateTLDsLoaded {
	tlds: TLD[];
	desiredNames: string[];
	possibleDomains: Record<string, string[]>;
}
interface StateInitial {
	tlds: undefined;
	desiredNames: string[];
	possibleDomains: undefined;
}

type State = StateTLDsLoaded | StateInitial;
interface Props {
}

export default class App extends PureComponent<Props, State> {
	constructor(p: Props) {
		super(p);

		this.state = {
			tlds: undefined,
			desiredNames: [],
			possibleDomains: undefined,
		};

		fetchTLDs()
			.then(tlds => this.setState({
				tlds,
				possibleDomains: undefined,
			}));
	}

	onChangeDesiredNames = (ev: ChangeEvent<HTMLTextAreaElement>) => {
		const value = ev.target.value.trim();
		const s = this.state;

		if (!value || s.tlds === undefined) {
			return this.setState({
				desiredNames: [],
				possibleDomains: undefined,
			});
		}
		const desiredNames = value.toLowerCase()
			.split("\n")
			.filter(f => !!f && !!f.trim());

		if(desiredNames.length === 0) {
			return this.setState({
				desiredNames: [],
				possibleDomains: undefined,
			});
		}

		const possibleDomains: Record<string, string[]> = {};
		for (const name of desiredNames)
			possibleDomains[name] = getPossbileTLDs(s.tlds, name);

		this.setState({
			desiredNames,
			possibleDomains,
		});
	}

	render() {
		const s = this.state;
		if (s.tlds === undefined)
			return (<h1>Loading TLDs...</h1>);

		let possibleList;
		if (s.possibleDomains === undefined) {
			possibleList = <h2>Type some string</h2>;
		} else {
			const possible = Object.values(s.possibleDomains).flat();
			possibleList = (
				<div className="card">
					<div className="card-header">Possbile Domains</div>
					<ul className="list-group list-group-flush">
						{possible.map(d => (<li key={d} className="list-group-item"><code>{d}</code></li>))}
					</ul>
				</div>
			);
		}

		return (
			<main>
				<h1>Got {s.tlds.length} TLDs</h1>
				<div className="card">
					<div className="card-header">
						<label htmlFor="desiredNames">Desired Names:</label>
					</div>
					<div className="card-body form-group">
						<textarea id="desiredNames" className="form-control" rows={10} onChange={this.onChangeDesiredNames} />
					</div>
				</div>
				{possibleList}
			</main>
		);
	}
}
