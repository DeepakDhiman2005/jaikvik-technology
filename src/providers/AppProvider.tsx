import { Suspense } from "react"
import Loading from "../components/loaders/Loading"
import ScrollTopToBottom from "../components/buttons/ScrollTopToBottom"
// import ChatBot from "../ai/ChatBot"
import BrochureButton from "../components/buttons/BrochureButton"
import ReviewModal from "../components/modals/ReviewModal"
import { Provider } from "react-redux"
import { store } from "../redux/store"

const AppProvider: React.FC<{
    children: React.ReactNode,
}> = ({
    children
}) => {
        return <>
            <Provider store={store}>
                <Suspense fallback={<Loading />}>
                    {children}
                    <ScrollTopToBottom />
                    {/* <ChatBot /> */}
                    <BrochureButton />

                    {/* modals */}
                    <ReviewModal />
                </Suspense>
            </Provider>
        </>
    }

export default AppProvider