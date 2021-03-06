import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './SideVideos';
import Subscribe from './Subscribe'


const DetailVideoPage = (props) => {

    

    const videoId = props.match.params.videoId
    const [Video,setVideo] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
        .then(({data:{success , video}}) => {
            if(success) {
                
                setVideo(video)
            } else {
                alert('Failed to get video Info')
            }
        })
    }, [])

    if (Video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`https://m0moooztube.herokuapp.com/${Video.filePath}`} controls></video>

                        <List.Item
                            actions={[<Subscribe userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} /> ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={Video.title}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
    
    
}

 
export default DetailVideoPage;