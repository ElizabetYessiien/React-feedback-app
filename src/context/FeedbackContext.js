import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider=({children})=>{
    const [feedback,setFeedback] = useState([{
        id:1,
        text:'This item is from context one',
        rating:10
    },
    {
        id:2,
        text:'This item is from context two',
        rating:9
    },
    {
        id:3,
        text:'This item is from context three',
        rating:8
    }])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit:false
    })

    const deleteFeedback = (id) => {
        if (window.confirm("are you sure?")) {
          setFeedback(feedback.filter((item) => item.id !== id));
        }
      };

      //update data
      const updateFeedback=(id,updItem)=>{
       setFeedback(feedback.map((item)=>item.id===id?{...item,...updItem}:item))
      }

      //set item to be updated

      const editFeedback=(item)=>{
          setFeedbackEdit({
              item,
              edit:true
          })
      }

      const addFeedback = (newFeedback) => {
        newFeedback.id = parseFloat(uuidv4(), 10);
        setFeedback([newFeedback, ...feedback]);
      };

    return <FeedbackContext.Provider value={{feedback, deleteFeedback, addFeedback, editFeedback,updateFeedback, feedbackEdit}}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext