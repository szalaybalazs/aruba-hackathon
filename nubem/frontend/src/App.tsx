import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/LogInPage";
import ErrorPage from "./pages/ErrorPage";
import { RequireAuth } from "./components/RequireAuth";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./components/NavBar";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./providers/AuthContextProvider";
import { CartContextProvider } from "./providers/CartContextProvider";
import ShopPage from "./pages/ShopPage";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <CssBaseline />
            <Layout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/profile" element={<RequireAuth />}>
                  <Route path="" element={<ProfilePage />} />
                </Route>
                <Route path="/*" element={<ErrorPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const showNavAndFooter = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {showNavAndFooter && <NavBar />}
      <Box
        sx={{
          width: "100%",
          position: "center",
          backgroundColor: "#f1faee",
          backgroundSize: "cover",
          zIndex: -1,
        }}
      >
        <main>{children}</main>
        {showNavAndFooter && <Footer />}
      </Box>
    </>
  );
}
