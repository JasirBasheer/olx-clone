import Swal from 'sweetalert2';

export const validateTitle = (value :string):boolean => {
    if (value.trim()=="") {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please enter a valid Title',
        confirmButtonText: 'OK',
      });

      return false
    }
    
    return true
  };

  export const validateCategory= (value:string):boolean => {
    if (value.trim()=="") {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please enter a valid Category',
        confirmButtonText: 'OK',
      });

      return false
    }
    
    return true
  };

  export const validateDescription= (value:string):boolean => {
    if (value.trim()=="") {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please enter a valid Description',
        confirmButtonText: 'OK',
      });

      return false
    }
    
    return true
  };

  export  const validatePrice= (value:string):boolean => {
    if (value.trim()=="") {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Please enter a valid Price',
        confirmButtonText: 'OK',
      });

      return false
    }
    
    return true
  };

  const validExtensions:string[] = ['svg', 'png', 'jpg', 'jpeg'];
 

  export  const validateImage= (value:File):boolean => {
    if (!value) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'required at least one image for this post',
        confirmButtonText: 'OK',
      });

      return false
    }

    const fileName :string =value?.name
    const check = fileName.split('.').pop()?.toLowerCase();
    

    if (!validExtensions.includes(check || '')) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'only accepts svg,png,jpg,jpeg',
        confirmButtonText: 'OK',
      });

      return false
    }
    
    return true
  };

