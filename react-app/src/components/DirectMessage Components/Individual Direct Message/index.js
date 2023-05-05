import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIndividualDM } from "../../../store/directMessages"

function IndividualDirectMessage() {
    const { directMessageId } = useParams()
    console.log(`directmessageId in individual dm:`, directMessageId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIndividualDM(directMessageId))
    }, [dispatch, directMessageId])

    // Get the session user and the current individual direct message from the Redux store
    const sessionUser = useSelector(state => state.session?.user);
    const currentDM = useSelector(state => {
        return state?.directMessages?.currentIndividualDM
    })

    console.log(`directmessage individual dm`, currentDM)

    // Use `reduce` to get an array of user first names, excluding the session user's name
    const names = currentDM?.users?.reduce((x, user) => {
        if (user.first_name !== sessionUser.first_name) {
            x.push(user.first_name);
        }
        return x;
    }, []).join(', ');

    // Map over the messages in the current direct message to render each message and its replies
    const messagesMapped = currentDM?.messages?.map((message, idx) => {
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
        <div id='individualChannelMainDiv'>
            <h1 id='ChannelTitle'> {names}</h1>
            <div className='messagesMainDiv'>
                {messagesMapped}
            </div>
        </div>

    )
}

export default IndividualDirectMessage
