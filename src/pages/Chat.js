import { useCallback, useEffect, useState } from 'react'

import MessageBar from '../components/chat/MessageBar'
import Messages from '../components/chat/Messages'
import MessageTopBar from '../components/chat/MessageTopBar'
import { useSendMessageMutation, useLazyGetMessagesQuery } from '../api/messageApi'
import ChatsListMenu from '../components/chat/ChatsListMenu'
import { useGetAllGroupsQuery } from '../api/groupApi'
// import { socket } from '../components/chat/MessageBar'
import { socket } from '../services/Socket'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [smallScreen, setSmallScreen] = useState(true)

  const { data: allGroups = [] } = useGetAllGroupsQuery()
  const [sendMessage] = useSendMessageMutation()
  const [getMessages] = useLazyGetMessagesQuery()

  const { innerWidth } = window

  useEffect(() => {
    if (innerWidth < 768 ) {
      setSmallScreen((prev) => !prev)
    }
  }, [innerWidth, selectedGroup])

  useEffect(() => {
    if (!selectedGroup && innerWidth > 767) {
      setSelectedGroup(() => allGroups[0])
    }
  }, [allGroups, innerWidth, selectedGroup])

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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedGroup?.id) {
          return
        }
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
    }
    fetchMessages()
  }, [getMessages, getStoredMessages, selectedGroup?.id])

  const groupId = selectedGroup?.id

  useEffect(() => {
    socket.emit('join-group', groupId)

    const handleMessage = (userGroupInfo) => {
      setMessages((prev) => [...prev, { ...userGroupInfo }])
    }

    socket.on('receive-message', handleMessage)

    return () => {
      socket.off('receive-message', handleMessage)
    }
  }, [groupId])
 
  return (
    <div className='flex h-screen'>
      <div
        // className={`${smallScreen ? 'w-full' : 'hidden'} md:w-1/4 h-full`}
        className={`${innerWidth > 767 ? 'md:w-1/4 h-full' : smallScreen ? 'w-full' : 'hidden'} md:w-1/4 h-full`}
      >
        <ChatsListMenu
          allGroups={allGroups}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
      {(allGroups.length > 0) &&
        <div
          // className={`${smallScreen ? 'hidden' : 'flex'} flex-1 md:flex flex-col h-full relative`}
          className={`${innerWidth > 767 ? 'flex-1 flex flex-col h-full relative' : smallScreen ? 'hidden' : 'flex'} flex-1 md:flex flex-col h-full relative`}
        >
          <MessageTopBar setSmallScreen={setSmallScreen} selectedGroup={selectedGroup || allGroups[0]} setSelectedGroup={setSelectedGroup} />
          <div className='mt-16 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-slate-100'>
            <Messages messages={messages} />
          </div>
          <MessageBar groupId={selectedGroup?.id} sendMessage={sendMessage} setMessages={setMessages} />
        </div>
      }
    </div>
  )
}

export default Chat
