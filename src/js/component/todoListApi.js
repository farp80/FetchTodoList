import React from "react";

const urlToFetch = "http://assets.breatheco.de/apis/fake/todos/user/farp80";
const contentType = "application/json";

export class TodoListApi extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			currentValue: "",
			isCreated: false
		};
	}

	onClick = () => {
		const { currentValue, data } = this.state;
		if (currentValue) {
			const nextState = [...data, currentValue];
			this.setState({ data: nextState, currentValue: "" });
		}
	};

	onChange = e => this.setState({ currentValue: e.target.value });

	componentDidMount() {
		return fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/farp80",
			{
				method: "POST",
				header: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: []
			}
		)
			.then(response => response.json())
			.then(responseAsJson => {
				console.log(responseAsJson);
			});
	}

	render() {
		const { data, currentValue } = this.state;
		return (
			<div>
				<div className="container todoListDiv">
					<h1>To Do List</h1>
					<div className="row">
						<div className="col">
							<div className="input-group mb-3">
								<input
									type="text"
									value={currentValue}
									onChange={this.onChange}
									className="form-control"
									placeholder="Task ..."
									aria-label="Task ..."
									aria-describedby="basic-addon2"
								/>
								<div className="input-group-append">
									<button
										onClick={this.onClick}
										className="btn btn-outline-secondary"
										type="button">
										Add
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<ul className="list-group">
								{this.state.data.map((item, i) => (
									<li
										className="list-group-item"
										key={i}
										onClick={() => {
											this.removeItem(i);
										}}>
										{item}
										<span>x</span>
									</li>
								))}
								<li
									className="list-group-item lastItemInList"
									key={this.state.data.length}>
									{this.state.data.length + " items to do"}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
