

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const App = () => {
  const [state, setState] = useState({
    users: [],
    posts: [],
    comments: []
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setState(prevState => ({ ...prevState, users: data })));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setState(prevState => ({ ...prevState, posts: data })));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setState(prevState => ({ ...prevState, comments: data })));
  }, []);

  return (
    <div>
      <Header />
      <Main users={state.users} posts={state.posts} comments={state.comments} />
      <Footer />
    </div>
  );
};

export default App;