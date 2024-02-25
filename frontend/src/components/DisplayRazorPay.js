// import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"
const loadScript =(src)=>{
    
    // const navigate = useNavigate();
    return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src=src
  
      script.onload=()=>{
        resolve(true)
  
      }
  
      script.onerror=()=>{
        resolve(false)
      }
  
      document.body.appendChild(script)
    })
  }
  
  const displayRazorPay=async (amount,tickets,event_id,user,navigate)=>{
    const rollno=user.rollno
    let buyTickets = async()=>{
      console.log("fetching response");
      let response = await fetch('http://127.0.0.1:8000/students/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization':'Bearer '+String(authTokens.access),
            },
            body:JSON.stringify({rollno,event_id})     
      })
      console.log(response);
    }
    const res = await loadScript("http://checkout.razorpay.com/v1/checkout.js")
    
    if(!res)
    {
      alert("you are offline..  Failed to load Razorpay SDK")
      return 
    }
  
    const options={
      key:"rzp_test_DwptmlE6gLwR5G",
      currency:"INR",
      amount:amount*100,
      name:"Transaction",
      description:"Thanks for investing",
  
      handler: function (response){
        // alert(response.razorpay_payment_id)
        alert("Payment successful, you will be receiving a mail shortly ");
        buyTickets();
        navigate('/student');
        // navigate("/session-timed-out");

    },
      prefill:{
        name: "Razorpay"
      }
  
     // if(response.razorpay_payment_id)
    };
  
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  
  
  export default displayRazorPay;