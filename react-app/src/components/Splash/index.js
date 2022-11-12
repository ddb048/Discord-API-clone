import React from "react";
import signup_login from "../../Images/discord-signup-login.png";
import splash_1a from "../../Images/discord-splash-1a.png";
import './index.css';
import { Link } from 'react-router-dom';

function Splash() {
    return (
        <div className="Splash-container">
            <div className="Splash-title">
                <div className="title">Imagine A Place...</div>
                <p className="subtext">
                    ...where you can belong to a school club, a worldwide art community. Where just you and a handful of friends
                    can spend time together.
                    A place that makes it easy to talk every day and hang out often. Within a safe and accepting space.
                </p>
                <img src={splash_1a} alt='clouds' />
                <img src="Images/discord-splash-1b.png" alt='people - left?' />

            </div>
            <div className="Splash-detail odd">
                <div className="sub-title">Create an Invite-Only Place Where You Belong</div>
                <p className="sub-subtext">
                    Q-Cord servers are organized into topic-based channels where you can collaborate, share, and just talk about
                    your day without clogging up a group chat.
                </p>
            </div>
            <div className="Splash-detail even">
                <div className="sub-title">Where Hanging Out is Easy</div>
                <p className="sub-subtext">
                    Grab a seat in a voice channel when youre free. Friends in your server can see youre around and instantly
                    pop in to talk without having to call.
                </p>
            </div>
            <div className="Splash-detail odd">
                <div className="sub-title">From few to a Fandom</div>
                <p className="sub-subtext">
                    Get any community running with moderation tools and custom member access. Give members special powers, set
                    up private channels, and more!
                </p>
            </div>
            <div className="Splash-detail even">
                <div className="sub-title">Reliable tech for staying close</div>
                <p className="sub-subtext">
                    Low-latency voice feels like youre in the same room!
                </p>
            </div>
            <div className="Splash-footer"></div>
        </div>
    )
}

export default Splash;
