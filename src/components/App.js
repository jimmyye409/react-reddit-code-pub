import _ from 'lodash';
import React from 'react';
import SearchBar from './search_bar';

import Items from './Items'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.startingSubreddits = 'sports';
    this.url = 'https://www.reddit.com/r/';
  }
    
  state = {
    currentSubreddit: 'sports',
    sort: 'new',
    files: [],
    after: null,
    before: null,
    page: 1
  };

  componentDidMount() {
    this.changeSubreddit(this.state.currentSubreddit);
  }

  nextPage = () => {
    
    fetch(this.url + this.state.currentSubreddit + "/" + this.state.sort + ".json?count=100&limit=10&after=" + this.state.after)
      .then(res => res.json())
      .then((data) => {
        this.setState(() => ({
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
          page: this.state.page + 1
        }));
        window.scrollTo(0, 0);
        
      })
      .catch(console.log)
  }

  prevPage = () => {
    fetch(this.url + this.state.currentSubreddit + "/" + this.state.sort + ".json?count=100&limit=10&before=" + this.state.before)
      .then(res => res.json())
      .then((data) => {
        window.scrollTo(0, 0);
        let newState = {
          files: data.data.children,
          after: data.data.after,
          before: data.data.before
        }
        if (this.state.page > 1) {
          newState.page = this.state.page - 1
        }
        this.setState(newState)        
      })
      .catch(console.log)
  }
  
  handleErrors(response) {
    if (!response.ok) {
        this.setState({
          files: [],
          currentSubreddit: "",
          page: 1,
          error: true
        });
        throw new Error("Nothing back from response")
    }
    return response.json();
  }
  changeSubreddit(sub) {
    /* 
     * Empty the files so we will show 'Loading...'
     * Reset page to 1
     */
    this.setState({
      files: [],
      currentSubreddit: sub,
      page: 1
    });
    fetch(this.url + sub + "/" + this.state.sort + '.json?limit=10')
      .then(res =>this.handleErrors(res))
      .then((data) => {
          this.setState({
            files: data.data.children,
            after: data.data.after,
            before: data.data.before
          });
          window.scrollTo(0, 0);
      })
      .catch(error => console.log(error))

  }

  searchSubreddit(subreddit) {
    if (subreddit.length !== 0) {
      this.changeSubreddit(subreddit);
    } else {
      this.changeSubreddit(this.startingSubreddits);
    }
  }

  render () {
    const searchSubreddit = _.debounce((term) => {this.searchSubreddit(term)}, 600);
    let contentJSX;
    if (this.state.files.length > 0) {
        let pagingJSX;
        const buttonNext = <button className="btn btn-primary" type="submit" onClick={this.nextPage}>Next</button>;
        const buttonPrev = <button className="btn btn-secondary" type="submit" onClick={this.prevPage}>Previous</button>;
        if (this.state.after === null && this.state.before !== null&&this.state.page!==1) {
            pagingJSX = <div>{buttonPrev}</div>;
        } else if (this.state.before === null && this.state.after !== null) {
            pagingJSX = <div>{buttonNext}</div>;
        } else if (this.state.before !== null && this.state.after !== null &&this.state.page!==1) {
            pagingJSX = <div>{buttonPrev}<span className="p-3 text-black-50">Page {this.state.page}</span> {buttonNext}</div>;
        }
        else if (this.state.before !== null && this.state.after !== null &&this.state.page===1) {
          pagingJSX = <div>{buttonNext}</div>;
        }
        else {
          pagingJSX = <div>No such SubReddit.</div>;
        }
        contentJSX = <div className="m-2"><Items files={this.state.files}/><br/><div className="center-block m-2">{pagingJSX}</div></div>;
    }
    else if(this.state.error){
      contentJSX = <div className="p-2"><center>No such subreddit existing.</center></div>;
    }
    else {
      contentJSX = <div className="p-2"><center>Loading...</center></div>;
    }

    return (
      <div className="container">
        <br/>
        <div>
          <div className="m-3"></div>
          <SearchBar onSearchTermChange={term => searchSubreddit(term)}/>
        </div>
        <br/>
        {contentJSX}
        <br/>
      </div>
    );
  }

}

export default App;