import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

type MessageType = {
  text: string
}

function Message () {
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    axios.get<MessageType[]>('http://localhost:3000/getResponse')
      .then(response => {
        console.log(response.data)
        setMessages(response.data)
      })
      .catch(error => {
        console.error('Error fetching messages:', error)
      })
  }, [])

  return (
    <div>
        {messages.map((message) => (
        <div>{message.text}</div>
      ))}
    </div>
  )
}

export default Message