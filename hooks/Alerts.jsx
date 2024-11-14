import Swal from "sweetalert2";

export default function AlertPopUp({title,message,icon}){
    return Swal.fire({
        title: title,
        text: message,
        icon: icon
})
}