import React from 'react';
import Footer from './Footer';
import ReactGA from 'react-ga';

function Home() {
	const CONSUMER_KEY = '4vjc5vj5vi1e6stse71d92aga3';

	const CONSUMER_REDIRECT_URI = 'https://raffleup.azurewebsites.net/raffle';

	const url = `https://secure.meetup.com/oauth2/authorize?client_id=${CONSUMER_KEY}&response_type=token&redirect_uri=${CONSUMER_REDIRECT_URI}`;

	if (process.env.REACT_APP_GA_TRACKING_ID) {
		ReactGA.pageview('/');
	}

	const trackingClick = (event) => {
		ReactGA.event({
			category: 'User',
			action: 'Authentication MeetUp'
		});
	};

	return (
		<div>
			<header className="masthead">
				<div className="container">
					<div className="intro-text">
						<div className="intro-heading text-uppercase">MEETUP RAFFLES AND GIVEAWAYS</div>

						<a
							className="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
							href={url}
							onClick={trackingClick}
						>
							START
						</a>
					</div>
				</div>
			</header>

			<section id="services">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<h2 className="section-heading text-uppercase">HOW IT WORKS</h2>
						</div>
					</div>
					<div className="row text-center">
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fas fa-circle fa-stack-2x text-primary" />
								<i className="fas fa-user fa-stack-1x fa-inverse" />
							</span>
							<h4 className="service-heading">1. Connect to your Meetup.com account</h4>
						</div>
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fas fa-circle fa-stack-2x text-primary" />
								<i className="fas fa-calendar fa-stack-1x fa-inverse" />
							</span>
							<h4 className="service-heading">2. Select Meetup and Event</h4>
						</div>
						<div className="col-md-4">
							<span className="fa-stack fa-4x">
								<i className="fas fa-circle fa-stack-2x text-primary" />
								<i className="fas fa-trophy fa-stack-1x fa-inverse" />
							</span>
							<h4 className="service-heading">3. Raffleup will choose a random winner</h4>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}

export default Home;
