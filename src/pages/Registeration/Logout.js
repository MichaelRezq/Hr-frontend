import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

const Logout = () => {
  function submitLogout() {
    // e.preventDefault();
    try {
        if(localStorage.getItem("access_token")){
            localStorage.clear()
          }
          else{

          }

    //   axios
    //     .post("http://127.0.0.1:8000/auth/logout/", {
    //       Headers: {
    //         Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
    //       },
    //     })
    //     .then(function (res) {
    //       // Handle the response if needed
    //     });
    } catch (error) {
      console.log(error);
    }
  }
submitLogout()
  return (
    <div className="center"> 
      {/* <form onSubmit={(e) => submitLogout(e)}>
        <Button type="submit" variant="light">
          Log out
        </Button>
      </form> */}
      You Are Logout
    </div>
  );
};

export default Logout;
