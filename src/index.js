import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';
import Request from 'superagent'
import lodash from 'lodash';
import ToggleDisplay from 'react-toggle-display';

class FetchDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			currentRepoId: "47390961",
			show: true,
			hide :true,
			sortClicked:false
			}
		};
		componentWillMount(){
		this.search();
	}
    componentDidMount() {
       
    }
	updateSearch(){
		this.search(this.refs.query.value);
	}
	search(query="tertis"){
		 var url = 'https://api.github.com/search/repositories?q='+query+'&sort=stars&order=desc';
		 Request.get(url).then((res) => {
                this.setState({ 
				items: res.body.items
				});
                console.log(this.state.items);
            });
	}
	reloaditems(){
		this.setState({
      show: true
    });
		 this.setState({
      hide: true
    });
	var s = <p></p>;
		ReactDOM.render(s,
    document.getElementById('nextPage')
);
	}
    SelectRepo(id){
		this.setState({currentRepoId:id});
				var selectedRepo = lodash.find(this.state.items,(item) => {
			return item.id == id;
		});
	   this.setState({
      show: !this.state.show
    });
	 this.setState({
      hide: !this.state.hide
    });
		  console.log(this.state.hide);
		var content;
		if(selectedRepo){	
		    content =<div>
			          <ToggleDisplay show={this.state.hide}>
			          <h1> Name : {selectedRepo.name} </h1>
					  <p>  Full Name : {selectedRepo.full_name} </p>
                      <p>  URL : {selectedRepo.url} </p>
					  <p>  Description : {selectedRepo.description}</p>
		              <p>  Stars : {selectedRepo.stargazers_count} </p>
					  <p>  Watchers : {selectedRepo.watchers_count} </p>
					  <p>  Size : {selectedRepo.size}</p>
					  <p>  Score : {selectedRepo.score}</p> 
					  <button type="button" onClick={(e)=>{this.reloaditems();}} key={selectedRepo.id}> Back </button>
					  </ToggleDisplay>
					  </div>;
		  
		}	
	ReactDOM.render(content,
    document.getElementById('nextPage')
);
	}
	StarSort(){
		var newArr;
		var repos;
		var li;
			 newArr = lodash.sortBy(this.state.items, 'stargazers_count', function(n) {
            return Math.sin(n);
            });
			  this.setState({
      items:newArr
    });
					
	}
	WatchSort(){
		var newArr;
			 newArr = lodash.sortBy(this.state.items, 'watchers_count', function(n) {
            return Math.sin(n);
            });
			  this.setState({
      items:newArr
	});
	}
	ForksSort(){
			var newArr;
			 newArr = lodash.sortBy(this.state.items, 'forks_count', function(n) {
            return Math.sin(n);
            });
			  this.setState({
      items:newArr	
	});
	}
	NameSort(){
			var newArr;
			 newArr = lodash.sortBy(this.state.items, 'name', function(n) {
            return Math.sin(n);
            });
			  this.setState({
      items:newArr	
	});
	}
	UserSort(){
			var newArr;
			 newArr = lodash.sortBy(this.state.items, 'forks_count', function(n) {
            return Math.sin(n);
            });
			  this.setState({
      items:newArr	
	});
	}
	
    render() {	
		var names = lodash.map(this.state.items,(item) => {
			return <li onClick={(e)=>{this.SelectRepo(item.id);}} key={item.id}><a href="#">{item.name}</a></li>;
		});
		var Stars = <button onClick={(e)=>{this.StarSort();}} >Stars</button>;
		var Watch =	<button onClick={(e)=>{this.WatchSort();}}>Watch</button>;
		var Forks =	<button onClick={(e)=>{this.ForksSort();}}>Forks</button>;
		var Name = <button onClick={(e)=>{this.NameSort();}}>Name</button>;
		var User = <button onClick={(e)=>{this.UserSort();}}>User</button>;
		
        return ( 

          <div>
		  	<ToggleDisplay show={this.state.show}>
            <h1 > GitHub Repos </h1> 
			<input ref="query" onChange={(e)=>{this.updateSearch();}} type="text" defaultValue="tertis"/>
			<br/>
			<p><strong> SORT BY </strong></p>
			{Stars}
			{Watch}
			{Forks}
			{Name}
			{User}
			<ul id="RepoList">{names}</ul>
			</ToggleDisplay>
            </div>
       );
    }
}

ReactDOM.render( <
    FetchDemo subreddit = "reactjs" / > ,
    document.getElementById('root')
);