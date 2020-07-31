import React, { useEffect, useState } from 'react';
import axios from 'axios'


const Subscribe = ({userTo, userFrom}) => {
    const [ subscribeNumber, setSubscribeNumber ] = useState(0)
    const [ subscribed, setSubscribed ] = useState(false)

    const onSubscribe = () => {

        const subscribeVariables = {
            userTo,
            userFrom
        }

        if(subscribed){
            //Already subbed

            axios.post('/api/subscribe/unsubscribe',subscribeVariables)
            .then ( res => {
                if(res.data.success) {
                    setSubscribeNumber( subscribeNumber - 1 )
                    setSubscribed(!subscribed)
                } else {
                    alert('Failed to unsubscribe')
                }
            } )

        } else {
            // not subbed
            axios.post('/api/subscribe/subscribe',subscribeVariables)
            .then ( res => {
                if(res.data.success) {
                    setSubscribeNumber( subscribeNumber + 1 )
                    setSubscribed(!subscribed)
                } else {
                    alert('Failed to subscribe')
                }
            } )
        }
    }

    useEffect(() => {

        const subscribeNumberVariables = { 
            userTo,
            userFrom
         } 
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
        .then( res => {
            if(res.data.success){
                console.log(res.data.subscribeNumber)
                setSubscribeNumber(res.data.subscribeNumber)
            } else {
                alert('Failed to get the subs number')
            }
        })

        axios.post( '/api/subscribe/subscribed', subscribeNumberVariables )
        .then( res => {
            if(res.data.success){
                console.log(res.data.subscribed)
                setSubscribed(res.data.subscribed)
            } else {
                alert('Failed to get the sub info')
            }
        })
    })

    return ( 
        <div>
            <button
            onClick={onSubscribe} style={{
                backgroundColor: '#CC0000',
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase',borderWidth: '0'
            }}>
                {subscribeNumber} {subscribed ? 'Subscribed' :
                    'Subscribe'}
            </button>
        </div>
     );
}
 
export default Subscribe;