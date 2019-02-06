import React from 'react'

const Contact = () => {
  return (
    <div id="ContactPage">
      <h3 id="contact-title">Contact Us</h3>
      <h4 id="email-us">
        Email us at{' '}
        <a id="email" href="mailto:kiwi.app.team@gmail.com">
          kiwi.app.team@gmail.com
        </a>{' '}
      </h4>
      <div id="team-info">
        <div className="contact-info">
          <div className="name-and-pic">
            <img
              className="headshots"
              src="https://media.licdn.com/dms/image/C4E03AQHlIM5DUNNLXQ/profile-displayphoto-shrink_800_800/0?e=1554940800&v=beta&t=pMj6BzGHAvPnfmn0Ph-JLOs9nX2JjHnkuDVj6IfNUT8"
            />
            <div className="name">Jennifer Cain</div>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/jennifer-taylor-cain/"
            >
              <img className="linkedInLogo" src="linkedIn.png" />
            </a>
          </div>
        </div>
        <div className="contact-info">
          <div className="name-and-pic">
            <img
              className="headshots"
              src="https://media.licdn.com/dms/image/C4E03AQGYDRNCSwZlxg/profile-displayphoto-shrink_800_800/0?e=1554940800&v=beta&t=SQfxnl6VdbV-Olt9tJoHo5ZqXJUleLGRNyBomPmsZMo"
            />
            <div className="name">Kayla Oliva</div>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/koliva/"
            >
              <img className="linkedInLogo" src="linkedIn.png" />
            </a>
          </div>
        </div>
        <div className="contact-info">
          <div className="name-and-pic">
            <img
              className="headshots"
              src="https://media.licdn.com/dms/image/C5603AQE_qUujiaHdWw/profile-displayphoto-shrink_800_800/0?e=1554940800&v=beta&t=YgbFdVIxU83mzLM199S2s_xD-boMNf731NEvJqOt7Jc"
            />
            <div className="name">Michelle Ureña</div>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/michelle-urena/"
            >
              <img className="linkedInLogo" src="linkedIn.png" />
            </a>
          </div>
        </div>
        <div className="contact-info">
          <div className="name-and-pic">
            <img
              className="headshots"
              src="
              https://media.licdn.com/dms/image/C4D03AQFbyFgkXV-mOA/profile-displayphoto-shrink_800_800/0?e=1554940800&v=beta&t=Q0sr4P4rne1iuRH2FFycUXyqPJiz7g0wz8PFKZnuU0w"
            />
            <div className="name">Sarah Erin Roach</div>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/saraherinroach/"
            >
              <img className="linkedInLogo" src="linkedIn.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
