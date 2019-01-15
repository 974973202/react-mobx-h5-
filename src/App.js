import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ActivityIndicator } from 'antd-mobile'

createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}`;


const EntryPage = React.lazy(() => import('./pages/entry'));


class App extends Component {
  
  render() {
    return (
      <Suspense fallback={<ActivityIndicator toast text="Loading..."/>}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={() => <EntryPage/>} />
            <Route
              component={() => <div>404</div>}
            />
          </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}
export default App;