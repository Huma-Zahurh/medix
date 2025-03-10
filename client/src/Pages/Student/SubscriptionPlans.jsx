// import React, { useState, useEffect } from 'react';
// import StudentLayout from '../../Components/StudentLayout';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import '../../Styles/PageStyles/CreateCategory.css'; // Assuming you want to reuse styles

// const SubscriptionPlans = () => {
//   const [subscriptions, setSubscriptions] = useState([]);

//   const getAllSubscriptions = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/v1/subscription/get-subscriptions');
//       if (data?.success && Array.isArray(data.subscriptions)) {
//         setSubscriptions(data.subscriptions);
//         console.log(data.subscriptions)
//       } else {
//         throw new Error('Invalid subscription data format');
//       }
//     } catch (error) {
//       console.error('Error fetching subscriptions:', error);
//       toast.error('Something went wrong in getting subscriptions');
//     }
//   };

//   useEffect(() => {
//     getAllSubscriptions();
//   }, []);

//   return (
//     <StudentLayout title={'Subscription Plans'}>
//       <h3 className="bwFormHeadings mt-5">Subscription Plans</h3>
//       <br />
//       <table className="UserTable">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Duration</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscriptions.map((sub) => (
//             <tr key={sub._id}>
//               <td>{sub.name}</td>
//               <td>{sub.description}</td>
//               <td>{sub.duration} {sub.durationUnit}</td>
//               <td>{sub.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </StudentLayout>
//   );
// };

// export default SubscriptionPlans;


import React, { useState, useEffect } from 'react';
import StudentLayout from '../../Components/StudentLayout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../Styles/PageStyles/CreateCategory.css'; 

const SubscriptionPlans = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const getAllSubscriptions = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/subscription/get-subscriptions');
      if (data?.success && Array.isArray(data.subscriptions)) {
        setSubscriptions(data.subscriptions);
        console.log(data.subscriptions);
      } else {
        throw new Error('Invalid subscription data format');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Something went wrong in getting subscriptions');
    }
  };

  useEffect(() => {
    getAllSubscriptions();
  }, []);

  return (
    <StudentLayout title={'Subscription Plans'}>
      <h3 className="bwFormHeadings mt-5">Subscription Plans</h3>
      <br />
      <div className="container">
        <div className="row">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{sub.name}</h5>
                  <p className="card-text">{sub.description}</p>
                  <p className="card-text"><strong>Duration:</strong> {sub.duration} {sub.durationUnit}</p>
                  <p className="card-text"><strong>Price:</strong> ${sub.price}</p>
                  <button className="btn btn-primary">Subscribe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default SubscriptionPlans;