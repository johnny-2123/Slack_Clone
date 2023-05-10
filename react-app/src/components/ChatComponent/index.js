import React from "react";
import "./chat.css";

function ChatComponent({ messages, handleSendMessage, setContent, name }) {
    const repliesMapped = (replies) => {
        return replies?.map((reply, idx) => {
            return (
                <div className="individualMessageDiv" key={idx}>
                    <div className="messageSenderProfilePicDiv">
                        <img
                            src="https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png"
                            className="messageSenderProfilePic"
                            alt="pfp"
                        />
                    </div>
                    <div className="messageDetailsDiv">
                        <div className="messageSenderNameAndTimeStampDiv">
                            <h4 className="messageSenderName">
                                {reply?.user?.first_name}{" "}
                                {reply?.user?.last_name}
                            </h4>
                            <h5 className="messageTimestamp">
                                {reply?.timestamp}
                            </h5>
                        </div>
                        <p>{reply?.content}</p>
                        <div className="repliesDiv">
                            {reply?.replies?.length > 0 &&
                                repliesMapped(reply.replies)}
                        </div>
                    </div>
                </div>
            );
        });
    };

    const messagesMapped = messages?.map((message, idx) => {
        const messageLoaded = message?.content;

        if (message.parent_id) {
            return;
        }

        return (
            messageLoaded && (
                <div className="individualMessageDiv" key={idx}>
                    <div className="messageSenderProfilePicDiv">
                        <img
                            src="https://res.cloudinary.com/dkul3ouvi/image/upload/v1683176759/favpng_user-interface-design-default_fmppay.png"
                            className="messageSenderProfilePic"
                            alt="pfp"
                        />
                    </div>
                    <div className="messageDetailsDiv">
                        <div className="messageSenderNameAndTimeStampDiv">
                            <h4 className="messageSenderName">
                                {message?.user?.first_name}{" "}
                                {message?.user?.last_name}
                            </h4>
                            <h5 className="messageTimestamp">
                                {message?.timestamp}
                            </h5>
                        </div>
                        <p>{message?.content}</p>
                        <div className="repliesDiv">
                            {message?.replies?.length > 0 &&
                                repliesMapped(message.replies)}
                        </div>
                    </div>
                </div>
            )
        );
    });

    return (
        <div className="chatComponentDiv">
            <h1 id="ChannelTitle"> {name}</h1>
            <div className="messagesMainDiv">{messagesMapped}</div>
            <form className="sendMessageForm" onSubmit={handleSendMessage}>
                <input
                    className="sendMessageInput"
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button className="sendMessageButton" type="submit">
                    <i className="fa-solid fa-paper-plane" />
                </button>
            </form>
        </div>
    );
}

export default ChatComponent;
