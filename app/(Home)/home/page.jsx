import ProtectedRoute  from "../../components/protectedRoutes"

export default function Home() {

    return(
        <ProtectedRoute>
            <div><h1>home page</h1></div>
        </ProtectedRoute>
    )
}