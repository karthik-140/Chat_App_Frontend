import MessageBar from '../components/chat/MessageBar'
import Messages from '../components/chat/Messages'
import { useSendMessageMutation, useGetMessagesQuery } from '../api/messageApi'

const Chat = () => {

  const [sendMessage] = useSendMessageMutation()
  const { data: messages = [] } = useGetMessagesQuery()

  return (
    <>
      <Messages messages={messages} />
      <MessageBar sendMessage={sendMessage} />
    </>
  )
}

export default Chat
