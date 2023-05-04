import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function IndividualDirectMessage() {


    return (
        <div id='individualChannelMainDiv'>
            <h1 id='ChannelTitle'> Direct Message </h1>
            {/* <div className='messagesMainDiv'>
                {messagesMapped}
            </div> */}
        </div>

    )
}

export default IndividualDirectMessage
