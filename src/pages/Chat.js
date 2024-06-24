import { useCallback, useEffect, useState } from 'react'

import MessageBar from '../components/chat/MessageBar'
import Messages from '../components/chat/Messages'
import { useSendMessageMutation, useLazyGetMessagesQuery } from '../api/messageApi'

const Chat = () => {
  const [messages, setMessages] = useState([])

  const [sendMessage] = useSendMessageMutation()
  const [getMessages] = useLazyGetMessagesQuery()

  const getStoredMessages = () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || []
    if (messages.length >= 25) {
      localStorage.removeItem('messages')
      const updatedMessages = messages.slice(5)
      localStorage.setItem('messages', JSON.stringify(updatedMessages))
      return updatedMessages
    }
    return messages
  }

  const fetchMessages = useCallback(async () => {
    try {
      const storedMessages = getStoredMessages()
      const lastMessageId = storedMessages[storedMessages?.length - 1]?.id

      const response = await getMessages({ messageId: lastMessageId })
      const newMessages = response.data
      if (newMessages.length > 0) {
        const updatedMessages = [...storedMessages, ...newMessages]
        localStorage.setItem('messages', JSON.stringify(updatedMessages))
        setMessages(updatedMessages)
      } else {
        setMessages(storedMessages)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }, [getMessages])

  useEffect(() => {
    const timer = setInterval(() => {
      fetchMessages()
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [fetchMessages])

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1'>
        <Messages messages={messages} />
      </div>
      <MessageBar sendMessage={sendMessage} />
    </div>
  )
}

export default Chat
