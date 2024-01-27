import {useState} from 'react';
import axios from "axios";
function App() {

  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({started: false, pc: 0});
  const [msg, setMsg] = useState(null);

  function handleUpload(){
    if(!files){
      setMsg("No File Selected");
      return;
    }

    const fd = new FormData();
   for (let i=0; i< files.length;i++){
      fd.append(`file${i+1}`, files[i]);
  }

    setMsg("Uploading...");
    setProgress(prevState => {
      return {...prevState,started:true}
    })
    axios.post('http://httpbin.org/post', fd, {
      onUploadProgress: (progressEvent) => {
        setProgress(prevState => {
          return {...prevState, pc: progressEvent.progress*100 }
        })
      },
      headers:{
        "Custom-Header": "value",
      }
    })
    .then(res => {
      setMsg("Upload Successful");
      console.log(res.data);
      if(!res.ok){
        throw new Error("Bad Response");
      }
    })
    .catch(err => {
      setMsg("Upload Failed");
      console.log(err);
    });

  }

  return (
    <div className="App">
      <h1> Uploading files in React</h1>
      <input onChange={e=> setFiles(e.target.files)} type="file" multiple/>
      <button onClick={handleUpload}>Upload</button>

    {progress.started && <progress max="100" value = {progress.pc}></progress>}
    {msg && <span>{msg}</span>}

    </div>
  );
}

export default App;
