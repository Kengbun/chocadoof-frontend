import React from "react";
import ConfigRoutes from "../confix/routes";
import { Routes, Route, Navigate } from "react-router-dom";

function PrivateRoutes({ role = "guest", setRole }) {
    const allowedRoutes = ConfigRoutes[role]?.allowedRoutes || [];
    const redirectRoute = ConfigRoutes[role]?.redirectRoute || "/";

    return (
        <Routes>
            {allowedRoutes.map((route) => (
                <Route
                    path={route.path}
                    key={route.path}
                    element={<route.component setRole={setRole} />}
                />
            ))}
            <Route path="*" element={<Navigate to={redirectRoute} />} />
        </Routes>
    );
}

export default PrivateRoutes;
