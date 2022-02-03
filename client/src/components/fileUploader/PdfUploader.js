import {useState} from 'react';
import axios from 'axios';

export const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const onInputChange = (e) => {
      setFiles(e.target.files)
  };

  const onSubmit = (e) => {
      e.preventDefault();

      console.log(files)
      console.log(`Format: ${files[0].type}`)
      console.log(`Size in Bytes: ${files[0].size}`)
      console.log(`Size in KB: ${files[0].size / 1024}`)
      console.log(`Maximum Bytes for PDF: 300KB, AKA: ${300 * 1024}`)
      console.log(`Maximum Bytes for JPEG/PNG: 1MB, AKA: ${1000 * 1024}`)

      const data = new FormData();

      for(let i = 0; i < files.length; i++) {
          data.append('file', files[i]);
      }

      const user_name_ex = "lucasjbastos"

      axios.post(`http://localhost:5000/upload/${user_name_ex}`, data)
          .then((response) => {
              console.log(response.data);
          })
          .catch((e) => {
            console.log(e)
          })
  };

  return (
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
          <div className="form-group files">
              <label>Upload Your File</label>
              <input type="file"
                     onChange={onInputChange}
                     className="form-control"
                     multiple/>
          </div>

          <button>Submit</button>
      </form>
  )
};