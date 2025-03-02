import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    date,
    venue,
    result,
    umpires,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
  } = latestMatchDetails

  return (
    <div className="latest-match-container">
      <h2 className="latest-match-heading">Latest Match</h2>
      <div className="latest-match-card">
        <div className="match-info">
          <p className="competing-team">{competingTeam}</p>
          <p className="match-date">{date}</p>
          <p className="match-venue">{venue}</p>
          <p className="match-result">{result}</p>
        </div>
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competing-team-logo"
        />
        <div className="match-details">
          <p>
            <span className="match-detail-label">First Innings:</span>{' '}
            {firstInnings}
          </p>
          <p>
            <span className="match-detail-label">Second Innings:</span>{' '}
            {secondInnings}
          </p>
          <p>
            <span className="match-detail-label">Man of the Match:</span>{' '}
            {manOfTheMatch}
          </p>
          <p>
            <span className="match-detail-label">Umpires:</span> {umpires}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
