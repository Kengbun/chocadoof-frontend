import React from "react";
import ConfigRoutes from "../confix/routes";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants, pageTransition } from "../functions/animation";


function PrivateRoutes({ role = "guest", setRole }) {
    const allowedRoutes = ConfigRoutes[role]?.allowedRoutes || [];
    const redirectRoute = ConfigRoutes[role]?.redirectRoute || "/";
    const location = useLocation();

    

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {allowedRoutes.map((route) => (
                    <Route
                        path={route.path}
                        key={route.path}
                        element={
                            <motion.div
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={pageVariants}
                                transition={pageTransition}
                            >
                                <route.component setRole={setRole} />
                            </motion.div>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate to={redirectRoute} />} />
            </Routes>
        </AnimatePresence>
    );
}

export default PrivateRoutes;
