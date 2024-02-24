import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [listItem, setListItem] = useState<Array<string>>([])
  const [lastIndex, setLastIndex] = useState(1)
  const [isLoading, setLoading] = useState(false)
  const [firstItemLoaded, setFirstItemLoaded] = useState(false)
  const PER_LIST_ITEM = 20
  const READ_MORE_MARGIN = 60

  useEffect(() => {
    if (!firstItemLoaded) {
      getListItem()
    }
  }, [])

  const getListItem = () => {
    if (isLoading) {
      return
    }
    setLoading(true)
    // API request を想定
    setTimeout(() => {
      const addedListItem = listItem.concat(createItem())
      setListItem(addedListItem)
      setLastIndex(lastIndex + PER_LIST_ITEM)
      setLoading(false)
      setFirstItemLoaded(true)
    }, 500)
  }

  const createItem = (): Array<string> => {
    // ダミーリストアイテムを生成
    const array = []
    for (let i = lastIndex; i < lastIndex + PER_LIST_ITEM; i++) {
      array.push(`item-${i}`)
    }
    return array
  }

  const onScroll = () => {
    loadMoreIfNeed()
  }

  const loadMoreIfNeed = () => {
    // リスト最後の要素を取得
    const bottomListItem = document.getElementById(`list-item-${lastIndex - 1}`)
    if (bottomListItem === null) {
      return
    }
    // タイトル部分 + スクロール表示部の高さ + リスト1つ分
    if (
      500 + 100 + READ_MORE_MARGIN >
      bottomListItem.getBoundingClientRect().top
    ) {
      getListItem()
    }
  }

  return (
    <div>
      <div className="title">
        <h1>Scroll Lazyload</h1>
      </div>
      <div>
        <div className="list-container" onScroll={onScroll}>
          <ul className="list-group">
            {listItem.map((item, index) => {
              return (
                <li
                  key={`list-item-${index}`}
                  className="list-item"
                  id={`list-${item}`}
                >
                  {item}
                </li>
              )
            })}
            {isLoading ? <div className="loader" /> : ""}
          </ul>
        </div>
        <button onClick={getListItem}>Add List Item</button>
      </div>
    </div>
  )
}

export default App
