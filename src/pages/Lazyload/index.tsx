import { useEffect } from "react"
import "./style.css"

export const Lazyload = () => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const cols = [1, 2, 3, 4]
  let lastCalledAt = Date.now()
  const INTERVAL = 100

  const loadImgIfNeed = () => {
    const scrollBottom = window.innerHeight + window.scrollY
    const imgWrappers = document.getElementsByClassName("img-wrapper")
    for (let i = 0; i < imgWrappers.length; i++) {
      const imgWrapper = imgWrappers.item(i) as HTMLDivElement
      const imgWrapperBottom = imgWrapper.offsetTop
      if (imgWrapperBottom < scrollBottom) {
        const imgElem = imgWrapper.childNodes[0] as HTMLImageElement
        if (imgElem === null) {
          continue
        }
        const imgSrc = imgElem.getAttribute("data-img-no")
        imgElem.src = `/${imgSrc}.png`
      }
    }
  }

  const throttle = () => {
    const nowTime = Date.now()
    if (lastCalledAt + INTERVAL < nowTime) {
      onScroll()
      lastCalledAt = Date.now()
    }
  }

  const onScroll = () => {
    console.log("scroll")
    loadImgIfNeed()
  }

  useEffect(() => {
    loadImgIfNeed()
    window.addEventListener("scroll", throttle)
    return () => {
      window.removeEventListener("scroll", throttle)
    }
  }, [])

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
                        className="img"
                        data-img-no={`${
                          rowIndex * 3 + (rowIndex + 1) + colIndex
                        }`}
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
