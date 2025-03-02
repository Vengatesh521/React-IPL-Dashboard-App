import './index.css'

const MatchCard = props => {
  const {match} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = match

  const matchStatusClass = matchStatus === 'Won' ? 'status-won' : 'status-lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-logo"
      />
      <p className="match-card-team">{competingTeam}</p>
      <p className="match-card-result">{result}</p>
      <p className={`match-card-status ${matchStatusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
