import React from "react";

const urlToFetch = "http://assets.breatheco.de/apis/fake/todos/user/farp80";
const contentType = "application/json";

export class TodoListApi extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			currentValue: "",
			isCreated: false,
			username: ""
		};
	}

	onClick = () => {
		const { currentValue, data } = this.state;
		if (currentValue) {
			var temp = {
				label: currentValue,
				done: false
			};
			const nextState = [...data, temp];
			this.updateTodoInAcademy(nextState);
		}
	};

	removeItem = i => {
		let todos = this.state.data.slice();
		todos.splice(i, 1);
		this.updateTodoInAcademy(todos);
	};

	onChange = e => this.setState({ currentValue: e.target.value });
	onChangeUsername = e => this.setState({ username: e.target.value });

	fetchingData() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" +
				this.state.username,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(resp => {
				if (resp.length != 0) {
					this.setState({ data: resp });
				}
			});
	}

	componentDidMount() {
		this.fetchingData();
	}

	createTodoInAcademy() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" +
				this.state.username,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			}
		)
			.then(response => {
				if (response.ok) {
					this.setState({ isCreated: true });
					return response.json();
				}
			})
			.then(data => {
				this.fetchingData();
			});
	}

	updateTodoInAcademy(valuesArray) {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" +
				this.state.username,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(valuesArray)
			}
		)
			.then(response => {
				if (response.ok) {
					this.setState({ currentValue: "" });
					return response.json();
				}
			})
			.then(data => {
				this.fetchingData();
			});
	}

	onUsername = () => {
		this.createTodoInAcademy();
	};

	onDelete = () => {};

	render() {
		const { data, currentValue, username } = this.state;
		return (
			<div>
				<div className="container todoListDiv">
					<h1>To Do List</h1>
					<div className="row">
						<div className="col">
							<div className="input-group mb-3">
								<input
									type="text"
									value={username}
									onChange={this.onChangeUsername}
									className="form-control"
									placeholder="Username ..."
									aria-label="Username ..."
									aria-describedby="basic-addon2"
								/>
								<div className="input-group-append">
									<button
										onClick={this.onUsername}
										className="btn btn-outline-secondary"
										type="button">
										Add
									</button>
								</div>
								<div className="input-group-append">
									<button
										onClick={this.onDelete}
										className="btn btn-outline-secondary"
										type="button">
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
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
										{item.label}
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
