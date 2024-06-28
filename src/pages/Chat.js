import { useCallback, useEffect, useState } from 'react'

import MessageBar from '../components/chat/MessageBar'
import Messages from '../components/chat/Messages'
import MessageTopBar from '../components/chat/MessageTopBar'
import { useSendMessageMutation, useLazyGetMessagesQuery } from '../api/messageApi'
import ChatsListMenu from '../components/chat/ChatsListMenu'
import { useGetAllGroupsQuery } from '../api/groupApi'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [selectedGroup, setSelectedGroup] = useState()

  const { data: allGroups = [] } = useGetAllGroupsQuery()
  const [sendMessage] = useSendMessageMutation()
  const [getMessages] = useLazyGetMessagesQuery()

  useEffect(() => {
    if (!selectedGroup) {
      setSelectedGroup(() => allGroups[0])
    }
  }, [allGroups, selectedGroup])

  const getStoredMessages = useCallback(() => {
    const messages = JSON.parse(localStorage.getItem(selectedGroup?.id)) || []
    if (messages.length >= 25) {
      localStorage.removeItem(selectedGroup?.id)
      const updatedMessages = messages.slice(5)
      localStorage.setItem(selectedGroup?.id, JSON.stringify(updatedMessages))
      return updatedMessages
    }
    return messages
  }, [selectedGroup?.id])

  const fetchMessages = useCallback(async () => {
    try {
      const storedMessages = getStoredMessages()
      const lastMessageId = storedMessages[storedMessages?.length - 1]?.id

      const response = await getMessages({ groupId: selectedGroup?.id, messageId: lastMessageId })
      const newMessages = response.data
      if (newMessages.length > 0) {
        const updatedMessages = [...storedMessages, ...newMessages]
        localStorage.setItem(selectedGroup?.id, JSON.stringify(updatedMessages))
        setMessages(updatedMessages)
      } else {
        setMessages(storedMessages)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }, [getMessages, selectedGroup?.id, getStoredMessages])

  useEffect(() => {
    const timer = setInterval(() => {
      fetchMessages()
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [fetchMessages])

  return (
    <div className='flex h-screen'>
      <div className='md:w-1/4 h-full'>
        <ChatsListMenu
          allGroups={allGroups}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
      {(allGroups.length > 0) &&
        <div className='flex-1 flex flex-col h-full relative'>
          <MessageTopBar selectedGroup={selectedGroup || allGroups[0]} />
          <div className='mt-16 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-slate-100'>
            <Messages messages={messages} />
          </div>
          <MessageBar groupId={selectedGroup?.id} sendMessage={sendMessage} />
        </div>
      }
    </div>
  )
}

export default Chat
