import './App.css';
// import Editor from './Editor';
// import Preview from './Preview';
import LivePreview from './LivePreview';

function App() {
  return (
    // <div className='App'>
    //   <Editor/>
    //   <Preview/>
    // </div>
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Real-Time Markdown Editor</h1>
      <LivePreview />
    </div>
  );
}

export default App;
