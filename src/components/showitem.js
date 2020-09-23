import React from 'react';

const ShowItem = ({file}) => {
    if( file.data.title) {
        let subreddit = "https://reddit.com/r/" + file.data.subreddit;
        let post_link = "https://reddit.com" + file.data.permalink;
        return (
            <div className="col-sm-12 col-md-6 col-lg-4">
                <div className=" card-link">
                <div className="card">
                    <div className="card-img-top">
                        <a href={post_link} target="_blank" rel="noopener noreferrer"><button className="btn btn-secondary btn-sm top-right-float">View Post</button></a>
                    </div>
                    <div className="card-body">
                        <div className="card-title">   
                            <a href={file.data.url} target="_blank" rel="noopener noreferrer">{file.data.title}</a>
                        </div>
                        <p className="card-text">
                            <br/>Posted on: <a href={subreddit} target="_blank" rel="noopener noreferrer">r/{file.data.subreddit}</a>
                        </p>
                    </div>
                </div>
                </div>
            </div>
        );
    }
    return (
        <div>No such item</div>
    );
   

} 

export default ShowItem;