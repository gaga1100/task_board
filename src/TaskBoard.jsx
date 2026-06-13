import { useState, useEffect } from 'react'
import styles from './TaskBoard.module.css'

const STORAGE_KEY = 'task-board-tasks'

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState(loadTasks)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1

  function addTask() {
    const text = inputValue.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: nextId, text, completed: false }])
    setInputValue('')
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  const remaining = tasks.filter(t => !t.completed).length

  return (
    <div className={styles.board}>
      <h1 className={styles.title}>Task Board</h1>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="新しいタスクを入力..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addButton} onClick={addTask}>
          追加
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.empty}>タスクがありません</p>
      ) : (
        <>
          <p className={styles.count}>
            残り <strong>{remaining}</strong> / {tasks.length} 件
          </p>
          <ul className={styles.list}>
            {tasks.map(task => (
              <li
                key={task.id}
                className={`${styles.item} ${task.completed ? styles.completed : ''}`}
              >
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={styles.text}>{task.text}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTask(task.id)}
                  aria-label="削除"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
