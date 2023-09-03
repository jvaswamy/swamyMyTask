import './index.css'

const TagItem = props => {
  const {tagDetails, clickedTag, isActiveTag} = props
  const {displayText} = tagDetails
  const buttonClassname = isActiveTag ? 'tag-btn active-btn' : 'tag-btn'
  const onClickTab = () => {
    clickedTag(displayText)
  }
  return (
    <li className="tagItem">
      <button type="button" className={buttonClassname} onClick={onClickTab}>
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
