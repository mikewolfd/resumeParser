import viteLogo from "/vite.svg";
import "./App.css";
import ResumeForm from "./resume";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function App() {
  const [credentialResponse, setCredentialResponse] = useState<CredentialResponse | null>(null);
  return (
    <>
      <div>
        <a href="https://fearless.tech" target="_blank">
          <img src={viteLogo} className="logo" alt="Fearless logo" />
        </a>
      </div>
      <h1>Fearless Resume Question Generator</h1>
      {!credentialResponse ? (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            width: 250,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            paddingLeft: 20,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <GoogleLogin
            auto_select={true}
            useOneTap={true}
            size="large"
            onSuccess={function (credentialResponse: CredentialResponse): void {
              setCredentialResponse(credentialResponse);
            }}
          />
        </div>
        </div>
      ) : (
        <ResumeForm />
      )}
    </>
  );
}

export default App;
