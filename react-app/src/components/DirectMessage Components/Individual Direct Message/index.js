import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchIndividualDM, fetchAddDirectMessage } from "../../../store/directMessages"
import "./IndividualdirectMessage.css"
// react component for conversation between up to 9 workspace users
function IndividualDirectMessage() {
    const { directMessageId } = useParams()
    // console.log(`directmessageId in individual dm:`, directMessageId)

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session?.user);
    const currentDM = useSelector(state => state?.directMessages?.currentIndividualDM)
    const dmMessages = useSelector(state => state?.directMessages?.currentIndividualDM?.messages)

    const [messages, setMessages] = useState()

    const [content, setContent] = useState('')

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const data = await dispatch(fetchAddDirectMessage(directMessageId, content))
            .catch(data => console.log(data))
        if (data.error) {
            console.log(`data above setErrors in handle submit for new message in IndividualDirectMessage`, data.error)
        } else {
            setContent('')
            const newMessage = await data
            // console.log(`newMessage in IndividualDirectMessage`, newMessage)
            setMessages([...messages, newMessage])
        }
    }

    useEffect(() => {
        dispatch(fetchIndividualDM(directMessageId))

    }, [dispatch, directMessageId])

    useEffect(() => {
        setMessages(dmMessages)
    }, [dmMessages])

    // get an array of user first names, excluding the session user's name
    const names = currentDM?.users?.reduce((x, user) => {
        if (user.first_name !== sessionUser.first_name) {
            x.push(user.first_name);
        }
        return x;
    }, []).join(', ');

    // Map over the messages in the current direct message to render each message and its replies
    const messagesMapped = messages?.map((message, idx) => {
        const messageLoaded = message?.content;

        const repliesMapped = message?.replies?.map((reply, idx) => {
            return (
                <div className='individualMessageDiv' key={idx}>
                    <div className='messageSenderProfilePicDiv'>
                        <img src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png' className='messageSenderProfilePic' alt='pfp' />
                    </div>
                    <div className='messageDetailsDiv'>
                        <div className='messageSenderNameAndTimeStampDiv'>
                            <h4 className='messageSenderName'>{reply?.user?.first_name} {reply?.user?.last_name}</h4>
                            <h5 className='messageTimestamp'>{reply?.timestamp}</h5>
                        </div>
                        <p>{reply?.content}</p>
                        <div className='repliesDiv'>
                            {reply?.replies?.length > 0 && repliesMapped}
                        </div>
                    </div>
                </div>
            )
        })
        return messageLoaded && (
            <div className='individualMessageDiv' key={idx}>
                <div className='messageSenderProfilePicDiv'>
                    <img src='https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png' className='messageSenderProfilePic' alt='pfp' />
                </div>
                <div className='messageDetailsDiv'>
                    <div className='messageSenderNameAndTimeStampDiv'>
                        <h4 className='messageSenderName'>{message?.user?.first_name} {message?.user?.last_name}</h4>
                        <h5 className='messageTimestamp'>{message?.timestamp}</h5>
                    </div>
                    <p>{message?.content}</p>
                    <div className='repliesDiv'>
                        {message?.replies?.length > 0 && repliesMapped}
                    </div>
                </div>
            </div>

        )
    })
    return (
        <div className='individualChannelMainDiv'>
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
