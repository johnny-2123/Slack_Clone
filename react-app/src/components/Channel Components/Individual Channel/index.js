import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './IndividualChannel.css'
import { fetchChannelMessages, fetchIndividualChannel } from '../../../store/channels';

function IndividualChannel() {
    const { channelId } = useParams()
    // console.log(`channelId in individual channel:`, channelId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIndividualChannel(channelId))
        dispatch(fetchChannelMessages(channelId))
    }, [dispatch, channelId])

    const { channel } = useSelector(state => {
        return state.channels?.currentChannel
    })
    // console.log(`channel in individual channel`, channel)

    const { Messages } = useSelector(state => {
        return state.channels?.currentChannelMessages
    })
    // console.log(`messages in individual channel`, Messages)

    const messagesMapped = Messages?.map((message, idx) => {
        const repliesMapped = message?.replies?.map((reply, idx) => {
            return (<div key={idx} className='replyDiv'>
                <p>{reply?.content}</p>
            </div>)
        })

        return (
            <div className='individualMessageDiv' >
                <p>{message?.content}</p>
                <div key={idx} className='repliesDiv'>
                    {message?.replies?.length > 0 && repliesMapped}
                </div>
            </div>
        )
    })

    return (
        <div class='individualChannelMainDiv'>
            <h1 id='ChannelTitle'>#{channel?.name} </h1>
            <div className='messagesMainDiv'>
                {messagesMapped}
            </div>
        </div>

    )
}

export default IndividualChannel
