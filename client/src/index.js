import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {
  InMemoryCache,
  createHttpLink,
  ApolloProvider
} from '@apollo/client';

import config from "./config";
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css'

const httpLink = createHttpLink({
  uri: config.URI
})

const client = {
  link: httpLink,
  cache: new InMemoryCache(),
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
