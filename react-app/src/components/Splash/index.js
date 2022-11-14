import React from 'react';
import splash_1a from '../../Images/discord-splash-1a.png';
import splash_1b from '../../Images/discord-splash-1b.png';
import splash_1c from '../../Images/discord-splash-1c.png';
import splash_2 from '../../Images/discord-splash-2.png';
import splash_3 from '../../Images/discord-splash-3.png';
import splash_4 from '../../Images/discord-splash-4.png';
import splash_5 from '../../Images/new-discord-splash-5.png';
import './index.css';
import { Link } from 'react-router-dom';

function Splash() {
	return (
		<div className="Splash-container">
			<div>
				<div className="Splash-title">
					<div className="splash-text-container">
						<div className="splash-body">
							<div className="splash-text">
								<div className="title">IMAGINE A PLACE...</div>
								<p className="subtext">
									...where you can belong to a school club, a worldwide art
									community. Where just you and a handful of friends can spend
									time together. A place that makes it easy to talk every day
									and hang out often. Within a safe and accepting space.
								</p>
							</div>
						</div>
					</div>
					<div className="splash-title-imgs">
						<img id="clouds" src={splash_1a} alt="clouds" />
						<img id="left-people" src={splash_1b} alt="people on the left" />
						<img id="right-people" src={splash_1c} alt="people on the right" />
					</div>
				</div>
				<div className="Splash-detail odd">
					<div className="row">
						<img id="splash2" src={splash_2} alt="" />
						<div className="description-right">
							<h2 className="sub-title">
								Create an Invite-Only Place Where You Belong
							</h2>
							<p className="sub-subtext">
								Q-Cord servers are organized into topic-based channels where you
								can collaborate, share, and just talk about your day without
								clogging up a group chat.
							</p>
						</div>
					</div>
				</div>
				<div className="Splash-detail even">
					<div className="row">
						<img id="splash3" src={splash_3} alt="" />
						<div className="description-left">
							<div className="sub-title">Where Hanging Out is Easy</div>
							<div className="sub-subtext">
								Grab a seat in a voice channel when youre free. Friends in your
								server can see youre around and instantly pop in to talk without
								having to call.
							</div>
						</div>
					</div>
				</div>
				<div className="Splash-detail odd">
					<div className="row">
						<img id="splash4" src={splash_4} alt="" />
						<div className="description-right">
							<div className="sub-title">From few to a Fandom</div>
							<div className="sub-subtext">
								Get any community running with moderation tools and custom
								member access. Give members special powers, set up private
								channels, and more!
							</div>
						</div>
					</div>
				</div>
				<div className="Splash-detail even">
					<div className="row">
						<div className="description">
							<h2 className="bottom-sub-title">
								Reliable tech for staying close
							</h2>
							<p className="bottom-sub-subtext">
								Low-latency voice feels like youre in the same room!
							</p>
						</div>
						<img id="splash5" src={splash_5} alt="" />
					</div>
				</div>

				<div className="Splash-footer">
					<div className='footer-content'>
						<div className="contact-box">
							<div className='languages-card' id='languages'>
								<div className='footer-title'>Languages Used</div>
								<div className='language-button-div'>
									<Link className='language-button' to={{ pathname: 'https://www.python.org/doc' }} target='_blank'>
										<i className="fa-brands fa-python"></i>
									</Link>

									<Link className='language-button' to={{ pathname: 'https://reactjs.org/' }} target='_blank'>
										<i className="fa-brands fa-react"></i>
									</Link><Link className='language-button' to={{ pathname: 'https://nodejs.org/en/docs/' }} target='_blank'>
										<i className="fa-brands fa-node-js"></i>
									</Link><Link className='language-button' to={{ pathname: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5' }} target='_blank'>
										<i className="fa-brands fa-html5"></i>
									</Link>
								</div>
							</div>
							<div className="contact-card" id='abel'>
								<div className="contact-text">Abel Brianvil</div>
								<div className='buttons-div'>
									<Link
										className="contact-button"
										to={{ pathname: 'https://github.com/abrianvil' }}
										target="_blank"
									>
										<i className="fa-brands fa-square-github" />
									</Link>
									<Link
										className="contact-button"
										to={{
											pathname:
												'https://www.linkedin.com/in/abel-brianvil-ba4320170/',
										}}
										target="_blank"
									>
										<i className="fa-brands fa-linkedin"></i>
									</Link>
								</div>
							</div>

							<div className="contact-card" id='cindy'>
								<div className="contact-text">Cindy Guzman</div>
								<div className='buttons-div'>
									<Link
										className="contact-button"
										to={{ pathname: '' }}
										target="_blank"
									>
										<i className="fa-brands fa-square-github" />
									</Link>
									<Link
										className="contact-button"
										to={{
											pathname: 'https://www.linkedin.com/in/cindyroseguzman/',
										}}
										target="_blank"
									>
										<i className="fa-brands fa-linkedin"></i>
									</Link>
								</div>
							</div>
							<div className="contact-card" id='david'>
								<div className="contact-text">David Burch</div>
								<div className='buttons-div'>

									<Link
										className="contact-button"
										to={{ pathname: 'https://github.com/ddb048' }}
										target="_blank"
									>
										<i className="fa-brands fa-square-github" />
									</Link>
									<Link
										className="contact-button"
										to={{ pathname: 'https://www.linkedin.com/in/david-burch-26b92b226/' }}
										target="_blank"
									>
										<i className="fa-brands fa-linkedin"></i>
									</Link>
								</div>
							</div>
							<div className="contact-card" id='moran'>
								<div className="contact-text">Moran Even</div>
								<div className='buttons-div'>
									<Link
										className="contact-button"
										to={{ pathname: 'https://github.com/MEven44' }}
										target="_blank"
									>
										<i className="fa-brands fa-square-github" />
									</Link>
									<Link
										className="contact-button"
										to={{ pathname: 'https://www.linkedin.com/in/moran-even/' }}
										target="_blank"
									>
										<i class="fa-brands fa-linkedin"></i>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Splash;
