import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIndividualDM, fetchAddDirectMessage } from "../../../store/directMessages"
import "./IndividualdirectMessage.css"
// react component for conversation between up to 9 workspace users
function IndividualDirectMessage() {
    const { directMessageId } = useParams()
    console.log(`directmessageId in individual dm:`, directMessageId)

    const dispatch = useDispatch()

    const [content, setContent] = useState('')

    const handleSendMessage = (event) => {
        event.preventDefault();
        dispatch(fetchAddDirectMessage(directMessageId, content))
        setContent('')
    }

    useEffect(() => {
        dispatch(fetchIndividualDM(directMessageId))
    }, [dispatch, directMessageId])

    // Get the session user and the current individual direct message from the Redux store
    const sessionUser = useSelector(state => state.session?.user);
    const currentDM = useSelector(state => {
        return state?.directMessages?.currentIndividualDM
    })

    console.log(`directmessage individual dm`, currentDM)

    // get an array of user first names, excluding the session user's name
    const names = currentDM?.users?.reduce((x, user) => {
        if (user.first_name !== sessionUser.first_name) {
            x.push(user.first_name);
        }
        return x;
    }, []).join(', ');

    // Map over the messages in the current direct message to render each message and its replies
    const messagesMapped = currentDM?.messages?.map((message, idx) => {
        const repliesMapped = message?.replies?.map((reply, idx) => {
            return (
                <div className='individualMessageDiv'>
                    <div className='messageSenderProfilePicDiv'>
                        <img src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png' className='messageSenderProfilePic' />
                    </div>
                    <div className='messageDetailsDiv'>
                        <div className='messageSenderNameAndTimeStampDiv'>
                            <h4 className='messageSenderName'>{reply?.user?.first_name} {reply?.user?.last_name}</h4>
                            <h5 className='messageTimestamp'>{reply.timestamp}</h5>
                        </div>
                        <p>{reply?.content}</p>
                        <div key={idx} className='repliesDiv'>
                            {reply?.replies?.length > 0 && repliesMapped}
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className='individualMessageDiv'>
                <div className='messageSenderProfilePicDiv'>
                    <img src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png' className='messageSenderProfilePic' />
                </div>
                <div className='messageDetailsDiv'>
                    <div className='messageSenderNameAndTimeStampDiv'>
                        <h4 className='messageSenderName'>{message?.user?.first_name} {message?.user?.last_name}</h4>
                        <h5 className='messageTimestamp'>{message.timestamp}</h5>
                    </div>
                    <p>{message?.content}</p>
                    <div key={idx} className='repliesDiv'>
                        {message?.replies?.length > 0 && repliesMapped}
                    </div>
                </div>
            </div>

        )
    })
    return (
        <div class='individualChannelMainDiv'>
            <h1 id='ChannelTitle'> {names}</h1>
            <div className='messagesMainDiv'>
                {messagesMapped}
            </div>
            <form className='sendMessageForm' onSubmit={handleSendMessage}>
                <input className='sendMessageInput'
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button className='sendMessageButton' type="submit">Send</button>
            </form>
        </div>

    )
}

export default IndividualDirectMessage
