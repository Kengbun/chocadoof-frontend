function getRole() {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            return decodedToken.role || "user"; // หากไม่มี role ใน token ให้ค่า default เป็น "user"
        } catch (error) {
            console.error("Invalid token:", error);
            return "guest";
        }
    }
    return "guest"; // หากไม่มี Token ถือเป็น "guest"
}

export default {
    getRole,
}
