import React from "react";
import developer from "../img/profile.png"


import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';


const Delete = () => {
  return (
      <div className="delete-body">
        <div>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/></svg>
          </span>
          <h3 className="deleteh3"><b>Delete Account?</b></h3>
          <p>You'll permanently loose your:</p>
          <ul>
            <li>1. Profile</li>
            <li>2. Messages</li>
            <li>3. Photos</li>
            <li>4. BookCoin</li>
          </ul>
          <div>
            <button className="cancel-btn">Cancel</button>
            <button className="delete-btn">Delete Account</button>
          </div>
        </div>
      </div>
  )
}

const Help = () => {
  return (
    <div className="set-body">
    <div className="top-set">
      <div>
        <h3>
          <b>
            Help
          </b>
        </h3>
      </div>
      <div className="link-div">
        <a className="set-link">Report a problem</a>
        <hr />
        <a className="set-link">Help Centre</a>
        <hr />
        <a className="set-link">Privacy and security help</a>
      </div>
    </div>
    </div>
  )
}


/* make product-maker */





function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}




export const Chat = () => {
  return (
    <div className="product-make">
      <Avatar />
    </div>
  )
}
