import { signUpAction } from '../../../../action/auth/SignUp'

import SignupForm from '@/components/auth/SignupForm'


const Page = () => {
//     const handleSignUpAction = async (formData: FormData): Promise<void> => {
//     const email = formData.get("email") as string
//     const password = formData.get("password") as string
//     const first_name = formData.get("first_name") as string
//     const last_name = formData.get("last_name") as string


//     const data = { email, password, first_name, last_name }
// try{ 
//     const res = await signUpAction(data)
//     console.log(res,"wwwwwwww")

//    }catch (error) {
//     console.error("Error during sign up:", error)
//    }   
//    }

  return (
    <div>
<SignupForm/>
    </div>
  )
}

export default Page
