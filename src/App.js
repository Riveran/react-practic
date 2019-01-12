import React from 'react'
import { Add } from './components/Add'
import { News } from './components/News'
import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false
  }

  static getDerivedStateFromProps (props, state) {
    let filterNews
    if (Array.isArray(state.news)) {
      filterNews = [...state.news]
      filterNews.forEach(item => {
        if (item.bigText.toLowerCase().indexOf('pubg') !== 1) {
          item.bigText = 'СПАМ'
        }
      })
    }
    return {
      news: filterNews
    }
  }

  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }

  render () {
    const { news, isLoading } = this.state
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={this.state.news} />}
      </React.Fragment>
    )
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    fetch('http://localhost:3000/data/newsData.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTimeout(() => {
          this.setState({ isLoading: false, news: data })
        }, 1000)
      })
  }
}

export default App
