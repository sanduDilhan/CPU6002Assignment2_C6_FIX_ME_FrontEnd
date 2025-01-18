
import React from 'react';
import Files from "react-files";
import * as commonFunc from "../../../utility/commonFunc";
import './ReactFiles.scss';
import squarePic from '../../../assets/img/views/create/square.png'

const onFilesChange = props => async files => {
  if (files.length !== 0) {
    let base64 = await commonFunc.readFile(files[0]);
    // console.log(base64)
    props.sendImageData(files[0],base64)
  }
};
const App = (props) =>{
  return(
    <div className={"cover-photo-wrapper"}>
      <Files
        className='files-dropzone-file'
        onChange={onFilesChange(props)}
        accepts={["image/png", "image/jpg", "image/jpeg"]}
        multiple={props.multiple}
        maxFileSize={4050000}
        minFileSize={0}
        onError={commonFunc.onFileError}
        clickable
      >
        <div className="file-wrapper">
          <img className={`pro-image ${props.imageFile === null || props.imageFile === '' ? `best-fit`:``}`} src={props.imageFile ? props.imageFile : squarePic} alt={"."} />
          <div>
            <p className={"p-text"}>
              Image must be less than 4MB
            </p>
          </div>
        </div>
      </Files>
    </div>
  )
}
export default App;
