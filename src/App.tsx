import { useState, useRef, useEffect} from 'react';

//  Main parent component
function App() {
    return (
    <div className='App'>
      <MessageScreen/>
    </div>
  );
}

export default App;

// MessageScreen component holding all the messages
interface MessageBlock {
  isYours: boolean;
  messageContents: string[];
}
function MessageScreen() {
  const [messageBlocks, setMessageBlocks] = useState<MessageBlock[]>([
    {
      isYours: true,
      messageContents: ["Hello"],
    },
    {
      isYours: false,
      messageContents: ["How's it going?", "Bozo..."],
    },
    {
      isYours: true,
      messageContents: ["I hate you>:("],
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  function handleEnter(textValue: string) {
    setMessageBlocks(prevBlocks => [
      ...prevBlocks,
      {
        isYours: true,
        messageContents: [textValue],
      }
    ]);
    console.log('hello');
    setInputValue("");
  }

  return(
    // Map function to create multiple MessageBlock components and assign messageContents to them
    <div className='messageScreen'>
      {messageBlocks.map((messageBlock, index) => (
        <MessageBlock key={index} isYours={messageBlock.isYours} messageContents={messageBlock.messageContents} />
      ))}
      <InputBox handleEnter={handleEnter} inputValue={inputValue} setInputValue={setInputValue}/>
    </div>
  )
}

function InputBox({ handleEnter, inputValue, setInputValue }: {
  handleEnter: (textValue: string) => void, inputValue: string, setInputValue: Function}) {
  return (
    <div>
      <input
        type="text" 
        className="inputBox"
        placeholder="..."
        value={inputValue}

        onChange={(event) => setInputValue(event.currentTarget.value)}

        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleEnter(event.currentTarget.value);
            
          }
        }}
      />
    </div>
  );
}

// MessageBlock component holding all messages in a block (same owner)
// Need to phrase the 'props' (properties) within curly brackets like this... not sure why, it's a React thing
function MessageBlock({ isYours, messageContents }: { isYours: boolean; messageContents: string[] }) {
  return (
    // Second map function to map each message in the block
    <div className='messageBlock'>
      {messageContents.map((message, index) => (
        <Message key={index} isYours={isYours} messageContent={message} />
      ))}
    </div>
  );
}

// Message component holding each individual message
function Message({ isYours, messageContent }: { isYours: boolean; messageContent: string }) {
  const isYoursIndicator: string = isYours? "right": "left"  // convert isYours boolean to string
  return(
    <div className = {"message" + " " + isYoursIndicator}>
      {messageContent}
    </div>
  )
}