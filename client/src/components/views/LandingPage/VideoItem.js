import React from 'react';
import moment from 'moment';

const VideoItem = ({video}) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return ( 
        <a href={`video/${video._id}`}>
        <div className='video-card'>
            <img className='thumbnail' src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail' />
            <div className='video-footer'>
                <img src={`${video.writer.image}`} alt='userprofile' className='image' />
                <div className='video-info'>
                    <span className='title'> {video.title} </span>
                    <span className='name'> {video.writer.name}  </span>
                    <span className='view-date'> {video.views} - {moment(video.createdAt).format("MMM Do YY")}</span>
                </div>
            </div>
            <span className='duration'> {minutes} : {seconds} </span>
        </div>
        </a>
    );
}
 
export default VideoItem;