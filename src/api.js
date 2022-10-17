import {collection, getDocs, addDoc } from "firebase/firestore";
import {db} from "./firebase";


export const getData = async () => {
    let reviews = []
    const querySnapshot = await getDocs(collection(db, "reviews"));
    querySnapshot.forEach((doc) => {
        const review = Object.assign({}, {id: doc.id}, doc.data())
        review.date = new Date(review.date.seconds*1000);
        reviews.push(review);
    });
    return reviews;
}

export const pushData = async (data) => {
    const subscriber = await addDoc(collection(db, "subscribers"), data)
    return subscriber.id;
}