// import { AxiosResponse, isAxiosError } from "axios"
import toast, { ToastOptions } from "react-hot-toast"
/**
 * toast api as a single function
 * pass along an id in the options to use one toaster for loading and success/error
 */
export const notify = (type: "success" | "error" | "loading", message: string, options: ToastOptions = {}) => {
    return toast[type](message, options)
}

/** abstraction on react-hot-toast promise to use on "non-stateful" requests. operattions that don't return any data other than a succes or error message */
// export const notifyPromise = async (res: Promise<AxiosResponse<{}>>, loading: string) => {
//     return await toast.promise(res, {
//         loading: loading,
//         success: ({data}) => {
//             if (data.message){
//                 return data.message
//             }
//             return "done"
//         },
//         error: (err) => {
//             if (isAxiosError<{}>(err)) {
//                 return err.response!.data.message
//             }
//             return "Operation failed!!!"
//         }
//     })
// }