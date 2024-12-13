import Swal from 'sweetalert2'

export function toNumber(val) {
    if(val){
        val = val + '';
        val = val.replaceAll(',', ''); // 잠시 콤마를 때주고
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
    }
    
    return val;
}

export function toastAlert(message , type , position) {
    const Toast = Swal.mixin({
        toast: true,
        position: position ? position : 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: false
      })
  
      Toast.fire({
        icon: type,
        title: message
      })

}

export function customAlert(message, type ) {
    let variant = type;
    if(variant === '' || variant === null){
        variant = 'success'
    }
    return(
        Swal.fire({                    
            icon: variant,
            title: message,
            showConfirmButton: true
        })    
    )
}

export async function customConfirm( message , btnMessage ) {    
    return Swal.fire({
                title: message,
                icon:'question',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: btnMessage,
                cancelButtonText: '취소',
           }).then((result) => {    
                if (result.isConfirmed) {
                    return true
                } else  {
                    return false
                }
           })
}

// 비밀번호형식 확인 
export const validatePassword = password => {

    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password)){                    
        return '숫자+영문자+특수문자 조합. 8 ~ 20자 이내';
    }    
          
    return '';
}

//전화번호 형식 확인 
export const validatePhoneNo = phoneNo => {
    // '-' 입력 시
    const regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
    // 숫자만 입력시
    const regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    // 형식에 맞는 경우 true 리턴
    if(!regExp.test(phoneNo) && !regExp2.test(phoneNo)){
        return false
    }else{
        return true
    }
}

// email형식 확인 
export const validateEmail = email => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}
 
// 공백 제거
export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
}
