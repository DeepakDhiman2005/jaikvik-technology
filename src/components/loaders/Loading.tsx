import { DotLoader } from "react-spinners"

const Loading = () => {
  return <>
    <div className="w-full h-screen flex justify-center items-center">
        <DotLoader  color="#ff4d4d" />
    </div>
  </>
}

export default Loading