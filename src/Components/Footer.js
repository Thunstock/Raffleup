import React from 'react';

function Footer() {
	return (
		<footer>
			<div className="container">
				<div className="row">
					<div className="col-md-4" />
					<div className="col-md-4">
						<ul className="list-inline social-buttons">
							<li className="list-inline-item">
								<a href="https://github.com/Thunstock">
									<i className="fab fa-github" />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="https://twitter.com/">
									<i className="fab fa-twitter" />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="https://www.linkedin.com/">
									<i className="fab fa-linkedin-in" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
