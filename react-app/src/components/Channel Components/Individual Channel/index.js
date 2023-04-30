import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './IndividualChannel.css'
import { fetchIndividualChannel } from '../../../store/channels';

function IndividualChannel() {
    const { channelId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIndividualChannel(channelId))
    }, [dispatch, channelId])

    const { channel } = useSelector(state => {
        return state.channels.currentChannel
    })

    console.log(`channel in individual channel comoponent&&&&&&&&&&&&&`, channel)

    return (
        <div className='individualChannelMainDiv'>
            <h1>{channel.name} </h1>
        </div>

    )
}

export default IndividualChannel
