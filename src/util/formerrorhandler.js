export default function formErrorHandler(error){

    console.log(error.includes('(auth/invalid-credential)'))

    switch (error){
        case error.includes('(auth/invalid-credential)'):
            return "Please Enter a Valid Email or Password"

        default: 
            return "Server Error Occurred"    
    }
}
