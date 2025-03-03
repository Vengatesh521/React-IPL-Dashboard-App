// src/components/Home/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {isLoading: true, teams: []}

  componentDidMount() {
    this.fetchTeamsData()
  }

  fetchTeamsData = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ipl')
      if (!response.ok) {
        throw new Error('Failed to fetch teams data')
      }
      const data = await response.json()
      const formattedTeams = data.teams.map(team => ({
        id: team.id,
        name: team.name,
        teamImageUrl: team.team_image_url,
      }))
      this.setState({isLoading: false, teams: formattedTeams})
    } catch (error) {
      console.error('Error fetching teams:', error)
      this.setState({isLoading: false})
    }
  }

  render() {
    const {isLoading, teams} = this.state
    return (
      <div className="home-container">
        <div className="ipl-dashboard-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="dashboard-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams-list">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
