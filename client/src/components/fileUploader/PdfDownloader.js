import React, {useState} from 'react';
import axios from 'axios';

function PdfDownloader() {

    const submitQuerry = () => {
        const user_name_ex = "cv_" + "lucasjbastos" + ".pdf"

        axios({
          url:`http://localhost:5000/download/${user_name_ex}`,
          method: 'GET',
          responseType: 'blob'
      })
      .then( function (response) {
          console.log(response)

          const url = window.URL.createObjectURL(
            new Blob([response.data]),
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            `Tucano_Profile.pdf`,
          );
      
          // Append to html link element page
          document.body.appendChild(link);
      
          // Start download
          link.click();
      
          // Clean up and remove the link
          link.parentNode.removeChild(link);
      });
    }

  return (
      <React.Fragment>
        <div className='col-sm-3'>
            <button type="button" className="btn btn-warning" onClick={submitQuerry}>Run download</button>
        </div>
      </React.Fragment>
  )
}

export default PdfDownloader;
