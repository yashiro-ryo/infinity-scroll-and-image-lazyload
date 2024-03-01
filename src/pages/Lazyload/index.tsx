import "./style.css"

export const Lazyload = () => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const cols = [1, 2, 3, 4]
  return (
    <div>
      <div>
        <h1>LazyLoad</h1>
      </div>
      <div className="body">
        <div className="container">
          {rows.map((_, rowIndex) => {
            return (
              <div className="container-row" key={`${rowIndex}`}>
                {cols.map((_, colIndex) => {
                  return (
                    <div
                      className="img-wrapper"
                      key={`${rowIndex}-${colIndex}`}
                    >
                      <img
                        src={`/${(rowIndex + 1) * (colIndex + 1)}.png`}
                        loading="lazy"
                      />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
