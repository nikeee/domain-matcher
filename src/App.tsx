import React, { PureComponent } from "react";

import "./App.css";
import { fetchTLDs } from "./tlds";


interface StateTLDsLoaded {
	tlds: string[];
}
interface StateInitial {
	tlds: undefined;
}

type State = StateTLDsLoaded | StateInitial;
interface Props {
}

export default class App extends PureComponent<Props, State> {
	constructor(p: Props) {
		super(p);

		this.state = {
			tlds: undefined,
		};

		fetchTLDs()
			.then(tlds => this.setState({
				tlds,
			}));
	}

	render() {
		const s = this.state;
		// const p = this.props;
		return s.tlds !== undefined
			? <h1>Got {s.tlds.length} TLDs</h1>
			: <h1>Loading TLDs</h1>
	}
}
