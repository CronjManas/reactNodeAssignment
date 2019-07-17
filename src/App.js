import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Report from './components/Report';
import {Newid} from './Newid'

class App extends Component {

  constructor(){
    super();
    this.state = {
      reports:[],
      filtered:[],
      searched:[],
      search:'',
      recentSearches:[],
      asc : 1

    }
  }
  componentDidUpdate(){
    fetch('http://localhost:3005/api/recent')
    .then(res=>res.json())
    .then(recent => this.setState({recentSearches:recent}))
  }

  componentDidMount(){
    fetch('http://localhost:3005/api')
    .then(res => res.json())
    .then(reports => this.setState({reports}));

    fetch('http://localhost:3005/api/recent')
    .then(res=>res.json())
    .then(recent => this.setState({recentSearches:recent}))
  }

  updateSearch = (e) => {
    this.setState({search:e.target.value});
  }

  search = (e)=>{
    e.preventDefault();
    
      const search = {
        id : Newid(),
        query:this.state.search
      }
      axios.post('http://localhost:3005/api/searchQuery',{search})
      .then((res)=>console.log(res))
      .catch( (error) => {
        console.log(error);
      });    
    fetch('http://localhost:3005/api/'+this.state.search)
    .then(res=>res.json())
    .then(data => this.setState({reports:data}))
    

  }
  
  sortCost = () =>{
    let data = [...this.state.reports];
    let x =[];
    if(this.state.asc === 1){
      x= data.sort((a,b)=>a.cost-b.cost);
      this.setState({reports:x,asc:-1});  
    }else{
      x = data.sort((a,b)=>b.cost-a.cost);
      this.setState({reports:x,asc:1})
    }
    
  }

  recentSearch = (i) =>{
    let x = [...this.state.recentSearches];
    this.setState({search:x[i].query})
  }
  render(){
    
    return (
      <div>
        <div className="navbar">
          <div className="container">
            <div className="navbar-title"> CronJ IT Technologies Report  Listing</div>
          </div>
        </div>




        <div className="container">
          <form onSubmit={this.search} className="searchBox">
            <div className="form-row">
              <div className="form-group" >
                <input type="text" className="form-control mb-2" value={this.state.search} onChange={this.updateSearch}/>
              </div>
              <input type="submit" className="btn btn-primary mb-2" value="Search"/>
            </div>
          </form>
        <br/>
        <div className="container2">

        <button className="btn  btn-success" onClick={this.sortCost}>Sort By Cost</button>
        <button className="btn btn-success">Sort By Date</button>

        </div>
        <ul className="list">
        {
          this.state.recentSearches.map((recentSearch,index)=>{
            return (
              <li key={index} onClick={()=>this.recentSearch(index)}>{recentSearch.query}</li>
            )
          })
        }
        </ul>
       
        
      <div className="container3">
        {
          this.state.reports.map((report)=>{
            return (
              <Report report={report} key={report.id}/>
            )
          })
        }
      </div>
      </div>
      </div>
      
    );
  }
  
}

export default App;
