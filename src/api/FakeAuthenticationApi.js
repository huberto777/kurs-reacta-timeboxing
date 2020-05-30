import { wait } from "./wait";

const FakeAuthenticationAPI = {
    login: async function(credentials) {
        await wait(200);
        const { email, password } = credentials;
        if (email === "hubert@example.com" && password === "secret") {
            return {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1YmVydEBleGFtcGxlLmNvbSIsImlhdCI6MTU5MDQwNzI0NiwiZXhwIjoxNTkwNDEwODQ2LCJzdWIiOiIyIn0.rgxTu-UEf2KylenKrTNSQbouGXnEbjhSApw2daYlLTw"
            }
        }
        throw new Error("Invalid credentials");
    }
}

export default FakeAuthenticationAPI;