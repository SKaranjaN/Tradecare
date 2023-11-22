// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const Verification = () => {
//   const { token } = useParams();

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/verify-email/${token}`, {
//           method: 'GET',
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('Email verification successful:', data);
//           // Handle success (e.g., display a success message)
//         } else {
//           const errorData = await response.json();
//           console.error('Email verification failed:', errorData);
//           // Handle failure (e.g., display an error message)
//         }
//       } catch (error) {
//         console.error('Error during email verification:', error);
//         // Handle error (e.g., display an error message)
//       }
//     };

//     verifyEmail();
//   }, [token]);

//   return (
//     <div>
//       {/* Your verification component UI */}
//       <p>Verifying email...</p>
//     </div>
//   );
// };

// export default Verification;