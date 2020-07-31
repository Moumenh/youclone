import React, { useEffect, useState } from 'react'
import { Typography, Col, Row } from 'antd'
import VideoItem from './VideoItem'
import axios from 'axios'

import moment from 'moment';

import './VideoCard.css'

const { Title } = Typography

function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
        .then( ({data : { success , videos }}) => {
            if(success) {
                setVideos(videos)
            }else {
                alert('Failed to get videos')
            }   
        })
    }, [])

    
    return (
        <div style={{ width: '90%', margin: '3rem auto' }}>
            <Title level={2}> Recommended </Title>
            <hr />
            <div className='video-collection'>
                {Videos.map((video, index) => {
                    return <VideoItem key={index} video={video} />
                })}

            </div>
        </div>
    )
}

export default LandingPage
