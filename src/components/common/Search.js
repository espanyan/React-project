import React from 'react';
import Loading from './Loading';
import {withRouter} from 'react-router-dom';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import './Search.css';

class Search extends React.Component{
    constructor(){
        super();
        this.state={
            searchQuery:"",
            searchResults:[],
            loading:false,
        }

        this.handleChange=this.handleChange.bind(this)
        this.handleRedirect = this.handleRedirect.bind(this)
    }
  
    handleChange(event){
        const searchQuery = event.target.value
        this.setState({ searchQuery })
        if(!searchQuery){                    // ete inputi mej ban chka grac uremn veradzrdzni datark streng
            return ""                       // if serchQuery is empty do not sent request to server
        }
        this.setState({
            loading:true
        })
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then((searchResults)=> {
            this.setState({
                loading:false,
                searchResults,
            })
        })
    
       /* if(inputName==="searchQuery"){
           this.setState({searchQuery:inputValue})
       }else if(inputName==="firstName"){
           this.setState({firstName:inputValue})
       }  */
     
    }

    handleRedirect(currencyId){
        this.setState({ 
            searchQuery:"",
            searchResults:[],
         })
        this.props.history.push(`/currency/${currencyId}`)
    }

    renderSearchResults(){
        const {searchResults, searchQuery, loading} = this.state 
        if(!searchQuery){
            return "";
        }
        if(searchResults.length){
           return(
            <div className="Search-result-container">
                {searchResults.map(result=>(
                    <div key = {result.id}
                        className="Search-result"
                        onClick = {()=>this.handleRedirect(result.id)}>
                        {result.name} ({result.symbol})
                    </div>
                ))}
            </div>
        )} 
        if(!loading){
            return(
            <div className = "Search-result-container">
                <div className="Search-no-result">
                    No result found
                </div>
            </div>
        )}
    }
   

    render() {
        const {loading, searchQuery} = this.state;
        return(
            <div className="Search">
               <span className = "Search-icon"/>
                <input 
                    className = "Search-input" 
                    type = "Text" 
                    placeholder = "Currency name"
                    onChange= {this.handleChange} 
                    value = {searchQuery}/>
                { loading &&
                <div className = "Search-loading">
                    <Loading 
                    width = "12px"
                    height = "12px"
                    />
                </div>}
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search)

// uncontrol componentner@ unen sepakan yurahatuk pahvacq,vor@ xekavarvum e DOM-i koxmic
// form tegi mej etet ka buuton kam input apa mi ban greluc ej@ refresh a anum

//control componentner@ xekavarvum en mer koxmic 
