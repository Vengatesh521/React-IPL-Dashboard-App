import {Component} from 'react'
import {Link} from 'react-router-dom' // Added Link for navigation
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChart from '../PieChart' // Make sure this import is correct
import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    matchStats: [], // Added for pie chart data
  }

  componentDidMount() {
    this.fetchTeamMatchesData()
  }

  fetchTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(match2 => ({
        umpires: match2.umpires,
        result: match2.result,
        manOfTheMatch: match2.man_of_the_match,
        id: match2.id,
        date: match2.date,
        venue: match2.venue,
        competingTeam: match2.competing_team,
        competingTeamLogo: match2.competing_team_logo,
        firstInnings: match2.first_innings,
        secondInnings: match2.second_innings,
        matchStatus: match2.match_status,
      })),
    }

    // Calculate match statistics
    const matchStats = this.calculateMatchStats([
      ...formattedData.recentMatches,
      formattedData.latestMatchDetails,
    ])

    this.setState({
      isLoading: false,
      teamBannerUrl: formattedData.teamBannerUrl,
      latestMatchDetails: formattedData.latestMatchDetails,
      recentMatches: formattedData.recentMatches,
      matchStats,
    })
  }

  // New method to calculate match statistics
  calculateMatchStats = matches => {
    const stats = {
      won: 0,
      lost: 0,
      drawn: 0,
    }

    matches.forEach(match => {
      switch (match.matchStatus.toLowerCase()) {
        case 'won':
          stats.won += 1
          break
        case 'lost':
          stats.lost += 1
          break
        default:
          stats.drawn += 1
          break
      }
    })

    return [
      {name: 'Won', value: stats.won},
      {name: 'Lost', value: stats.lost},
      {name: 'Drawn', value: stats.drawn},
    ]
  }

  render() {
    const {
      isLoading,
      teamBannerUrl,
      latestMatchDetails,
      recentMatches,
      matchStats,
    } = this.state

    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            {/* Back Button */}
            <Link to="/" className="back-button-link">
              <button type="button" className="btn btn-outline-light mb-3">
                Back to Home
              </button>
            </Link>

            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch latestMatchDetails={latestMatchDetails} />

            {/* Pie Chart */}
            <div className="match-stats-container">
              <h2 className="stats-heading">Match Statistics</h2>
              <PieChart data={matchStats} />
            </div>

            <ul className="recent-matches-list">
              {recentMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
