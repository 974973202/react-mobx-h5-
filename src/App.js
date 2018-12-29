// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Button, ActivityIndicator } from 'antd-mobile';
import styles from './App.less';

function Example() {
  const [count, setCount] = useState(0);
  const [val, setValue] = useState('');
  const [arr, setArr] = useState([]);
  const [status, setStatus] = useState(true);
  const [data, setData] = useState([]);

  //useContext useReducer useCallback 
  // useMemo useRef useImperativeMethods 
  // useMutationEffect useLayoutEffect

  // 类似于componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 更新文档的标题
    document.title = `You clicked ${count} times`;
  });

  // useEffect(() => {
  //   console.log(123)
  // });

  function handleSubmit(e) {
    e.preventDefault();
    setArr([...arr, { content: val, checked: false }])
    setValue('')
  }

  function handlechecked(index) {
    setArr([...arr.slice(0, index),{...arr[index],checked:!arr[index].checked}, ...arr.slice(index + 1)])
  }

  function handleDelete() {
    setArr(arr.filter(ele => !ele.checked))
  }

  return (
    <div>
      <p  className={styles.title}>You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      {/* <ActivityIndicator /> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={val} onChange={(e) => setValue(e.target.value)}/>
        {val}
        <input type='submit'/>
        <button onClick={() => handleDelete()}>Delete</button>
        {arr.map((ele, index) => {
          return (ele.content || ele.checked === status) ? (
            <div key={index}>
              <input type="checkbox" checked={ele.checked} onChange={()=>handlechecked(index)}/>
              <p>{ele.content}</p>
            </div>
          ) : null
        })}
      </form>
      {
        data.map((e, i) => {
          console.log(e, i)
          return (
            <div>{e.a}</div>
          )
        })
      }
    </div>
  );
}

export default Example;
