import MessageBar from '../components/chat/MessageBar'
import Messages from '../components/chat/Messages'
import { useSendMessageMutation } from '../api/messageApi'

const Chat = () => {

  const [sendMessage] = useSendMessageMutation()

  return (
    <>
      <Messages />
      <MessageBar sendMessage={sendMessage} />
    </>
  )
}

export default Chat
