import ProtectedRoute  from "../../components/protectedRoutes"
import DashboardPage from "../../components/dashboard/homePage"

export default function Home() {

    return(
        <ProtectedRoute>
            <DashboardPage/>
        </ProtectedRoute>
    )
}

