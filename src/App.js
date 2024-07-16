import React, { Component, useState, useEffect } from 'react';

const App = () => {
	const [news, setNews]= useState([]);
    const[searchQuery, setSearchQuery] = useState('react');
    const[url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
	
	const [loading, setLoading] = useState(false);
	
	const fetchNews = () => {
		setLoading(true)
		fetch(url)
		.then(result => result.json())
		.then(data => setNews((data.hits),setLoading(false)))
		.catch(error => console.log(error));
	};
    useEffect(() => { 
		fetchNews()
	},[url]);
	
	const handleChange = (e) => {
		setSearchQuery(e.target.value);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
	}
	
	const showLoading =() =>( loading ? <h2> Loading...</h2> : '' )
	const showForm =() => ( 
		<form onSubmit={handleSubmit}>
			<input type="text" value={searchQuery} onChange={handleChange} /> 
			<button > Search</button>
		 </form>
	)
	const showNews =() => ( 
		news.map((n, i) =>(
			<p key = {i}> {n.title} </p>
		))
	)
	
	
	
	return (
	<div>
		<h2> News </h2>
		{showLoading()}
		{showForm()}
		{showNews()}
	</div>
	);		
};

// const App = () => {
// 	const [count, setCount]= useState(0);

// 	const increament = () => {
// 		setCount(count + 1)
// 	};
//     useEffect(() => {
//       document.title  = `Clicked ${count} tmes`
// 	});

// 	return (
// 	<div>
// 		<h2> Counter App</h2>
// 	   <button onClick={increament}> Clicked {count}
// 	   </button>
// 	</div>
// 	);		
// };

// class App extends Component {
// 	state = {
// 		count:0 
// 	}
	
// 	increament = ()=>{
// 		this.setState({
// 			count:this.state.count + 1
// 		})
// 	};
//     componentDidMount() {
// 		document.title  = `Clicked ${this.state.count}`
// 	}
// 	componentDidUpdate() {
// 		document.title  = `Clicked ${this.state.count}`
// 	}
// 	render(){
// 		return <div>
// 		<h2> Counter App</h2>
// 		<button onClick={this.increament}>
// 		 Clicked {this.state.count}
// 		</button>
// 		</div>
// 	}
// }

/* function App() {
  return (
    <div className="App">
     
    </div>
  );
} */

export default App;
