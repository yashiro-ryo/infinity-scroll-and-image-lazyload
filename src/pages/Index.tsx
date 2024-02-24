import { Link } from "react-router-dom"

export const Index = () => {
  return (
    <div>
      <div>
        <h1>Index Page</h1>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/infinity-scroll">無限スクロール</Link>
          </li>
          <li>
            <Link to="/lazyload">遅延読み込み</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
