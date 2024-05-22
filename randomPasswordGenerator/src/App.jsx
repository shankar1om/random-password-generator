import { useState, useCallback , useEffect,useRef} from 'react'

// import './App.css'
import './index.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed]=useState(false);
  const[charAllowed, setcharAllowed]=useState(false);
  const[password ,setPassword]=useState("")

  const passwordref=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()-_=+[]{}:\/<>,.?~"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  },[length, charAllowed, numberAllowed ,setPassword])

    const copyPasswordToClipBoard = useCallback(()=>{
        passwordref.current?.select();
        window.navigator.clipboard.writeText(password)
    },[password])


    useEffect(()=>{
      passwordGenerator()
    },[length,numberAllowed,charAllowed])
  return (
    <>
      <div className='w-full h-ful  max-w-md mx-auto shadow-md rounded-lg
      py-10 px-5 my-8 text-orange-500 bg-gray-700 text-center'>
        <h1 className='text-white text-center my-2'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='pasword'
          readOnly
          ref={passwordref}
        />
        <button
        onClick={copyPasswordToClipBoard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-4'>
            <input type="range"
             min={6}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{setlength(e.target.value)}}
             />
             <label>length:{length}</label>
        </div>
           <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
               defaultChecked={numberAllowed}
               id='numberInput'
               onChange={()=>{
                setnumberAllowed((prev)=>!prev);
               }}
               />
               <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input type="checkbox" 
               defaultChecked={charAllowed}
               id='charInput'
               onChange={()=>{
                setcharAllowed((prev)=>!prev);
               }}
               />
               <label htmlFor="charInput">Characters</label>
          </div>

      </div>
      </div>
    </>
  )
}

export default App
