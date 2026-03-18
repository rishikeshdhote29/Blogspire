import React from 'react';
import Swal from 'sweetalert2';
import {resetSuccessAction} from "../../redux/slices/globalSlice/globalSlice.js";
import {useDispatch} from "react-redux";

const SuccessMsg = ({message}) => {
const dispatch=useDispatch();
	Swal.fire({
  icon: "success",
  title: "Good job",
  text: message
		
});
	dispatch(resetSuccessAction());
 

};

export default SuccessMsg;