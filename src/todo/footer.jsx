import '../assets/styles/footer.styl'

export default {
  data() {
    return {
      author: 'wanlin'
    }
  },
  render() {
    return (
      <div id="footer">
        <span>by {this.author}</span>
      </div>
    )
  }
}