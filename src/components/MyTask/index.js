import {Component} from 'react'
import {v4} from 'uuid'

import TagItem from '../TagItem'
import TaskItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTask extends Component {
  state = {
    taskList: [],
    taskInput: '',
    tagInput: tagsList[0].optionId,
    activeTag: '',
  }

  onsubmitTask = event => {
    event.preventDefault()
    const {taskInput, tagInput} = this.state
    const tagDisplayText = tagsList.find(
      eachItem => eachItem.optionId === tagInput,
    )
    const newTask = {
      id: v4(),
      task: taskInput,
      tag: tagDisplayText.displayText,
    }
    this.setState(preState => ({
      taskList: [...preState.taskList, newTask],
      taskInput: '',
      tagInput: tagsList[0].displayText,
    }))
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({tagInput: event.target.value})
  }

  renderNoTask = () => (
    <div className="no-task-container">
      <p className="no-task">No Tasks Added Yet</p>
    </div>
  )

  renderTaskList = filteredTaskItems => (
    <ul className="task-list">
      {filteredTaskItems.map(eachItem => (
        <TaskItem key={eachItem.id} taskDetails={eachItem} />
      ))}
    </ul>
  )

  modifier = text => {
    const {activeTag} = this.state
    if (activeTag !== '') {
      return activeTag === text ? '' : text
    }
    return text
  }

  clickedTag = text => {
    // const {activeTag} = this.state
    // activeTag ? '' : text

    const tagContext = this.modifier(text)

    this.setState({activeTag: tagContext})
  }

  render() {
    const {tagInput, taskInput, activeTag, taskList} = this.state
    const filteredTaskItems = taskList.filter(eachItem =>
      eachItem.tag.includes(activeTag),
    )
    const isEmptyLength = filteredTaskItems.length === 0

    return (
      <div className="app-container">
        <div className="enter-task-container">
          <h1 className="task-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onsubmitTask}>
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              type="text"
              className="search-input"
              id="task"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.onChangeTask}
            />
            <label className="label" htmlFor="tag">
              Tags
            </label>
            <select
              className="search-input"
              id="tag"
              value={tagInput}
              onChange={this.onChangeTag}
            >
              {tagsList.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-content-container">
          <h1 className="heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                tagDetails={eachTag}
                clickedTag={this.clickedTag}
                isActiveTag={activeTag === eachTag.displayText}
              />
            ))}
          </ul>
          <h1 className="heading">Tasks</h1>
          {isEmptyLength
            ? this.renderNoTask()
            : this.renderTaskList(filteredTaskItems)}
        </div>
      </div>
    )
  }
}

export default MyTask
