import Swal from 'sweetalert2';

const useNotification = () => {
   const showSuccess = (msg) => {
        return Swal.fire({
            title: 'Success!',
            text:  msg,
            icon: 'success',
            confirmButtonText: 'OK'
        })
   }

   const showError = (msg) => {
        return Swal.fire({
            title: 'Error!',
            text:  msg,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }

   const showConfirm = () => {
        return Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                return result.isConfirmed;
            }
        })
   }

   return { showSuccess, showError, showConfirm }
}

export default useNotification