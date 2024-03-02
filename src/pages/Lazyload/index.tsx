import { useEffect } from "react"
import "./style.css"

export const Lazyload = () => {
  const rows = new Array(10).fill(0)
  const cols = new Array(4).fill(0)
  let lastCalledAt = Date.now()
  const INTERVAL = 100

  const loadImgIfNeed = () => {
    // window.innerHeight ウインドウの高さ
    // window.scrollY     垂直方向にスクロールしているピクセル数
    const scrollBottom = window.innerHeight + window.scrollY
    const imgWrappers = document.getElementsByClassName("img-wrapper")

    for (let i = 0; i < imgWrappers.length; i++) {
      const imgWrapper = imgWrappers.item(i) as HTMLDivElement
      // ページ上端から指定の要素要素の上端までのピクセル数を取得
      const imgWrapperTop = imgWrapper.offsetTop

      // 現在表示しているスクロール下部の位置よりも画像要素の上端が上にある場合にロードを行う
      if (imgWrapperTop < scrollBottom) {
        const imgElem = imgWrapper.childNodes[0] as HTMLImageElement
        if (imgElem === null) {
          continue
        }

        const imgSrc = imgElem.getAttribute("data-img-no")
        // ロード実行
        imgElem.src = `/${imgSrc}.png`

        // TODO: 再度スクロールをした際に要素を取得されないように属性を変更する
      }
    }
  }

  // scrollイベントの発生が多いのでonScroll関数の実行を間引く
  const throttle = () => {
    const nowTime = Date.now()
    // 最後に呼ばれた時間 + 100ms よりも時間が経てば実行できる
    if (lastCalledAt + INTERVAL < nowTime) {
      onScroll()
      lastCalledAt = Date.now()
    }
  }

  const onScroll = () => loadImgIfNeed()

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
